import { createHmac } from 'node:crypto';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Store } from '../src/store.mjs';
import { processUpdate, splitText } from '../src/bot.mjs';
import { createMax, deliverPending } from '../src/max.mjs';

const config = { ownerUserId: 999, botToken: 'test-secret' };
function update(id, message = {}, chatId = 42) {
  const sender = { user_id: chatId, username: 'client', name: 'Анна Иванова', is_bot: false };
  const contact = message.contact;
  let attachments = [];
  if (contact) {
    const vcf = `BEGIN:VCARD\r\nVERSION:3.0\r\nTEL;TYPE=cell:${contact.phone_number}\r\nEND:VCARD\r\n`;
    attachments = [{ type: 'contact', payload: { vcf_info: vcf,
      max_info: { user_id: contact.user_id },
      hash: contact.user_id ? createHmac('sha256', config.botToken).update(vcf).digest('hex') : undefined,
    } }];
  }
  return { update_type: 'message_created', timestamp: id, message: {
    sender, recipient: { chat_type: message.chat?.type === 'group' ? 'chat' : 'dialog', chat_id: chatId + 100 },
    body: { mid: `mid-${id}`, text: message.text || '', attachments },
  } };
}
function rows(store, table) { return store.db.prepare(`SELECT * FROM ${table}`).all(); }
function messages(store, chat = 42) { return rows(store, 'outbox').filter(r => r.chat_id === chat).map(r => JSON.parse(r.payload)); }
function complete(store, startId = 1, payload = '') {
  processUpdate(store, update(startId, { text: `/start ${payload}`.trim() }), config);
  processUpdate(store, update(startId + 1, { contact: { user_id: 42, phone_number: '+79991234567', first_name: 'Анна <b>', last_name: '& Co' } }), config);
  assert.equal(store.getSession(42).step, 'request');
  assert.equal(messages(store).at(-1).text, 'Сформулируйте ваш запрос своими словами.');
  assert.deepEqual(messages(store).at(-1).attachments, []);
  processUpdate(store, update(startId + 2, { text: 'Нужен сайт 🪐' }), config);
}

test('full lead, attribution, exact questions, owner delivery and replay deduplication', t => {
  const store = new Store(); t.after(() => store.close());
  const attribution = { source: 'website', first: { path: '/blog/post', utm: [['utm_source', 'Яндекс'], ['utm_custom', 'a&b']] }, last: { path: '/consulting', utm: [['utm_source', 'email']] }, page: '/consulting' };
  complete(store, 10, store.createClick(attribution));
  assert.equal(rows(store, 'leads').length, 1);
  const lead = JSON.parse(rows(store, 'leads')[0].data);
  assert.deepEqual(lead.attribution, attribution);
  assert.equal(lead.phone, '+79991234567');
  assert.equal(lead.name, 'Анна Иванова');
  assert.equal(lead.request, 'Нужен сайт 🪐');
  assert.ok(messages(store).every(m => m.text !== 'Как к вам обращаться?'));
  assert.ok(messages(store).some(m => m.text === 'Сформулируйте ваш запрос своими словами.'));
  assert.ok(messages(store).some(m => m.attachments?.[0]?.payload.buttons[0][0].type === 'request_contact'));
  assert.match(messages(store, 999)[0].text, /utm_custom: a&b/);
  assert.match(messages(store, 999)[0].text, /Имя: Анна Иванова/);
  assert.equal(messages(store, 999)[0].parse_mode, undefined);
  assert.equal(store.getSession(42), null);
  const count = rows(store, 'outbox').length;
  processUpdate(store, update(12, { text: 'Нужен сайт 🪐' }), config);
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
  assert.equal(store.getSession(42).step, 'request');
  processUpdate(store, update(6, { text: '/start' }), config);
  assert.equal(store.getSession(42).step, 'request');
  processUpdate(store, update(7, { text: '/cancel' }), config);
  assert.equal(store.getSession(42), null);
  assert.equal(rows(store, 'leads').length, 0);
});

