// ES5만 사용
var CACHE_NAME = 'pwa-demo-v1';

// 필요한 정적 파일들
var STATIC_ASSETS = [
  '/dev/web/indexedDbCRUD/bootstrap.min.css',
  '/dev/web/indexedDbCRUD/jquery-4.0.0.min.js',
  '/dev/web/indexedDbCRUD/app.js',
  '/dev/web/indexedDbCRUD/index.html',
  '/dev/web/indexedDbCRUD/style.css',
];

// 설치 시 캐시
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        STATIC_ASSETS.map(function (url) {
          return cache.add(url).catch(function (e) {
            console.warn('캐시 실패:', url);
          });
        })
      );
    })
  );
});
// 활성화 시 이전 캐시 정리 (버전 바뀔 때)
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          return response;
        })
        .catch(function () {
          return caches.match('/dev/web/indexedDbCRUD/index.html');
        })
    );
    return;
  }

  // 📌 나머지 리소스
  event.respondWith(
  caches.match(new URL(event.request.url).pathname)
    .then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});