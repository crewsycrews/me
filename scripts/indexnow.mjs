import { readFile } from "node:fs/promises";

const endpoint = "https://yandex.com/indexnow";
const keyFileName = "2c63cd824616b7dfa96d8c74a879dbb5.txt";
const usage = `Отправка новых, изменённых или удалённых страниц после публикации:
  npm run indexnow -- /blog/post /en/blog/post
  npm run indexnow -- https://danilrodin.ru/about

Проверка запроса без сетевых обращений:
  npm run indexnow -- --dry-run /blog/post /en/blog/post`;

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log(usage);
    return;
  }

  const dryRun = args.includes("--dry-run");
  const inputs = args.filter((arg) => arg !== "--dry-run");
  if (!inputs.length) throw new Error(usage);

  const host = (
    await readFile(new URL("../public/CNAME", import.meta.url), "utf8")
  ).trim();
  const site = new URL(`https://${host}`);
  const key = (
    await readFile(new URL(`../public/${keyFileName}`, import.meta.url), "utf8")
  ).trim();
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key) || keyFileName !== `${key}.txt`) {
    throw new Error("Некорректный файл ключа IndexNow.");
  }

  const urlList = [...new Set(inputs.map((input) => {
    if (!input.startsWith("/") && !input.startsWith("https://")) {
      throw new Error(`Нужен путь от корня или HTTPS URL: ${input}`);
    }
    const url = new URL(input, site);
    if (
      url.origin !== site.origin || url.username || url.password ||
      url.search || url.hash
    ) {
      throw new Error(`Нужен URL сайта ${site.origin} без параметров и якоря: ${input}`);
    }
    return url.href;
  }))];
  if (urlList.length > 10_000) {
    throw new Error("В одном запросе допустимо не более 10 000 URL.");
  }

  const keyLocation = new URL(`/${keyFileName}`, site).href;
  const payload = { host, key, keyLocation, urlList };
  if (dryRun) {
    console.log(JSON.stringify({ endpoint, ...payload }, null, 2));
    return;
  }

  // GitHub Pages must serve the key before Yandex can verify the request.
  const keyResponse = await fetch(keyLocation, {
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== key) {
    throw new Error(
      `Ключ недоступен или не совпадает: ${keyLocation}. Сначала опубликуйте сайт и дождитесь обновления GitHub Pages.`,
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    redirect: "error",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  if (response.status === 200) {
    console.log(`IndexNow: Яндекс принял ${urlList.length} URL (200). Это не гарантирует индексацию.`);
  } else if (response.status === 202) {
    console.log(`IndexNow: запрос на ${urlList.length} URL принят, ключ ожидает проверки (202). Позже отправьте другие изменённые страницы и проверьте, что ответ стал 200.`);
  } else {
    const details = (await response.text()).slice(0, 1000);
    throw new Error(`IndexNow: HTTP ${response.status}. ${details}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
