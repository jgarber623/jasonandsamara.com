---
---

'use strict';

const version = 'v{{ "now" | date: "%Y%m%d%H%M%S" }}';

const clearOldCaches = () => {
  return caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key.indexOf(version) === -1) {
        return caches.delete(key);
      }
    }));
  });
};

const updateCache = () => {
  return caches.open(version).then(cache => {
    // These items won't block Service Worker installation
    cache.addAll([
      '{% asset countdown.jpg @path %}',
      '{% asset countdown-narrow.jpg @path %}',
      '{% asset hero.jpg @path %}',
      '{% asset hero-narrow.jpg @path %}',
      '{% asset registry-bed-bath-and-beyond.png @path %}',
      '{% asset registry-crate-and-barrel.png @path %}',
      '{% asset registry-zola.png @path %}'
    ]);

    // These items must be cached and will block Service Worker installation
    return cache.addAll([
      '/',
      '{% asset application.css @path %}',
      '{% asset application.js @path %}'
    ]);
  });
};

addEventListener('install', event => {
  event.waitUntil(updateCache().then(() => self.skipWaiting()));
});

addEventListener('activate', event => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

addEventListener('fetch', event => {
  const request = event.request;

  // Load resources from the cache first, then from the network…
  event.respondWith(caches.match(request).then(response => {
    return response || fetch(request);
  }));
});
