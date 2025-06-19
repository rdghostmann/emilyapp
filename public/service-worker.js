self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  // You can add caching logic here if needed
    event.respondWith(
        fetch(event.request).catch(() => {
        return caches.match(event.request);
        })
    );
});