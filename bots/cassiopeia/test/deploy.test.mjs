import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const script = fileURLToPath(new URL('../deploy/deploy.sh', import.meta.url));
const git = (cwd, ...args) => execFileSync('git', ['-C', cwd, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), 'cassiopeia-deploy-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const source = join(dir, 'source');
  const checkout = join(dir, 'checkout');
  const bin = join(dir, 'bin');
  mkdirSync(source); mkdirSync(bin);
  git(source, 'init', '-b', 'master');
  git(source, 'config', 'user.email', 'deploy-test@example.invalid');
  git(source, 'config', 'user.name', 'Deploy test');
  mkdirSync(join(source, 'bots/cassiopeia'), { recursive: true });
  writeFileSync(join(source, 'bots/cassiopeia/compose.yaml'), 'services: {}\n');
  writeFileSync(join(source, '.gitignore'), '.env\n');
  writeFileSync(join(source, 'version.txt'), 'old\n');
  git(source, 'add', '.'); git(source, 'commit', '-m', 'initial');
  git(dir, 'clone', source, checkout);
  git(checkout, 'config', 'user.email', 'deploy-test@example.invalid');
  git(checkout, 'config', 'user.name', 'Deploy test');
  writeFileSync(join(checkout, 'bots/cassiopeia/.env'), 'LOCAL_ONLY=preserve\n');
  writeFileSync(join(source, 'version.txt'), 'new\n');
  git(source, 'add', '.'); git(source, 'commit', '-m', 'update');
  const log = join(dir, 'docker.log');
  // Stub only the deployment effects; exercise Git fast-forward and guards with real repositories.
  writeFileSync(join(bin, 'flock'), '#!/bin/sh\nexit 0\n', { mode: 0o755 });
  writeFileSync(join(bin, 'docker'), `#!/bin/sh
printf '%s\\n' "$*" >> "$DOCKER_TEST_LOG"
if [ "$FAIL_DOCKER_STEP" = "$2" ]; then exit 1; fi
if [ -n "$DEPLOY_GITHUB_TOKEN" ]; then exit 77; fi
`, { mode: 0o755 });
  return {
    checkout, source,
    run(fail = '') {
      return spawnSync('bash', [script, checkout], { encoding: 'utf8', env: {
        ...process.env, PATH: `${bin}:${process.env.PATH}`, DOCKER_TEST_LOG: log,
        FAIL_DOCKER_STEP: fail, DEPLOY_GITHUB_TOKEN: 'fake-test-token',
      } });
    },
    calls() { try { return readFileSync(log, 'utf8'); } catch { return ''; } },
  };
}

test('deploy fast-forwards checkout and preserves local env before recreating the service', t => {
  const f = fixture(t);
  const result = f.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(git(f.checkout, 'rev-parse', 'HEAD'), git(f.source, 'rev-parse', 'HEAD'));
  assert.equal(readFileSync(join(f.checkout, 'bots/cassiopeia/.env'), 'utf8'), 'LOCAL_ONLY=preserve\n');
  assert.match(f.calls(), /build.*\n.*up.*--wait/);
  assert.doesNotMatch(f.calls(), /\bdown\b/);
  assert.doesNotMatch(readFileSync(join(f.checkout, '.git/config'), 'utf8'), /fake-test-token|extraheader|insteadOf/);
});

test('deploy refuses dirty tracked files and preserves the existing revision', t => {
  const f = fixture(t);
  const before = git(f.checkout, 'rev-parse', 'HEAD');
  writeFileSync(join(f.checkout, 'version.txt'), 'server edit\n');
  assert.notEqual(f.run().status, 0);
  assert.equal(git(f.checkout, 'rev-parse', 'HEAD'), before);
  assert.equal(readFileSync(join(f.checkout, 'version.txt'), 'utf8'), 'server edit\n');
  assert.equal(f.calls(), '');
});

test('deploy refuses divergent server commits instead of overwriting them', t => {
  const f = fixture(t);
  writeFileSync(join(f.checkout, 'local.txt'), 'local commit');
  git(f.checkout, 'add', '.'); git(f.checkout, 'commit', '-m', 'server change');
  const before = git(f.checkout, 'rev-parse', 'HEAD');
  assert.notEqual(f.run().status, 0);
  assert.equal(git(f.checkout, 'rev-parse', 'HEAD'), before);
  assert.equal(f.calls(), '');
});

test('build failure leaves the running container alone', t => {
  const f = fixture(t);
  assert.notEqual(f.run('build').status, 0);
  assert.doesNotMatch(f.calls(), /\b(up|down|stop)\b/);
});

test('failed healthcheck fails deployment and collects diagnostics', t => {
  const f = fixture(t);
  assert.notEqual(f.run('up').status, 0);
  assert.match(f.calls(), /\bps\b/);
  assert.match(f.calls(), /logs --tail=50/);
});
