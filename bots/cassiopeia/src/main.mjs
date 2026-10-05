import { setTimeout as sleep } from 'node:timers/promises';
import { Store } from './store.mjs';
import { processUpdate } from './bot.mjs';
import { createHttpServer } from './http.mjs';
import { createMax, deliverPending } from './max.mjs';

async function main() {
  const token = process.env.MAX_BOT_TOKEN || '';
  const botUsername = (process.env.MAX_BOT_USERNAME || '').replace(/^@/, '');
  const ownerUserId = Number(process.env.OWNER_USER_ID || 0);
  const webhookSecret = process.env.MAX_WEBHOOK_SECRET || '';
  const port = Number(process.env.PORT || 3000);
  if (!token || /\s/.test(token)) throw new Error('Set MAX_BOT_TOKEN in .env');
  if (!/^[A-Za-z0-9_]{1,128}$/.test(botUsername)) throw new Error('Set MAX_BOT_USERNAME in .env');
  if (!/^[A-Za-z0-9_-]{32,256}$/.test(webhookSecret)) throw new Error('Set MAX_WEBHOOK_SECRET (32-256 characters)');
  if (!Number.isSafeInteger(ownerUserId) || ownerUserId < 0) throw new Error('OWNER_USER_ID must be a positive MAX user ID or empty during setup');
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  const api = createMax(token);
  const me = await api('GET', '/me');
  if (me.username?.toLowerCase() !== botUsername.toLowerCase()) throw new Error('MAX_BOT_USERNAME does not match MAX_BOT_TOKEN');
  const store = new Store(process.env.DATABASE_PATH || './data/cassiopeia-max.sqlite');
  const abort = new AbortController();
  const { signal } = abort;
  let lastCleanup = 0;
  let lastDelivery = Date.now();
  const health = () => {
    const backlog = store.backlog();
    return Date.now() - lastDelivery < 120000 && (!backlog.oldest || Date.now() - backlog.oldest < 600000);
  };
  const server = createHttpServer({ store, botUsername, ownerUserId, health, webhookSecret,
    onUpdate: update => processUpdate(store, update, { ownerUserId, botToken: token }),
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, process.env.HOST || '0.0.0.0', resolve);
  });
  console.log(JSON.stringify({ event: 'started', platform: 'max', port, mode: ownerUserId ? 'leads' : 'setup' }));
  const stop = () => { abort.abort(); };
  process.once('SIGTERM', stop);
  process.once('SIGINT', stop);
  try {
    while (!signal.aborted) {
      await deliverPending(store, api, signal);
      lastDelivery = Date.now();
      if (Date.now() - lastCleanup > 3600000) { store.cleanup(); lastCleanup = Date.now(); }
      await sleep(1000, undefined, { signal }).catch(() => {});
    }
  } finally {
    stop();
    await new Promise(resolve => server.close(resolve));
    store.close();
  }
}

main().catch(error => {
  console.error(JSON.stringify({ event: 'fatal', message: error.message, code: error.code }));
  process.exitCode = 1;
});
