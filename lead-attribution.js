// Classic script: the generated homepage deliberately has no Nuxt hydration.
(function () {
  'use strict';
  var storageKey = 'cassiopeia-attribution-v1';
  var state;
  var lastLocation;
  var ttl = 30 * 24 * 60 * 60 * 1000;

  function referrerPath() {
    try {
      var url = new URL(document.referrer);
      return url.origin === location.origin ? '' : url.origin + url.pathname;
    } catch (_) { return ''; }
  }

  function capture() {
    if (state && state.expires < Date.now()) { state = null; lastLocation = null; }
    if (lastLocation === location.href && state) return;
    lastLocation = location.href;
    var now = Date.now();
    if (!state) {
      try { state = JSON.parse(sessionStorage.getItem(storageKey)); } catch (_) {}
      if (!state || !state.first || !state.last || !Number.isFinite(state.expires) || state.expires < now) state = null;
    }
    var utm = Array.from(new URL(location.href).searchParams).filter(function (pair) {
      return /^utm_/i.test(pair[0]);
    });
    var touch = { path: location.pathname, utm: utm, referrer: referrerPath(), capturedAt: new Date(now).toISOString() };
    if (!state) state = { first: touch, last: touch, expires: now + ttl };
    else if (utm.length) state.last = touch;
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {}
  }

  function updateLink(anchor) {
    var endpoint = anchor.getAttribute('data-lead-endpoint');
    if (!endpoint) return;
    try {
      var url = new URL(endpoint);
      if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) return;
      url.searchParams.set('attribution', JSON.stringify({ first: state.first, last: state.last, page: location.pathname }));
      anchor.href = url.href;
    } catch (_) {}
  }

  function refresh() {
    capture();
  }
  refresh();
  // Covers click, keyboard navigation, middle-click and copying/opening via context menu.
  ['pointerdown', 'focusin', 'contextmenu', 'click'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      var anchor = event.target.closest && event.target.closest('a[data-lead-endpoint]');
      if (anchor) { capture(); updateLink(anchor); }
    }, true);
  });
  window.addEventListener('popstate', refresh);
  window.addEventListener('pageshow', refresh);
  // Nuxt navigations can insert links after initial loading. Observe children only, not href writes.
  new MutationObserver(refresh).observe(document.documentElement, { childList: true, subtree: true });
}());
