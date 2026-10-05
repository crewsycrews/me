import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export function createMax(token, fetchImpl = fetch) {
  return async (method, path, body, signal) => {
    try {
      const response = await fetchImpl(`https://platform-api2.max.ru${path}`, {
        method, headers: { Authorization: token, 'Content-Type': 'application/json' },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw Object.assign(new Error('MAX request failed'), {
          code: response.status, retryAfter: Number(response.headers?.get('retry-after') || 0),
        });
      }
      return data;
    } catch (cause) {
      // Never log API responses, tokens, request headers or contact data.
      throw Object.assign(new Error(`MAX ${method} request failed`), {
        code: cause.code || cause.cause?.code || (cause.name === 'TimeoutError' ? 'ETIMEDOUT' : 'network'),
        retryAfter: cause.retryAfter,
      });
    }
  };
}

function ownContact(attachments, sender, token) {
  const payload = Array.isArray(attachments) ? attachments.find(a => a?.type === 'contact')?.payload : undefined;
  if (!token || typeof payload?.vcf_info !== 'string' || typeof payload.hash !== 'string') return;
  const vcf = payload.vcf_info.replace(/\\r\\n/g, '\r\n');
  const expected = createHmac('sha256', token).update(vcf).digest();
  const hash = /^[a-fA-F0-9]{64}$/.test(payload.hash)
    ? Buffer.from(payload.hash, 'hex') : Buffer.from(payload.hash, 'base64url');
  if (hash.length !== expected.length || !timingSafeEqual(hash, expected)) return;
  if (payload.max_info?.user_id != null && payload.max_info.user_id !== sender.user_id) return;
  const lines = vcf.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const phones = lines.filter(line => /^TEL(?:;[^:]*)?:/i.test(line));
  if (phones.length !== 1) return;
  const phone = phones[0].slice(phones[0].indexOf(':') + 1).replace(/^tel:/i, '').trim();
  if (!/^\+?[0-9 ()-]{5,32}$/.test(phone)) return;
  return { user_id: sender.user_id, phone_number: phone };
}

// MAX has message IDs, not Telegram's monotonically increasing update_id.
// Deduplicate each event independently: webhook deliveries can arrive out of order.
export function normalizeUpdate(update, token) {
  let sender, text, attachments, key;
  if (update?.update_type === 'bot_started') {
    sender = update.user;
    if (!Number.isSafeInteger(update.timestamp)) throw new Error('Invalid event timestamp');
    text = `/start ${typeof update.payload === 'string' ? update.payload : ''}`.trim();
    key = 'start:' + createHash('sha256').update(JSON.stringify([
      update.chat_id, sender?.user_id, update.timestamp, update.payload ?? null,
    ])).digest('hex');
  } else if (update?.update_type === 'message_created') {
    const m = update.message;
    if (m?.recipient?.chat_type !== 'dialog' || !m.sender || m.sender.is_bot) return;
    if (typeof m.body?.mid !== 'string' || !m.body.mid || m.body.mid.length > 256) throw new Error('Invalid message ID');
    sender = m.sender;
    text = typeof m.body.text === 'string' ? m.body.text : '';
    // Forwarded contacts must never establish ownership of a phone number.
    attachments = m.link ? [] : m.body.attachments;
    key = `message:${m.body.mid}`;
  } else return;
  if (!Number.isSafeInteger(sender?.user_id) || sender.user_id <= 0 || sender.is_bot) return;
  return { key, message: {
    chat: { id: sender.user_id, type: 'private' },
    from: { ...sender, id: sender.user_id }, text,
    contact: ownContact(attachments, sender, token),
  } };
}

export async function deliverPending(store, api, signal) {
  for (const row of store.pending()) {
    if (signal?.aborted) break;
    try {
      const { user_id, ...body } = JSON.parse(row.payload);
      await api('POST', `/messages?user_id=${user_id}&disable_link_preview=true`, body, signal);
      store.sent(row.id);
    } catch (error) {
      store.retry(row, error);
      console.error(JSON.stringify({ event: 'delivery_retry', outboxId: row.id, code: error.code || 'network' }));
    }
  }
}
