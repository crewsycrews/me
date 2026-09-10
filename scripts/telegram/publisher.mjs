import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { hash, makeMessage } from "./content.mjs";

export function entryFor(state, post) {
  return state.posts[post.slug] || (post.telegram?.message_id
    ? { status: "sent", messageId: post.telegram.message_id, imported: true }
    : undefined);
}

export async function waitForPage(post, expectedHash, { fetcher = fetch, sleep = delay, attempts = 40 } = {}) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const url = new URL(post.url);
      url.searchParams.set("publication", `${expectedHash.slice(0, 12)}-${attempt}`);
      const response = await fetcher(url, { signal: AbortSignal.timeout(15_000), headers: { "Cache-Control": "no-cache" } });
      if (response.ok && hash(Buffer.from(await response.arrayBuffer())) === expectedHash) return;
    } catch { /* Pages may still be deploying. Only read operations are retried. */ }
    if (attempt + 1 < attempts) await sleep(10_000);
  }
  throw new Error(`${post.slug}: новая версия страницы ещё недоступна. Telegram не отправлен; повторите workflow позже.`);
}

export async function telegramRequest(method, payload, token, fetcher = fetch) {
  let response, result;
  try {
    response = await fetcher(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST", redirect: "error",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(30_000),
    });
    result = await response.json();
  } catch {
    throw new Error("Ответ Telegram не получен. Результат неизвестен; автоматического повтора не будет.");
  }
  if (method === "editMessageText" && result.error_code === 400 && result.description?.includes("message is not modified")) {
    return { message_id: payload.message_id };
  }
  if (result.ok === false && response.status < 500 && Number.isInteger(result.error_code)) {
    const error = new Error(`Telegram отклонил запрос (${result.error_code}). Проверьте токен, права бота и формат сообщения.`);
    error.rejected = true;
    throw error;
  }
  if (!response.ok || result.ok !== true || !Number.isSafeInteger(result.result?.message_id) || result.result.message_id < 1) {
    throw new Error("Неожиданный ответ Telegram. Нужна ручная сверка результата.");
  }
  return result.result;
}

export async function publishPost({ post, store, token, update = false, wait, request = telegramRequest }) {
  const oldEntry = entryFor(store.state, post);
  if (oldEntry?.status === "pending") {
    throw new Error(`${post.slug}: есть незавершённая попытка. Сверьте канал и используйте telegram resolve.`);
  }
  if (oldEntry && !update) return "already published";
  if (update && !oldEntry) throw new Error(`${post.slug}: нет message_id для обновления.`);
  const payload = await makeMessage(post);
  const messageHash = hash(JSON.stringify(payload));
  if (update && oldEntry.hash === messageHash) return "unchanged";
  if (!token) throw new Error("Не задан TELEGRAM_BOT_TOKEN. Добавьте GitHub Actions secret.");
  await wait(post);
  const pending = {
    status: "pending", operation: update ? "edit" : "send", attemptId: randomUUID(),
    startedAt: new Date().toISOString(), hash: messageHash,
    ...(oldEntry ? { previous: oldEntry, messageId: oldEntry.messageId } : {}),
  };
  store.state.posts[post.slug] = pending;
  await store.save(store.state); // Must be durable BEFORE contacting Telegram.
  let result;
  try {
    result = await request(update ? "editMessageText" : "sendMessage", {
      ...payload, ...(update ? { message_id: oldEntry.messageId } : {}),
    }, token);
  } catch (error) {
    if (error.rejected) {
      if (oldEntry) store.state.posts[post.slug] = oldEntry;
      else delete store.state.posts[post.slug];
      await store.save(store.state);
    }
    throw error;
  }
  store.state.posts[post.slug] = {
    status: "sent", messageId: result.message_id, hash: messageHash,
    publishedAt: new Date().toISOString(),
  };
  try {
    await store.save(store.state);
  } catch {
    throw new Error(`${post.slug}: Telegram принял сообщение ${result.message_id}, но журнал не сохранён. Используйте resolve --message-id ${result.message_id}.`);
  }
  return `${update ? "updated" : "sent"}: ${result.message_id}`;
}

export async function resolvePending(store, slug, messageId) {
  const entry = store.state.posts[slug];
  if (entry?.status !== "pending") throw new Error(`${slug}: незавершённой попытки нет.`);
  if (messageId !== undefined) {
    if (!Number.isSafeInteger(messageId) || messageId < 1 || (entry.operation === "edit" && messageId !== entry.messageId)) {
      throw new Error("Нужен корректный message_id; при редактировании ID должен совпадать с исходным.");
    }
    store.state.posts[slug] = { status: "sent", messageId, hash: entry.hash, resolvedAt: new Date().toISOString() };
  } else if (entry.previous) {
    store.state.posts[slug] = entry.previous;
  } else {
    delete store.state.posts[slug];
  }
  await store.save(store.state);
}
