self.addEventListener('install', event => {
  console.log("Service Worker installed");
  event.waitUntil(
    caches.open("pwa-cache")
      .then(cache => cache.addAll(["/", "/index.html"]))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
  );
});