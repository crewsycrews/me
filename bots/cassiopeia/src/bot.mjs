import { normalizeUpdate } from './max.mjs';

const removeKeyboard = [];
const contactKeyboard = [{
  type: 'inline_keyboard',
  payload: { buttons: [[{ type: 'request_contact', text: 'Поделиться контактом' }]] },
}];
const prompts = {
  contact: 'Поделитесь своим номером телефона кнопкой «Поделиться контактом». Он нужен Данилу, чтобы связаться с вами по заявке.',
  request: 'Сформулируйте ваш запрос своими словами.',
};

function profileName(user) {
  return user?.name?.trim() || [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim();
}

function senderName(sender) {
  return profileName(sender) || (sender.username ? `@${sender.username}` : `MAX ID ${sender.id}`);
}

// MAX's message limit is 4000. Split by code points so emoji remain intact.
export function splitText(text, size = 3500) {
  const parts = [];
  let part = '';
  for (const char of text) {
    if (part.length + char.length > size) { parts.push(part); part = ''; }
    part += char;
  }
  if (part) parts.push(part);
  return parts;
}

export function formatLead(id, lead) {
  const a = lead.attribution;
  const lines = [
    `Новая заявка #${id} · Кассеопея`,
    `Дата: ${lead.createdAt}`,
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `MAX: ${lead.username ? `@${lead.username}` : 'без username'} (ID ${lead.userId})`,
    '', 'Запрос:', lead.request, '', 'Атрибуция:',
    `Источник: ${a.source}`,
  ];
  if (a.status) lines.push(`Статус: ${a.status}`);
  if (a.page) lines.push(`Страница перехода: ${a.page}`);
  for (const [key, label] of [['first', 'Первое касание'], ['last', 'Последнее касание']]) {
    if (!a[key]) continue;
    lines.push(`${label}: ${a[key].path}`);
    if (a[key].referrer) lines.push(`Реферер: ${a[key].referrer}`);
    if (a[key].capturedAt) lines.push(`Время: ${a[key].capturedAt}`);
    for (const [name, value] of a[key].utm) lines.push(`${name}: ${value}`);
  }
  return lines.join('\n');
}

export function processUpdate(store, update, config) {
  const normalized = normalizeUpdate(update, config.botToken);
  if (!normalized) return;
  store.transaction(() => {
    if (store.hasUpdate(normalized.key)) return;
    handleMessage(store, normalized, config);
    store.markUpdate(normalized.key);
  });
}

function handleMessage(store, update, { ownerUserId }) {
  const m = update.message;
  if (!m || m.chat?.type !== 'private' || !m.from || m.from.is_bot) return;
  const chatId = m.chat.id;
  const text = m.text?.trim() || '';
  const command = text.match(/^\/(\w+)(?:@\w+)?(?:\s+(.*))?$/s);
  const say = (message, keyboard = removeKeyboard) => store.enqueue(chatId, {
    text: message, attachments: keyboard,
  });
  const ask = (session) => say(prompts[session.step], session.step === 'contact' ? contactKeyboard : removeKeyboard);
  if (command?.[1] === 'whoami') {
    say(`Ваш MAX user ID: ${chatId}`);
    return;
  }
  if (!ownerUserId) {
    say('Кассеопея пока настраивается. Приём заявок скоро откроется.');
    return;
  }
  if (command?.[1] === 'cancel') {
    store.deleteSession(chatId);
    say('Заполнение отменено. Чтобы начать заново, нажмите /start.');
    return;
  }
  if (command?.[1] === 'help') {
    say('Я Кассеопея, помощница Данила Родина. Соберу контакт и описание задачи и передам заявку Данилу.\n/start — начать или продолжить\n/cancel — отменить заполнение\n/whoami — узнать свой MAX ID');
    return;
  }
  let session = store.getSession(chatId);
  // Drafts saved by the old flow must ask for the request before accepting text.
  if (session?.step === 'name') {
    session.name = senderName(m.from);
    session.step = 'request';
    store.saveSession(chatId, session);
    if (command?.[1] !== 'start') { ask(session); return; }
  }
  if (command?.[1] === 'start') {
    const payload = command[2] || '';
    let attribution;
    if (/^web_[A-Za-z0-9_-]{24}$/.test(payload)) {
      attribution = store.getClick(payload) || { source: 'website', status: 'Ссылка истекла или неизвестна; UTM недоступны' };
    } else if (payload === 'website') {
      attribution = { source: 'website', status: 'Прямая ссылка с сайта без UTM' };
    } else if (payload) {
      attribution = { source: 'unknown', status: 'Неизвестный параметр start' };
    }
    // Reopening a link keeps answers already entered; a new attributed link updates this draft.
    session ??= { step: 'contact', attribution: { source: 'max_direct' } };
    if (attribution) session.attribution = attribution;
    store.saveSession(chatId, session);
    say('Здравствуйте! Я Кассеопея, помощница Данила Родина. Помогу передать ему вашу заявку: попрошу контакт и описание задачи.');
    ask(session);
    return;
  }
  if (!session) {
    say('Чтобы оставить заявку, нажмите /start.');
    return;
  }
  if (command) { ask(session); return; }
  if (session.step === 'contact') {
    if (!m.contact || m.contact.user_id !== m.from.id || !/^\+?[0-9 ()-]{5,32}$/.test(m.contact.phone_number)) {
      say('Нужен именно ваш контакт. Нажмите кнопку «Поделиться контактом» под сообщением.', contactKeyboard);
      return;
    }
    session.phone = m.contact.phone_number;
    session.name = profileName(m.contact) || senderName(m.from);
    session.step = 'request';
  } else if (session.step === 'request') {
    if (!text || Array.from(text).length > 4000) {
      say('Опишите ваш запрос одним текстовым сообщением — до 4000 символов.');
      return;
    }
    const lead = {
      name: session.name, phone: session.phone, request: text,
      userId: m.from.id, username: m.from.username || null,
      attribution: session.attribution, createdAt: new Date().toISOString(),
    };
    const id = store.addLead(update.key, lead);
    const chunks = splitText(formatLead(id, lead));
    chunks.forEach((part, index) => store.enqueue(ownerUserId, {
      text: chunks.length > 1 ? `Заявка #${id} (${index + 1}/${chunks.length})\n${part}` : part,
    }));
    store.deleteSession(chatId);
    say(`Спасибо, ${lead.name}! Заявка #${id} принята. Передам её Данилу, чтобы он мог связаться с вами.\n\nДля новой заявки нажмите /start.`);
    return;
  }
  store.saveSession(chatId, session);
  ask(session);
}
