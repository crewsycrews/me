import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.mjs';
import { processUpdate, splitText } from '../src/bot.mjs';
import { createTelegram, deliverPending } from '../src/telegram.mjs';

const config = { ownerChatId: 999 };
function update(id, message = {}, chatId = 42) {
  return { update_id: id, message: { chat: { id: chatId, type: 'private' }, from: { id: chatId, username: 'client' }, ...message } };
}
function rows(store, table) { return store.db.prepare(`SELECT * FROM ${table}`).all(); }
function messages(store, chat = 42) { return rows(store, 'outbox').filter(r => r.chat_id === chat).map(r => JSON.parse(r.payload)); }
function complete(store, startId = 1, payload = '') {
  processUpdate(store, update(startId, { text: `/start ${payload}`.trim() }), config);
  processUpdate(store, update(startId + 1, { contact: { user_id: 42, phone_number: '+79991234567' } }), config);
  processUpdate(store, update(startId + 2, { text: 'Анна <b> & Co' }), config);
  processUpdate(store, update(startId + 3, { text: 'Нужен сайт 🪐' }), config);
}

test('full lead, attribution, exact questions, owner delivery and replay deduplication', t => {
  const store = new Store(); t.after(() => store.close());
  const attribution = { source: 'website', first: { path: '/blog/post', utm: [['utm_source', 'Яндекс'], ['utm_custom', 'a&b']] }, last: { path: '/consulting', utm: [['utm_source', 'email']] }, page: '/consulting' };
  complete(store, 10, store.createClick(attribution));
  assert.equal(rows(store, 'leads').length, 1);
  const lead = JSON.parse(rows(store, 'leads')[0].data);
  assert.deepEqual(lead.attribution, attribution);
  assert.equal(lead.phone, '+79991234567');
  assert.equal(lead.name, 'Анна <b> & Co');
  assert.ok(messages(store).some(m => m.text === 'Как к вам обращаться?'));
  assert.ok(messages(store).some(m => m.text === 'Сформулируйте ваш запрос своими словами.'));
  assert.ok(messages(store).some(m => m.reply_markup.keyboard?.[0][0].request_contact));
  assert.match(messages(store, 999)[0].text, /utm_custom: a&b/);
  assert.equal(messages(store, 999)[0].parse_mode, undefined);
  assert.equal(store.getSession(42), null);
  const count = rows(store, 'outbox').length;
  processUpdate(store, update(13, { text: 'Нужен сайт 🪐' }), config);
  assert.equal(rows(store, 'leads').length, 1);
  assert.equal(rows(store, 'outbox').length, count);
  complete(store, 14);
  assert.equal(rows(store, 'leads').length, 2);
});

test('foreign contacts and media are rejected; /start resumes and /cancel clears', t => {
  const store = new Store(); t.after(() => store.close());
  processUpdate(store, update(1, { text: '/start' }), config);
  for (const [i, contact] of [[2, { user_id: 51, phone_number: '12345' }], [3, { phone_number: '12345' }]]) {
    processUpdate(store, update(i, { contact }), config);
    assert.equal(store.getSession(42).step, 'contact');
  }
  processUpdate(store, update(4, { contact: { user_id: 42, phone_number: '12345' } }), config);
  processUpdate(store, update(5, { photo: [{}] }), config);
  assert.equal(store.getSession(42).step, 'name');
  processUpdate(store, update(6, { text: '/start' }), config);
  assert.equal(store.getSession(42).step, 'name');
  processUpdate(store, update(7, { text: '/cancel' }), config);
  assert.equal(store.getSession(42), null);
  assert.equal(rows(store, 'leads').length, 0);
});

test('plain /start preserves an attributed draft, explicit new link updates attribution', t => {
  const store = new Store(); t.after(() => store.close());
  const token = store.createClick({ source: 'website', page: '/consulting' });
  processUpdate(store, update(1, { text: `/start ${token}` }), config);
  processUpdate(store, update(2, { text: '/start' }), config);
  assert.equal(store.getSession(42).attribution.page, '/consulting');
  processUpdate(store, update(3, { text: '/start website' }), config);
  assert.equal(store.getSession(42).attribution.source, 'website');
  assert.equal(store.getSession(42).attribution.page, undefined);
});

