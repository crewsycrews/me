import { DatabaseSync } from 'node:sqlite';
import { randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export class Store {
  constructor(path = ':memory:') {
    if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(path);
    this.db.exec(`
      PRAGMA journal_mode=WAL;
      PRAGMA synchronous=FULL;
      PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS clicks (token TEXT PRIMARY KEY, data TEXT NOT NULL, created INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions (chat_id INTEGER PRIMARY KEY, data TEXT NOT NULL, updated INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, update_id INTEGER UNIQUE NOT NULL,
        data TEXT NOT NULL, created INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS outbox (id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER NOT NULL,
        payload TEXT NOT NULL, created INTEGER NOT NULL, next_attempt INTEGER NOT NULL DEFAULT 0,
        attempts INTEGER NOT NULL DEFAULT 0, sent INTEGER, error_code TEXT);
      CREATE INDEX IF NOT EXISTS outbox_pending ON outbox(sent, next_attempt);
    `);
  }
  transaction(fn) {
    this.db.exec('BEGIN IMMEDIATE');
    try { const result = fn(); this.db.exec('COMMIT'); return result; }
    catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  get offset() { return this.db.prepare("SELECT value FROM meta WHERE key='offset'").get()?.value ?? 0; }
  set offset(value) { this.db.prepare("INSERT OR REPLACE INTO meta VALUES ('offset', ?)").run(value); }
  createClick(data, now = Date.now()) {
    const token = `web_${randomBytes(18).toString('base64url')}`;
    this.db.prepare('INSERT INTO clicks VALUES (?, ?, ?)').run(token, JSON.stringify(data), now);
    return token;
  }
  getClick(token, now = Date.now()) {
    const row = this.db.prepare('SELECT data FROM clicks WHERE token=? AND created>?').get(token, now - 30 * 86400000);
    return row ? JSON.parse(row.data) : null;
  }
  getSession(chatId, now = Date.now()) {
    const row = this.db.prepare('SELECT data FROM sessions WHERE chat_id=? AND updated>?').get(chatId, now - 30 * 86400000);
    return row ? JSON.parse(row.data) : null;
  }
  saveSession(chatId, data) {
    this.db.prepare('INSERT OR REPLACE INTO sessions VALUES (?, ?, ?)').run(chatId, JSON.stringify(data), Date.now());
  }
  deleteSession(chatId) { this.db.prepare('DELETE FROM sessions WHERE chat_id=?').run(chatId); }
  addLead(updateId, data) {
    return Number(this.db.prepare('INSERT INTO leads(update_id, data, created) VALUES (?, ?, ?)')
      .run(updateId, JSON.stringify(data), Date.now()).lastInsertRowid);
  }
  enqueue(chatId, payload) {
    this.db.prepare('INSERT INTO outbox(chat_id, payload, created) VALUES (?, ?, ?)')
      .run(chatId, JSON.stringify({ ...payload, chat_id: chatId }), Date.now());
  }
  pending(now = Date.now()) {
    // A failed recipient must not block messages to other people; preserve order per chat.
    return this.db.prepare(`SELECT * FROM outbox o WHERE sent IS NULL AND next_attempt<=?
      AND NOT EXISTS (SELECT 1 FROM outbox prev WHERE prev.chat_id=o.chat_id AND prev.sent IS NULL AND prev.id<o.id)
      ORDER BY id LIMIT 20`).all(now);
  }
  sent(id) { this.db.prepare('UPDATE outbox SET sent=?, error_code=NULL WHERE id=?').run(Date.now(), id); }
  retry(row, error) {
    const delay = Math.max(Number(error.retryAfter || 0) * 1000, Math.min(3600000, 2000 * 2 ** Math.min(row.attempts, 11)));
    this.db.prepare('UPDATE outbox SET attempts=attempts+1, next_attempt=?, error_code=? WHERE id=?')
      .run(Date.now() + delay, String(error.code || 'network'), row.id);
  }
  backlog() {
    return this.db.prepare('SELECT count(*) AS count, min(created) AS oldest FROM outbox WHERE sent IS NULL').get();
  }
  cleanup(now = Date.now()) {
    this.db.prepare('DELETE FROM clicks WHERE created<?').run(now - 30 * 86400000);
    this.db.prepare('DELETE FROM sessions WHERE updated<?').run(now - 30 * 86400000);
    this.db.prepare('DELETE FROM outbox WHERE sent IS NOT NULL AND sent<?').run(now - 7 * 86400000);
  }
  close() { this.db.close(); }
}
