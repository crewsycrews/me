import { setTimeout as sleep } from 'node:timers/promises';
import { Store } from './store.mjs';
import { processUpdate } from './bot.mjs';
import { createHttpServer } from './http.mjs';
import { createTelegram, deliverPending } from './telegram.mjs';

async function main() {
  const token = process.env.BOT_TOKEN || '';
  const botUsername = (process.env.BOT_USERNAME || '').replace(/^@/, '');
  const ownerChatId = Number(process.env.OWNER_CHAT_ID || 0);
  const port = Number(process.env.PORT || 3000);
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) throw new Error('Set BOT_TOKEN in .env');
  if (!/^[A-Za-z0-9_]{5,32}$/.test(botUsername)) throw new Error('Set BOT_USERNAME in .env');
  if (!Number.isSafeInteger(ownerChatId) || ownerChatId < 0) throw new Error('OWNER_CHAT_ID must be a positive private chat ID or empty during setup');
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  const api = createTelegram(token);
  const me = await api('getMe');
  if (me.username.toLowerCase() !== botUsername.toLowerCase()) throw new Error('BOT_USERNAME does not match BOT_TOKEN');
  const webhook = await api('getWebhookInfo');
  if (webhook.url) throw new Error('This bot has a webhook. Use a separate bot or remove the webhook explicitly before polling.');
  const store = new Store(process.env.DATABASE_PATH || './data/cassiopeia.sqlite');
  const abort = new AbortController();
  const { signal } = abort;
  let lastPoll = Date.now();
  let lastCleanup = 0;
  const health = () => {
    const backlog = store.backlog();
    return Date.now() - lastPoll < 120000 && (!backlog.oldest || Date.now() - backlog.oldest < 600000);
  };
  const server = createHttpServer({ store, botUsername, ownerChatId, health });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, process.env.HOST || '0.0.0.0', resolve);
  });
  console.log(JSON.stringify({ event: 'started', port, mode: ownerChatId ? 'leads' : 'setup' }));
  const stop = () => { abort.abort(); server.close(); };
  process.once('SIGTERM', stop);
  process.once('SIGINT', stop);
  const pause = (ms) => sleep(ms, undefined, { signal }).catch(() => {});
  async function polling() {
    while (!signal.aborted) {
      let updates;
      try {
        updates = await api('getUpdates', { offset: store.offset, timeout: 25, allowed_updates: ['message'] }, signal);
        lastPoll = Date.now();
      } catch (error) {
        if (signal.aborted) break;
        console.error(JSON.stringify({ event: 'poll_retry', code: error.code }));
        if ([401, 409].includes(error.code)) throw new Error('Bot authorization failed or another poller is running');
        await pause(Math.max(3000, Number(error.retryAfter || 0) * 1000));
        continue;
      }
      for (const update of updates) processUpdate(store, update, { ownerChatId });
    }
  }
  async function delivery() {
    while (!signal.aborted) {
      await deliverPending(store, api, signal);
      if (Date.now() - lastCleanup > 3600000) { store.cleanup(); lastCleanup = Date.now(); }
      await pause(500);
    }
  }
  const jobs = [polling(), delivery()];
  try { await Promise.all(jobs); }
  finally {
    stop();
    await Promise.allSettled(jobs);
    store.close();
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ event: 'fatal', message: error.message }));
  process.exitCode = 1;
});
