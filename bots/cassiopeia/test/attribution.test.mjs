import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { Store } from '../src/store.mjs';
import { createHttpServer, parseAttribution } from '../src/http.mjs';

const script = readFileSync(new URL('../../../public/lead-attribution.js', import.meta.url), 'utf8');
function browser(initial, options = {}) {
  let location = new URL(initial);
  const documentEvents = {};
  const windowEvents = {};
  const storage = options.storage || new Map();
  let observer;
  const anchor = { getAttribute: () => 'https://leads.example.com/go', href: '', closest: () => anchor };
  const document = {
    referrer: options.referrer || 'https://yandex.ru/search/?private=query',
    documentElement: {}, querySelectorAll: () => [anchor],
    addEventListener: (name, cb) => { documentEvents[name] = cb; },
  };
  const context = vm.createContext({ document, URL, Date, location,
    window: { addEventListener: (name, cb) => { windowEvents[name] = cb; } },
    sessionStorage: {
      getItem: key => { if (options.blocked) throw new Error('blocked'); return storage.get(key) || null; },
      setItem: (key, value) => { if (options.blocked) throw new Error('blocked'); storage.set(key, value); },
    },
    MutationObserver: class { constructor(cb) { observer = cb; } observe() {} },
  });
  vm.runInContext(script, context);
  return {
    anchor, storage,
    data: () => {
      documentEvents.click({ target: anchor });
      return JSON.parse(new URL(anchor.href).searchParams.get('attribution'));
    },
    navigate(url) { context.location = new URL(url); observer(); },
    click() { documentEvents.click({ target: anchor }); },
  };
}

test('landing UTM persists across pages and first/last campaigns retain custom, duplicate and Cyrillic values', () => {
  const page = browser('https://danilrodin.ru/?utm_source=Яндекс&utm_term=a%26b&utm_term=second&utm_custom-key=42');
  page.navigate('https://danilrodin.ru/consulting');
  page.click();
  let data = page.data();
  assert.equal(data.first.path, '/');
  assert.equal(data.page, '/consulting');
  assert.deepEqual(data.first.utm, [['utm_source', 'Яндекс'], ['utm_term', 'a&b'], ['utm_term', 'second'], ['utm_custom-key', '42']]);
  assert.equal(data.first.referrer, 'https://yandex.ru/search/');
  page.navigate('https://danilrodin.ru/en/consulting?utm_source=email');
  data = page.data();
  assert.equal(data.first.utm[0][1], 'Яндекс');
  assert.equal(data.last.utm[0][1], 'email');
  assert.deepEqual(parseAttribution(new URL(page.anchor.href)).first.utm, data.first.utm);
});

test('full-page navigation survives through sessionStorage; blocked storage still supports current page', () => {
  const landing = browser('https://danilrodin.ru/blog/article?utm_source=search');
  const next = browser('https://danilrodin.ru/consulting', { storage: landing.storage });
  assert.equal(next.data().first.path, '/blog/article');
  const blocked = browser('https://danilrodin.ru/?utm_source=test', { blocked: true });
  assert.equal(blocked.data().first.utm[0][1], 'test');
  blocked.navigate('https://danilrodin.ru/consulting');
  assert.equal(blocked.data().first.utm[0][1], 'test');
});

test('direct campaign links preserve all UTM and reject malformed or excessive attribution', () => {
  const data = parseAttribution(new URL('https://example.com/go?utm_source=a&utm_content=b&utm_content=c&secret=no'));
  assert.deepEqual(data.first.utm, [['utm_source', 'a'], ['utm_content', 'b'], ['utm_content', 'c']]);
  assert.equal(JSON.stringify(data).includes('secret'), false);
  assert.throws(() => parseAttribution(new URL('https://example.com/go?attribution=%7B')));
  assert.throws(() => parseAttribution(new URL('https://example.com/go?page=https://evil.example')));
  assert.throws(() => parseAttribution(new URL('https://example.com/go?utm_source=' + 'a'.repeat(5000))));
});

test('HTTP redirect stores attribution before handing a short payload to Telegram', async t => {
  const store = new Store();
  const server = createHttpServer({ store, botUsername: 'example_bot', ownerChatId: 999, health: () => true });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  t.after(async () => { await new Promise(resolve => server.close(resolve)); store.close(); });
  const base = `http://127.0.0.1:${server.address().port}`;
  const result = await fetch(base + '/go?utm_source=Яндекс&utm_extra=test', { redirect: 'manual' });
  assert.equal(result.status, 302);
  assert.equal(result.headers.get('referrer-policy'), 'no-referrer');
  const target = new URL(result.headers.get('location'));
  assert.equal(target.origin, 'https://t.me');
  assert.equal(target.pathname, '/example_bot');
  const token = target.searchParams.get('start');
  assert.match(token, /^web_[A-Za-z0-9_-]{24}$/);
  assert.ok(token.length <= 64);
  assert.deepEqual(store.getClick(token).first.utm, [['utm_source', 'Яндекс'], ['utm_extra', 'test']]);
  assert.equal((await fetch(base + '/go?attribution=invalid')).status, 400);
  assert.equal((await fetch(base + '/missing')).status, 404);
  assert.equal((await fetch(base + '/healthz')).status, 200);
  assert.equal((await fetch(base + '/go', { method: 'POST' })).status, 405);
});