test('contact name is automatic, with profile fallback and optional last name', t => {
  const store = new Store(); t.after(() => store.close());
  const cases = [
    [{ first_name: 'Мария' }, 'Анна Иванова'],
    [{}, 'Анна Иванова'],
  ];
  let id = 1;
  for (const [nameFields, expected] of cases) {
    processUpdate(store, update(id++, { text: '/start' }), config);
    processUpdate(store, update(id++, { contact: { user_id: 42, phone_number: '12345', ...nameFields } }), config);
    assert.equal(store.getSession(42).name, expected);
    assert.equal(store.getSession(42).step, 'request');
    processUpdate(store, update(id++, { text: 'Запрос' }), config);
    assert.equal(JSON.parse(rows(store, 'leads').at(-1).data).name, expected);
  }
});

test('old name drafts advance safely without treating a name reply as the request', t => {
  const store = new Store(); t.after(() => store.close());
  let id = 1;
  for (const text of ['Анна', '/start website']) {
    store.saveSession(42, { step: 'name', phone: '12345', attribution: { source: 'max_direct' } });
    processUpdate(store, update(id++, { text }), config);
    assert.equal(store.getSession(42).step, 'request');
    assert.equal(store.getSession(42).name, 'Анна Иванова');
    assert.equal(store.getSession(42).phone, '12345');
    assert.equal(messages(store).at(-1).text, 'Сформулируйте ваш запрос своими словами.');
    const count = rows(store, 'leads').length;
    processUpdate(store, update(id++, { text: 'Нужен сайт' }), config);
    assert.equal(rows(store, 'leads').length, count + 1);
    const lead = JSON.parse(rows(store, 'leads').at(-1).data);
    assert.equal(lead.request, 'Нужен сайт');
    assert.equal(lead.attribution.source, text.startsWith('/start') ? 'website' : 'max_direct');
  }
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
  processUpdate(store, update(1, { text: '/whoami' }), { ownerUserId: 0 });
  assert.match(messages(store)[0].text, /42/);
  processUpdate(store, update(2, { text: '/start' }), { ownerUserId: 0 });
  assert.equal(store.getSession(42), null);
});

test('database restart preserves unfinished conversation, accepted lead, outbox and deduplication', t => {
  const dir = mkdtempSync(join(tmpdir(), 'cassiopeia-test-')); t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = join(dir, 'test.sqlite');
  let store = new Store(path);
  processUpdate(store, update(1, { text: '/start' }), config);
  processUpdate(store, update(2, { contact: { user_id: 42, phone_number: '12345' } }), config);
  store.close(); store = new Store(path);
  assert.equal(store.getSession(42).step, 'request');
  assert.equal(store.getSession(42).name, 'Анна Иванова');
  processUpdate(store, update(3, { text: 'Запрос' }), config);
  store.close(); store = new Store(path); t.after(() => store.close());
  assert.equal(store.hasUpdate('message:mid-3'), true);
  assert.equal(rows(store, 'leads').length, 1);
  assert.ok(messages(store, 999).length);
});

test('a storage error rolls back both state and deduplication so update can be retried', t => {
  const store = new Store(); t.after(() => store.close());
  const enqueue = store.enqueue.bind(store);
  store.enqueue = () => { throw new Error('disk full'); };
  assert.throws(() => processUpdate(store, update(1, { text: '/start' }), config), /disk full/);
  assert.equal(store.getSession(42), null);
  assert.equal(store.hasUpdate('message:mid-1'), false);
  store.enqueue = enqueue;
  processUpdate(store, update(1, { text: '/start' }), config);
  assert.equal(store.hasUpdate('message:mid-1'), true);
});

