'use strict';

const cacheVersion = 'v1';

const ignoredUrls = [
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

addEventListener('install', event => {
  self.skipWaiting();

  // Populate the cache…
  event.waitUntil(
    caches.open(cacheVersion).then(cache => {
      return cache.addAll([
        '/'
      ]);
    })
  );
});

addEventListener('activate', event => {
  self.clients.claim();

  // Clear old caches…
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== cacheVersion;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Don't cache ignored URLs…
  if (ignoredUrls.includes(url.hostname)) {
    return;
  }

  // Load resources from the cache first, then from the network…
  // Update the cached resource from the network…
  event.respondWith(
    caches.open(cacheVersion).then(cache => {
      return caches.match(request).then(response => {
        const fetchPromise = fetch(request).then(networkResponse => {
          cache.put(request, networkResponse.clone());
          return networkResponse;
        }).catch(() => {
          return response;
        });

        return response || fetchPromise;
      });
    })
  );
});
