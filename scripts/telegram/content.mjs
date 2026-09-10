import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

export const channel = "@casiq_the_dev";
export const hash = (value) => createHash("sha256").update(value).digest("hex");
export const validSlug = (slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

export async function readPosts(root) {
  const site = new URL(`https://${(await readFile(join(root, "public/CNAME"), "utf8")).trim()}`);
  const files = (await readdir(join(root, "content"))).filter((f) => f.endsWith(".md")).sort();
  return Promise.all(files.map(async (file) => {
    const slug = file.slice(0, -3);
    if (!validSlug(slug)) throw new Error(`Некорректный slug: ${slug}`);
    const source = await readFile(join(root, "content", file), "utf8");
    const parsed = await parseMarkdown(source, { highlight: false });
    const telegram = parsed.data.telegram;
    if (telegram !== undefined) {
      if (!telegram || typeof telegram !== "object" || Array.isArray(telegram)) {
        throw new Error(`${slug}: telegram должен быть объектом.`);
      }
      for (const key of Object.keys(telegram)) {
        if (!["publish", "mode", "text", "message_id"].includes(key)) {
          throw new Error(`${slug}: неизвестная настройка telegram.${key}.`);
        }
      }
      if (typeof telegram.publish !== "boolean" || !["full", "teaser"].includes(telegram.mode)) {
        throw new Error(`${slug}: нужны telegram.publish (true/false) и mode (full/teaser).`);
      }
      if (telegram.mode === "teaser" && (typeof telegram.text !== "string" || !telegram.text.trim())) {
        throw new Error(`${slug}: для teaser нужен telegram.text.`);
      }
      if (telegram.message_id !== undefined && (!Number.isSafeInteger(telegram.message_id) || telegram.message_id < 1)) {
        throw new Error(`${slug}: некорректный telegram.message_id.`);
      }
    }
    return { slug, sourceHash: hash(source), ...parsed, telegram, url: new URL(`/blog/${slug}`, site).href };
  }));
}

// Use Telegram entities instead of MarkdownV2 escaping. Offsets are UTF-16,
// matching JavaScript string indices and the Bot API (including emoji).
export function renderBody(body, baseUrl) {
  let text = "";
  let entities = [];
  const append = (value) => { text += value; };
  const gap = () => { if (text && !text.endsWith("\n\n")) text += text.endsWith("\n") ? "\n" : "\n\n"; };
  const mark = (type, render, extra = {}) => {
    const offset = text.length;
    render();
    const length = text.slice(offset).trimEnd().length;
    if (length) entities.push({ type, offset, length, ...extra });
  };
  const link = (target) => {
    const url = new URL(target, baseUrl);
    if (!["https:", "http:", "mailto:"].includes(url.protocol)) {
      throw new Error(`Неподдерживаемая ссылка: ${url.protocol}`);
    }
    return url.href;
  };
  const walk = (node) => {
    if (node.type === "text") return append(node.value);
    const children = () => (node.children || []).forEach(walk);
    const tag = node.tag;
    if (node.type === "root") return children();
    if (tag === "p") { children(); gap(); return; }
    if (/^h[1-6]$/.test(tag)) { mark("bold", children); gap(); return; }
    if (["strong", "b", "em", "i", "del", "s"].includes(tag)) {
      return mark(({ strong: "bold", b: "bold", em: "italic", i: "italic", del: "strikethrough", s: "strikethrough" })[tag], children);
    }
    if (tag === "a") return mark("text_link", children, { url: link(node.props.href) });
    if (tag === "img") return mark("text_link", () => append(`📷 ${node.props.alt || "Изображение"}`), { url: link(node.props.src) });
    if (tag === "code") return mark("code", children);
    if (tag === "pre") {
      mark("pre", () => append(node.props.code || ""), { language: node.props.language || "" });
      gap(); return;
    }
    if (tag === "br") return append("\n");
    if (tag === "hr") { append("———"); gap(); return; }
    if (tag === "blockquote") { append("❝ "); children(); gap(); return; }
    if (tag === "ul" || tag === "ol") {
      let index = Number(node.props?.start || 1);
      for (const item of node.children || []) {
        if (item.tag !== "li") continue;
        append(tag === "ol" ? `${index++}. ` : "• ");
        (item.children || []).forEach(walk);
        if (!text.endsWith("\n")) append("\n");
      }
      gap(); return;
    }
    throw new Error(`В Telegram не поддерживается <${tag}>. Используйте mode: teaser.`);
  };
  walk(body);
  text = text.trimEnd();
  // Telegram forbids code/pre overlapping any other formatting. Preserve links
  // and emphasis in that uncommon case, rendering the nested code as plain text.
  entities = entities.filter((entity) => !["code", "pre"].includes(entity.type) || !entities.some((other) =>
    other !== entity && other.offset < entity.offset + entity.length && entity.offset < other.offset + other.length,
  ));
  return { text, entities };
}

export async function makeMessage(post) {
  if (!post.telegram) throw new Error(`${post.slug}: нет настроек telegram.`);
  const title = post.data.title;
  if (typeof title !== "string" || !title.trim()) throw new Error(`${post.slug}: нужен title.`);
  const body = post.telegram.mode === "teaser"
    ? (await parseMarkdown(post.telegram.text, { highlight: false })).body
    : post.body;
  const rendered = renderBody(body, post.url);
  if (!rendered.text) throw new Error(`${post.slug}: пустой текст.`);
  const prefix = `${title}\n\n`;
  const text = `${prefix}${rendered.text}\n\nЧитать в блоге: ${post.url}`;
  // Conservative UTF-16 count also accounts for title, emoji and the URL.
  if (text.length > 4096) {
    throw new Error(`${post.slug}: ${text.length}/4096 символов. Подготовьте более короткий teaser.`);
  }
  return {
    chat_id: channel,
    text,
    entities: [
      { type: "bold", offset: 0, length: title.length },
      ...rendered.entities.map((entity) => ({ ...entity, offset: entity.offset + prefix.length })),
    ],
    link_preview_options: { is_disabled: true },
  };
}