test('outbox retries preserve per-chat order without blocking other recipients', async t => {
  const store = new Store(); t.after(() => store.close());
  store.enqueue(999, { text: 'owner first' });
  store.enqueue(999, { text: 'owner second' });
  store.enqueue(42, { text: 'client' });
  const delivered = [];
  await deliverPending(store, async (_, path, data) => {
    if (path.includes('user_id=999')) throw Object.assign(new Error('rate limited'), { code: 429, retryAfter: 60 });
    delivered.push(data.text);
  });
  assert.deepEqual(delivered, ['client']);
  assert.equal(store.pending().length, 0);
  const failed = rows(store, 'outbox')[0];
  assert.equal(failed.attempts, 1);
  assert.ok(failed.next_attempt >= Date.now() + 58000);
  store.db.prepare('UPDATE outbox SET next_attempt=0').run();
  await deliverPending(store, async (_, path, data) => delivered.push(data.text));
  await deliverPending(store, async (_, path, data) => delivered.push(data.text));
  assert.deepEqual(delivered, ['client', 'owner first', 'owner second']);
  assert.equal(store.backlog().count, 0);
});

test('long messages split without cutting emoji and stay below MAX size', () => {
  const original = '🚀'.repeat(4000) + 'Яндекс'.repeat(1000);
  const parts = splitText(original);
  assert.equal(parts.join(''), original);
  assert.ok(parts.every(p => p.length <= 3500 && !/[\uD800-\uDBFF]$/.test(p)));
});

test('MAX client uses the current host and header authorization, preserves retry delay and hides secrets', async () => {
  const api = createMax('secret-token', async (url, options) => {
    assert.equal(url, 'https://platform-api2.max.ru/me');
    assert.equal(options.headers.Authorization, 'secret-token');
    assert.equal(options.body, undefined);
    return { ok: true, json: async () => ({ username: 'test_bot' }) };
  });
  assert.deepEqual(await api('GET', '/me'), { username: 'test_bot' });
  const limited = createMax('secret-token', async () => ({ ok: false, status: 429,
    headers: { get: () => '17' }, json: async () => ({ message: 'secret-token' }),
  }));
  await assert.rejects(limited('POST', '/messages', {}), e => e.code === 429 && e.retryAfter === 17 && !e.message.includes('secret-token'));
  const network = createMax('secret-token', async () => { throw new TypeError('secret-token', {
    cause: Object.assign(new Error('secret-token'), { code: 'UND_ERR_CONNECT_TIMEOUT' }),
  }); });
  await assert.rejects(network('GET', '/me'), e => e.code === 'UND_ERR_CONNECT_TIMEOUT' && !e.message.includes('secret-token') && !e.cause);
});

test('bot_started consumes deep-link payload, duplicate deliveries are ignored and older unique events are processed', t => {
  const store = new Store(); t.after(() => store.close());
  const token = store.createClick({ source: 'website', page: '/consulting' });
  const start = { update_type: 'bot_started', timestamp: 123, chat_id: 142,
    user: { user_id: 42, name: 'Анна Иванова' }, payload: token };
  processUpdate(store, start, config);
  const count = rows(store, 'outbox').length;
  processUpdate(store, start, config);
  assert.equal(rows(store, 'outbox').length, count);
  assert.equal(store.getSession(42).attribution.page, '/consulting');
  processUpdate(store, update(5, { contact: { user_id: 42, phone_number: '12345' } }), config);
  processUpdate(store, update(4, { text: 'Нужен сайт' }), config);
  assert.equal(rows(store, 'leads').length, 1);
});

test('unsigned, tampered and forwarded contacts cannot advance the conversation', t => {
  const store = new Store(); t.after(() => store.close());
  processUpdate(store, update(1, { text: '/start' }), config);
  for (const id of [2, 3, 4]) {
    const event = update(id, { contact: { user_id: 42, phone_number: '12345' } });
    if (id === 2) delete event.message.body.attachments[0].payload.hash;
    if (id === 3) event.message.body.attachments[0].payload.vcf_info += 'tampered';
    if (id === 4) event.message.link = { type: 'forward' };
    processUpdate(store, event, config);
    assert.equal(store.getSession(42).step, 'contact');
  }
});
