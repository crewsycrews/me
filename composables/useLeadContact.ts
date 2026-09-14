export function useLeadContact() {
  const config = useRuntimeConfig().public;
  const endpoint = config.leadBotUrl;
  return {
    leadEndpoint: endpoint,
    leadHref: endpoint || `https://t.me/${config.leadBotUsername}?start=website`,
  };
}
