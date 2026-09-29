import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { channel, hash, makeMessage, makePublication } from "./content.mjs";

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
  if (method === "editMessageText" && result?.error_code === 400 && result?.description?.includes("message is not modified")) {
    return { message_id: payload.message_id };
  }
  if (result?.ok === false && response.status < 500 && Number.isInteger(result?.error_code)) {
    const error = new Error(`Telegram отклонил запрос (${result?.error_code}). Проверьте токен, права бота и формат сообщения.`);
    error.rejected = true;
    throw error;
  }
  const messages = method === "sendMediaGroup" ? result?.result : [result?.result];
  const expectedCount = method === "sendMediaGroup" ? payload.media.length : 1;
  if (!response.ok || result?.ok !== true || !Array.isArray(messages) || messages.length !== expectedCount ||
      messages.some((message) => !Number.isSafeInteger(message?.message_id) || message.message_id < 1) ||
      new Set(messages.map((message) => message.message_id)).size !== messages.length) {
    throw new Error("Неожиданный ответ Telegram. Нужна ручная сверка результата.");
  }
  return result.result;
}

// Text and photos have separate durable reservations. A partial post resumes at
// the photos; an ambiguous request stays pending until the operator reconciles it.
async function sendPhotos({ post, store, token, request }) {
  const previous = store.state.posts[post.slug];
  const photos = previous.photos;
  const method = photos.length === 1 ? "sendPhoto" : "sendMediaGroup";
  const payload = {
    chat_id: channel,
    reply_parameters: { message_id: previous.messageId },
    ...(photos.length === 1 ? { photo: photos[0] }
      : { media: photos.map((media) => ({ type: "photo", media })) }),
  };
  store.state.posts[post.slug] = {
    status: "pending", operation: "media", previous,
    attemptId: randomUUID(), startedAt: new Date().toISOString(),
  };
  await store.save(store.state);
  let result;
  try {
    result = await request(method, payload, token);
  } catch (error) {
    if (error.rejected) {
      store.state.posts[post.slug] = previous;
      await store.save(store.state);
    }
    throw error;
  }
  const mediaMessageIds = (Array.isArray(result) ? result : [result]).map((message) => message.message_id);
  store.state.posts[post.slug] = { ...previous, status: "sent", mediaMessageIds };
  try {
    await store.save(store.state);
  } catch {
    throw new Error(`${post.slug}: Telegram принял фото, но журнал не сохранён. Используйте resolve --message-ids ${mediaMessageIds.join(",")}.`);
  }
  return `sent: ${previous.messageId}; photos: ${mediaMessageIds.join(",")}`;
}

export async function publishPost({ post, store, token, update = false, wait, request = telegramRequest }) {
  const oldEntry = entryFor(store.state, post);
  if (oldEntry?.status === "pending") {
    throw new Error(`${post.slug}: есть незавершённая попытка. Сверьте канал и используйте telegram resolve.`);
  }
  if (oldEntry?.status === "sent" && !update) return "already published";
  if (update && !oldEntry) throw new Error(`${post.slug}: нет message_id для обновления.`);
  if (update && oldEntry.status === "partial") throw new Error(`${post.slug}: сначала завершите отправку фото через publish.`);
  const publication = update ? undefined : await makePublication(post);
  const payload = update
    ? await makeMessage(post, { imageLinks: !oldEntry.photos })
    : publication.message;
  const messageHash = hash(JSON.stringify(payload));
  if (oldEntry?.status === "partial" && (oldEntry.hash !== messageHash ||
      JSON.stringify(oldEntry.photos) !== JSON.stringify(publication.photos))) {
    throw new Error(`${post.slug}: незавершённая публикация изменилась. Верните исходный текст и фото, завершите publish, затем обновляйте статью.`);
  }
  if (update && oldEntry.hash === messageHash) return "unchanged";
  if (!token) throw new Error("Не задан TELEGRAM_BOT_TOKEN. Добавьте GitHub Actions secret.");
  await wait(post);
  if (oldEntry?.status === "partial") return sendPhotos({ post, store, token, request });
  const photos = update ? oldEntry.photos : publication.photos;
  const pending = {
    status: "pending", operation: update ? "edit" : "send", attemptId: randomUUID(),
    startedAt: new Date().toISOString(), hash: messageHash,
    ...(photos ? { photos } : {}),
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
    ...oldEntry,
    status: !update && photos.length ? "partial" : "sent",
    messageId: result.message_id, hash: messageHash,
    ...(photos ? { photos } : {}),
    publishedAt: oldEntry?.publishedAt || new Date().toISOString(),
  };
  try {
    await store.save(store.state);
  } catch {
    throw new Error(`${post.slug}: Telegram принял сообщение ${result.message_id}, но журнал не сохранён. Используйте resolve --message-id ${result.message_id}.`);
  }
  if (!update && photos.length) return sendPhotos({ post, store, token, request });
  return `${update ? "updated" : "sent"}: ${result.message_id}`;
}

export async function resolvePending(store, slug, messageId) {
  const entry = store.state.posts[slug];
  if (entry?.status !== "pending") throw new Error(`${slug}: незавершённой попытки нет.`);
  if (messageId !== undefined) {
    if (entry.operation === "media") {
      if (!Array.isArray(messageId) || messageId.length !== entry.previous.photos.length ||
          messageId.some((id) => !Number.isSafeInteger(id) || id < 1) || new Set(messageId).size !== messageId.length) {
        throw new Error("Для фото нужны все ID через --message-ids, в порядке альбома.");
      }
      store.state.posts[slug] = { ...entry.previous, status: "sent", mediaMessageIds: messageId, resolvedAt: new Date().toISOString() };
    } else {
      if (!Number.isSafeInteger(messageId) || messageId < 1 || (entry.operation === "edit" && messageId !== entry.messageId)) {
        throw new Error("Нужен корректный message_id; при редактировании ID должен совпадать с исходным.");
      }
      store.state.posts[slug] = {
        ...entry.previous,
        status: entry.operation === "send" && entry.photos?.length ? "partial" : "sent",
        messageId, hash: entry.hash, ...(entry.photos ? { photos: entry.photos } : {}),
        resolvedAt: new Date().toISOString(),
      };
    }
  } else if (entry.previous) {
    store.state.posts[slug] = entry.previous;
  } else {
    delete store.state.posts[slug];
  }
  await store.save(store.state);
}
