export function useLeadContact() {
  const config = useRuntimeConfig().public;
  const endpoint = config.leadBotUrl;
  return {
    leadEndpoint: endpoint,
    leadHref: endpoint || (config.leadBotUsername
      ? `https://max.ru/${config.leadBotUsername}?start=website`
      : 'https://cassey.danilrodin.ru/go'),
  };
}
