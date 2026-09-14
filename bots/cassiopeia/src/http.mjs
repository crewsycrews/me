import { createServer } from 'node:http';

function validPath(value) {
  return typeof value === 'string' && value.length <= 2048 && value.startsWith('/') && !value.startsWith('//') && !/[?#\r\n]/.test(value);
}
function touch(value) {
  if (!value || !validPath(value.path) || !Array.isArray(value.utm) || value.utm.length > 100) throw new Error('Invalid touch');
  if (!value.utm.every((pair) => Array.isArray(pair) && pair.length === 2 &&
    typeof pair[0] === 'string' && /^utm_[^\s\x00-\x1f]+$/i.test(pair[0]) && pair[0].length <= 100 &&
    typeof pair[1] === 'string' && pair[1].length <= 4096)) throw new Error('Invalid UTM');
  let referrer = '';
  if (value.referrer) {
    const url = new URL(value.referrer);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Invalid referrer');
    referrer = url.origin + url.pathname;
    if (referrer.length > 2048) throw new Error('Referrer too long');
  }
  const capturedAt = value.capturedAt ? new Date(value.capturedAt).toISOString() : null;
  return { path: value.path, utm: value.utm, referrer, capturedAt };
}

export function parseAttribution(url) {
  const raw = url.searchParams.get('attribution');
  if (raw) {
    if (Buffer.byteLength(raw) > 16384) throw new Error('Attribution too large');
    const data = JSON.parse(raw);
    if (!validPath(data.page)) throw new Error('Invalid page');
    return { source: 'website', page: data.page, first: touch(data.first), last: touch(data.last) };
  }
  // Also accept hand-written campaign links: /go?utm_source=...&utm_campaign=...
  const utm = [...url.searchParams].filter(([key]) => /^utm_/i.test(key));
  const item = touch({ path: url.searchParams.get('page') || '/', utm });
  return { source: 'website', page: item.path, first: item, last: item };
}

export function createHttpServer({ store, botUsername, ownerChatId, health }) {
  let bucket = { since: Date.now(), count: 0 };
  return createServer({ maxHeaderSize: 65536, requestTimeout: 10000, headersTimeout: 10000 }, (req, res) => {
    const send = (status, text, headers = {}) => {
      res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff', ...headers });
      res.end(text);
    };
    if (req.method !== 'GET') return send(405, 'Method not allowed', { Allow: 'GET' });
    if (Buffer.byteLength(req.url || '') > 49152) return send(414, 'Ссылка слишком длинная. Сократите UTM-параметры.');
    let url;
    try { url = new URL(req.url, 'http://localhost'); } catch { return send(400, 'Invalid URL'); }
    if (url.pathname === '/healthz') {
      return send(health() ? 200 : 503, health() ? 'ok' : 'degraded');
    }
    if (url.pathname !== '/go') return send(404, 'Not found');
    if (!ownerChatId) return send(503, 'Бот пока настраивается. Попробуйте позднее.');
    // Global bound avoids trusting spoofable proxy headers and unbounded IP maps.
    if (Date.now() - bucket.since > 60000) bucket = { since: Date.now(), count: 0 };
    if (++bucket.count > 120) return send(429, 'Слишком много переходов. Попробуйте через минуту.', { 'Retry-After': '60' });
    let attribution;
    try { attribution = parseAttribution(url); } catch { return send(400, 'Некорректные или слишком длинные параметры ссылки.'); }
    try {
      const token = store.createClick({ ...attribution, clickedAt: new Date().toISOString() });
      return send(302, 'Открываем Кассеопею в Telegram…', { Location: `https://t.me/${botUsername}?start=${token}` });
    } catch {
      console.error('click_storage_failed');
      return send(503, 'Не удалось сохранить переход. Попробуйте ещё раз позднее.');
    }
  });
}
