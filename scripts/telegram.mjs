import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { channel, hash, makeMessage, readPosts, validSlug } from "./telegram/content.mjs";
import { openGitState } from "./telegram/state.mjs";
import { entryFor, publishPost, resolvePending, waitForPage } from "./telegram/publisher.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, ".output/telegram-manifest.json");
const usage = `Публикация блога в ${channel}:
  npm run telegram -- preview [slug]       Предпросмотр без сети и отправки
  npm run telegram -- prepare              После generate: проверить сообщения и запомнить HTML
  npm run telegram -- publish              Отправить новые записи с telegram.publish: true
  npm run telegram -- update slug          Явно обновить существующее сообщение
  npm run telegram -- status               Прочитать удалённый журнал отправок
  npm run telegram -- resolve slug --message-id 123
  npm run telegram -- resolve slug --not-sent

resolve используется только после ручной сверки канала. Команды publish/update
ожидают актуальную сборку и TELEGRAM_BOT_TOKEN; журнал хранится в origin/telegram-state.`;

async function main() {
  const [command = "preview", ...args] = process.argv.slice(2);
  if (command === "--help") return console.log(usage);
  if (!["preview", "prepare", "publish", "update", "status", "resolve"].includes(command)) throw new Error(usage);
  if (["prepare", "publish", "status"].includes(command) && args.length) throw new Error(usage);
  if (command === "preview" && args.length > 1) throw new Error(usage);
  if (["update", "resolve"].includes(command) && !args[0]) throw new Error(usage);
  if (args[0] && !validSlug(args[0])) throw new Error("Нужен slug статьи без пути и расширения .md.");
  if (command === "update" && args.length !== 1) throw new Error(usage);
  if (command === "resolve" && !(
    (args.length === 2 && args[1] === "--not-sent") ||
    (args.length === 3 && args[1] === "--message-id" && /^[1-9]\d*$/.test(args[2]))
  )) throw new Error(usage);

  if (command === "status" || command === "resolve") {
    const store = openGitState(root);
    if (command === "status") return console.log(JSON.stringify(store.state, null, 2));
    await resolvePending(store, args[0], args[1] === "--message-id" ? Number(args[2]) : undefined);
    console.log(`${args[0]}: журнал исправлен; сообщения не отправлялись.`);
    return;
  }

  const posts = await readPosts(root);
  const selected = args[0] ? posts.filter((post) => post.slug === args[0]) : posts.filter((post) => post.telegram?.publish);
  if (args[0] && !selected.length) throw new Error(`Статья не найдена: ${args[0]}`);

  if (command === "preview") {
    for (const post of selected) {
      const payload = await makeMessage(post);
      console.log(`${post.slug} → ${channel} (${payload.text.length}/4096)${post.telegram.message_id ? `; уже опубликован: ${post.telegram.message_id}` : ""}\n\n${payload.text}\n`);
      const links = payload.entities.filter((entity) => entity.type === "text_link");
      if (links.length) console.log("Ссылки в тексте:\n" + links.map((entity) =>
        `${payload.text.slice(entity.offset, entity.offset + entity.length)} → ${entity.url}`,
      ).join("\n") + "\n");
    }
    if (!selected.length) console.log("Нет записей с telegram.publish: true.");
    return;
  }

  if (command === "prepare") {
    const manifest = { version: 1, posts: {} };
    for (const post of posts.filter((post) => post.telegram)) {
      // Validate enabled outgoing messages before the site's deploy step.
      if (post.telegram.publish) await makeMessage(post);
      const html = await readFile(join(root, ".output/public/blog", post.slug, "index.html"));
      manifest.posts[post.slug] = { sourceHash: post.sourceHash, htmlHash: hash(html) };
    }
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`Подготовлено страниц: ${Object.keys(manifest.posts).length}. Отправки не было.`);
    return;
  }

  if (!selected.length) return console.log("Нет записей для Telegram.");
  const store = openGitState(root);
  const update = command === "update";
  // Existing message_id metadata imports posts without rewriting their text.
  let imported = false;
  for (const post of posts) {
    if (post.telegram?.message_id && !store.state.posts[post.slug]) {
      store.state.posts[post.slug] = entryFor(store.state, post);
      imported = true;
    }
  }
  if (imported) await store.save(store.state);
  const candidates = selected.filter((post) => update || entryFor(store.state, post)?.status !== "sent");
  if (!candidates.length) return console.log("Все выбранные статьи уже опубликованы. Повторной отправки нет.");
  let manifest;
  try { manifest = JSON.parse(await readFile(manifestPath, "utf8")); }
  catch { throw new Error("Нет манифеста сборки. Выполните npm run generate, затем npm run telegram -- prepare."); }
  if (manifest.version !== 1) throw new Error("Неподдерживаемая версия манифеста сборки.");

  // Validate the whole batch before the first send, so a bad later post cannot
  // result in a half-published batch caused by a predictable formatting error.
  for (const post of candidates) {
    if (entryFor(store.state, post)?.status === "pending") throw new Error(`${post.slug}: нужна сверка канала и команда resolve.`);
    await makeMessage(post);
    if (manifest.posts?.[post.slug]?.sourceHash !== post.sourceHash) throw new Error(`${post.slug}: исходник изменился после prepare. Пересоберите сайт.`);
  }
  for (const post of candidates) {
    const result = await publishPost({
      post, store, update, token: process.env.TELEGRAM_BOT_TOKEN,
      wait: () => waitForPage(post, manifest.posts[post.slug].htmlHash),
    });
    console.log(`${post.slug}: ${result}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
