import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { channel } from "./content.mjs";

const ref = "refs/heads/telegram-state";

export function validateState(state) {
  if (state?.version !== 1 || state.channel !== channel || !state.posts || typeof state.posts !== "object" || Array.isArray(state.posts)) {
    throw new Error("Некорректный журнал telegram-state/state.json. Автоматическая отправка остановлена.");
  }
  for (const entry of Object.values(state.posts)) {
    if (!["sent", "pending"].includes(entry?.status) ||
        (entry.status === "sent" && (!Number.isSafeInteger(entry.messageId) || entry.messageId < 1))) {
      throw new Error("Повреждённая запись в журнале Telegram.");
    }
  }
  return state;
}

// Only Git objects and the remote journal ref are written. No checkout, index
// changes, source commits or local branch switches are needed.
export function openGitState(root) {
  const git = (args, input) => {
    try {
      return execFileSync("git", args, {
        cwd: root, input, encoding: "utf8", timeout: 30_000,
        stdio: ["pipe", "pipe", "pipe"],
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: "Telegram publisher", GIT_AUTHOR_EMAIL: "telegram@users.noreply.github.com",
          GIT_COMMITTER_NAME: "Telegram publisher", GIT_COMMITTER_EMAIL: "telegram@users.noreply.github.com",
        },
      }).trim();
    } catch {
      // Never print remote URLs or credential-bearing Git diagnostics.
      throw new Error(`Git ${args[0]}: не удалось прочитать/сохранить журнал. Проверьте доступ к origin и повторите команду.`);
    }
  };
  const remote = git(["ls-remote", "--refs", "origin", ref]);
  let parent;
  let state = { version: 1, channel, posts: {} };
  if (remote) {
    git(["fetch", "--no-tags", "origin", ref]);
    parent = git(["rev-parse", "FETCH_HEAD"]);
    state = validateState(JSON.parse(git(["show", `${parent}:state.json`])));
  }
  return {
    state,
    async save(next) {
      validateState(next);
      const blob = git(["hash-object", "-w", "--stdin"], `${JSON.stringify(next, null, 2)}\n`);
      const tree = git(["mktree"], `100644 blob ${blob}\tstate.json\n`);
      const commit = git(["commit-tree", tree, ...(parent ? ["-p", parent] : [])], `Telegram publication journal ${randomUUID()}\n`);
      // Normal fast-forward push: a competing reservation is rejected before
      // sending. No force push and no retry against a stale journal snapshot.
      git(["push", "origin", `${commit}:${ref}`]);
      parent = commit;
    },
  };
}
