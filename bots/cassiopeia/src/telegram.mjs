export function createTelegram(token, fetchImpl = fetch) {
  return async (method, body = {}, signal) => {
    try {
      const response = await fetchImpl(`https://api.telegram.org/bot${token}/${method}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(45000)]) : AbortSignal.timeout(45000),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        const error = new Error(`Telegram ${method} failed`);
        error.code = data.error_code || response.status;
        error.retryAfter = data.parameters?.retry_after;
        throw error;
      }
      return data.result;
    } catch (cause) {
      // Never expose request URLs: they contain the bot token.
      const error = new Error(`Telegram ${method} failed`);
      error.code = cause.code || 'network';
      error.retryAfter = cause.retryAfter;
      throw error;
    }
  };
}

export async function deliverPending(store, api, signal) {
  for (const row of store.pending()) {
    if (signal?.aborted) break;
    try {
      await api('sendMessage', JSON.parse(row.payload), signal);
      store.sent(row.id);
    } catch (error) {
      store.retry(row, error);
      console.error(JSON.stringify({ event: 'delivery_retry', outboxId: row.id, code: error.code || 'network' }));
    }
  }
}
