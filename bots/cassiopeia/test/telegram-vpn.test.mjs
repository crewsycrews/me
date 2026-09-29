import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const script = fileURLToPath(new URL('../deploy/configure-telegram-vpn.py', import.meta.url));
// Synthetic credentials only; never put a real connection URI in fixtures.
const uri = (extra) => `vless://11111111-1111-4111-8111-111111111111@proxy.example:443?security=reality&encryption=none&sni=cover.example&fp=firefox&pbk=${'A'.repeat(43)}&sid=0011223344556677&${extra}`;
function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'cassiopeia-vpn-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const output = join(dir, 'config.json');
  return {
    output,
    run(input) { return spawnSync('python3', [script, '--output', output], { input, encoding: 'utf8' }); },
    config() { return JSON.parse(readFileSync(output, 'utf8')); },
  };
}

test('gRPC REALITY preserves connection parameters and only permits Telegram', (t) => {
  const f = fixture(t);
  const result = f.run(uri('type=grpc&alpn=h2&serviceName=sample-service'));
  assert.equal(result.status, 0, result.stderr);
  const config = f.config();
  const outbound = config.outbounds[1];
  assert.equal(outbound.settings.vnext[0].address, 'proxy.example');
  assert.equal(outbound.settings.vnext[0].users[0].flow, '');
  assert.equal(outbound.streamSettings.network, 'grpc');
  assert.equal(outbound.streamSettings.security, 'reality');
  assert.deepEqual(outbound.streamSettings.grpcSettings, { serviceName: 'sample-service', multiMode: false });
  assert.equal(outbound.streamSettings.realitySettings.serverName, 'cover.example');
  assert.equal(outbound.streamSettings.realitySettings.fingerprint, 'firefox');
  assert.equal(outbound.streamSettings.realitySettings.password, 'A'.repeat(43));
  assert.equal(config.outbounds[0].protocol, 'blackhole');
  assert.deepEqual(config.routing.rules, [{
    type: 'field', inboundTag: ['bot-http'], domain: ['full:api.telegram.org'],
    port: '443', network: 'tcp', outboundTag: 'telegram-vpn',
  }]);
  assert.equal(statSync(f.output).mode & 0o777, 0o600);
  assert.doesNotMatch(result.stdout + result.stderr, /11111111|proxy\.example/);
});

test('TCP Vision still works and the converter refuses to overwrite a live config', (t) => {
  const f = fixture(t);
  assert.equal(f.run(uri('type=tcp&flow=xtls-rprx-vision')).status, 0);
  const before = readFileSync(f.output, 'utf8');
  const outbound = f.config().outbounds[1];
  assert.equal(outbound.streamSettings.network, 'tcp');
  assert.equal(outbound.streamSettings.grpcSettings, undefined);
  assert.equal(outbound.settings.vnext[0].users[0].flow, 'xtls-rprx-vision');
  assert.notEqual(f.run(uri('type=grpc&serviceName=sample')).status, 0);
  assert.equal(readFileSync(f.output, 'utf8'), before);
});

test('incompatible or ambiguous gRPC parameters fail without leaking the URI', (t) => {
  const f = fixture(t);
  for (const extra of [
    'type=grpc&flow=xtls-rprx-vision', 'type=grpc&alpn=http%2F1.1',
    'type=grpc&serviceName=a&serviceName=b', 'type=grpc&mode=unknown', 'type=ws',
  ]) {
    const result = f.run(uri(extra));
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Invalid or unsupported/);
    assert.doesNotMatch(result.stdout + result.stderr, /vless:\/\/|11111111|proxy\.example/);
  }
});