test('expired tokens retain only a labelled website hint; groups cannot create leads', t => {
  const store = new Store(); t.after(() => store.close());
  const token = store.createClick({ source: 'website', secret: 'old' }, Date.now() - 31 * 86400000);
  processUpdate(store, update(1, { text: `/start ${token}` }), config);
  assert.match(store.getSession(42).attribution.status, /истекла/);
  assert.equal(store.getSession(42).attribution.secret, undefined);
  processUpdate(store, update(2, { text: '/start', chat: { id: -100, type: 'group' } }), config);
  assert.equal(store.getSession(-100), null);
});

test('setup mode exposes own ID but does not accept applications', t => {
  const store = new Store(); t.after(() => store.close());
  processUpdate(store, update(1, { text: '/whoami' }), { ownerChatId: 0 });
  assert.match(messages(store)[0].text, /42/);
  processUpdate(store, update(2, { text: '/start' }), { ownerChatId: 0 });
  assert.equal(store.getSession(42), null);
});

test('database restart preserves unfinished conversation, accepted lead, outbox and offset', t => {
  const dir = mkdtempSync(join(tmpdir(), 'cassiopeia-test-')); t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = join(dir, 'test.sqlite');
  let store = new Store(path);
  processUpdate(store, update(1, { text: '/start' }), config);
  processUpdate(store, update(2, { contact: { user_id: 42, phone_number: '12345' } }), config);
  store.close(); store = new Store(path);
  assert.equal(store.getSession(42).step, 'name');
  processUpdate(store, update(3, { text: 'Анна' }), config);
  processUpdate(store, update(4, { text: 'Запрос' }), config);
  store.close(); store = new Store(path); t.after(() => store.close());
  assert.equal(store.offset, 5);
  assert.equal(rows(store, 'leads').length, 1);
  assert.ok(messages(store, 999).length);
});

test('a storage error rolls back both state and offset so update can be retried', t => {
  const store = new Store(); t.after(() => store.close());
  const enqueue = store.enqueue.bind(store);
  store.enqueue = () => { throw new Error('disk full'); };
  assert.throws(() => processUpdate(store, update(1, { text: '/start' }), config), /disk full/);
  assert.equal(store.getSession(42), null);
  assert.equal(store.offset, 0);
  store.enqueue = enqueue;
  processUpdate(store, update(1, { text: '/start' }), config);
  assert.equal(store.offset, 2);
});

test('outbox retries preserve per-chat order without blocking other recipients', async t => {
  const store = new Store(); t.after(() => store.close());
  store.enqueue(999, { text: 'owner first' });
  store.enqueue(999, { text: 'owner second' });
  store.enqueue(42, { text: 'client' });
  const delivered = [];
  await deliverPending(store, async (_, data) => {
    if (data.chat_id === 999) throw Object.assign(new Error('rate limited'), { code: 429, retryAfter: 60 });
    delivered.push(data.text);
  });
  assert.deepEqual(delivered, ['client']);
  assert.equal(store.pending().length, 0);
  const failed = rows(store, 'outbox')[0];
  assert.equal(failed.attempts, 1);
  assert.ok(failed.next_attempt >= Date.now() + 58000);
  store.db.prepare('UPDATE outbox SET next_attempt=0').run();
  await deliverPending(store, async (_, data) => delivered.push(data.text));
  await deliverPending(store, async (_, data) => delivered.push(data.text));
  assert.deepEqual(delivered, ['client', 'owner first', 'owner second']);
  assert.equal(store.backlog().count, 0);
});

test('long messages split without cutting emoji and stay below Telegram size', () => {
  const original = '🚀'.repeat(4000) + 'Яндекс'.repeat(1000);
  const parts = splitText(original);
  assert.equal(parts.join(''), original);
  assert.ok(parts.every(p => p.length <= 3500 && !/[\uD800-\uDBFF]$/.test(p)));
});

test('Telegram client hides token URLs and preserves retry_after', async () => {
  const api = createTelegram('123:secret', async () => { throw new Error('https://api.telegram.org/bot123:secret/sendMessage'); });
  await assert.rejects(api('sendMessage'), e => !e.message.includes('secret') && e.code === 'network');
  const limited = createTelegram('123:secret', async () => ({ ok: false, status: 429, json: async () => ({ ok: false, error_code: 429, parameters: { retry_after: 17 } }) }));
  await assert.rejects(limited('sendMessage'), e => e.code === 429 && e.retryAfter === 17);
});
