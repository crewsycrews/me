import { createMax } from './max.mjs';

// Run explicitly once HTTPS routing is ready; startup never changes subscriptions.
const token = process.env.MAX_BOT_TOKEN || '';
const secret = process.env.MAX_WEBHOOK_SECRET || '';
const url = process.env.MAX_WEBHOOK_URL || '';
try {
  const endpoint = new URL(url);
  if (!token || !/^[A-Za-z0-9_-]{32,256}$/.test(secret)) throw new Error('Configure MAX_BOT_TOKEN and MAX_WEBHOOK_SECRET');
  if (endpoint.protocol !== 'https:' || endpoint.port || endpoint.username || endpoint.password || endpoint.pathname !== '/webhook' || endpoint.search || endpoint.hash) {
    throw new Error('MAX_WEBHOOK_URL must be https://your-domain/webhook on port 443');
  }
  await createMax(token)('POST', '/subscriptions', { url, secret, update_types: ['message_created', 'bot_started'] });
  console.log('MAX webhook subscription configured');
} catch (error) {
  console.error(JSON.stringify({ event: 'subscription_failed', message: error.message, code: error.code }));
  process.exitCode = 1;
}
