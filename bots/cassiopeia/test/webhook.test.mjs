import test from 'node:test';
import assert from 'node:assert/strict';
import { Store } from '../src/store.mjs';
import { createHttpServer } from '../src/http.mjs';
import { processUpdate } from '../src/bot.mjs';

test('webhook authenticates, commits before acknowledgement, deduplicates and retries storage failures', async t => {
  const store = new Store();
  const config = { ownerUserId: 999, botToken: 'synthetic-token' };
  const secret = 'a'.repeat(32);
  const server = createHttpServer({ store, botUsername: 'test_bot', ownerUserId: 999,
    health: () => true, webhookSecret: secret, onUpdate: update => processUpdate(store, update, config),
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  t.after(async () => { await new Promise(resolve => server.close(resolve)); store.close(); });
  const url = `http://127.0.0.1:${server.address().port}/webhook`;
  const event = { update_type: 'bot_started', timestamp: 100, chat_id: 142,
    user: { user_id: 42, name: 'Анна' }, payload: 'website' };
  const post = (body = JSON.stringify(event), key = secret) => fetch(url, {
    method: 'POST', headers: { 'X-Max-Bot-Api-Secret': key }, body,
  });
  assert.equal((await fetch(url)).status, 405);
  assert.equal((await post(undefined, 'wrong')).status, 403);
  assert.equal(store.getSession(42), null);
  assert.equal((await post('{')).status, 400);
  assert.equal((await post('a'.repeat(70000))).status, 413);
  const enqueue = store.enqueue.bind(store);
  store.enqueue = () => { throw new Error('disk full'); };
  assert.equal((await post()).status, 503);
  assert.equal(store.getSession(42), null);
  assert.equal(store.db.prepare('SELECT count(*) AS n FROM processed_updates').get().n, 0);
  store.enqueue = enqueue;
  assert.equal((await post()).status, 200);
  assert.equal(store.getSession(42).attribution.source, 'website');
  assert.equal(store.backlog().count, 2);
  assert.equal((await post()).status, 200);
  assert.equal(store.backlog().count, 2);
});

test('setup mode keeps website intake closed', async t => {
  const store = new Store();
  const server = createHttpServer({ store, botUsername: 'test_bot', ownerUserId: 0, health: () => true });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); store.close(); });
  assert.equal((await fetch(`http://127.0.0.1:${server.address().port}/go`)).status, 503);
  assert.equal(store.db.prepare('SELECT count(*) AS n FROM clicks').get().n, 0);
});
