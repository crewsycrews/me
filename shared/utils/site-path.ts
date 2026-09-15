// GitHub Pages serves prerendered pages from <path>/index.html.
export const toStaticSitePath = (path: string) => {
  const [, pathname = "", suffix = ""] = path.match(/^([^?#]*)(.*)$/) || [];

  // Files such as RSS feeds keep their extension; queries and hashes stay intact.
  if (!pathname || /\.[^/]+$/.test(pathname)) return path;

  return `${pathname.replace(/\/+$/, "")}/${suffix}`;
};
