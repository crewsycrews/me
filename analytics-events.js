(function () {
  'use strict';

  function track(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    var anchor = event.target.closest && event.target.closest('a[data-analytics-event]');
    if (!anchor) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: anchor.getAttribute('data-analytics-event'),
      contact_channel: anchor.getAttribute('data-analytics-channel') || undefined,
      link_position: anchor.getAttribute('data-analytics-position'),
      page_path: window.location.pathname
    });
  }

  document.addEventListener('click', track);
  document.addEventListener('auxclick', track);
}());
