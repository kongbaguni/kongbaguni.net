// ES5만 사용
var CACHE_NAME = 'pwa-demo-v1';

// 필요한 정적 파일들
var STATIC_ASSETS = [
  '/index.html',
  '/manifest.json',
  '/app.js',
  '/icon-192.png',
  '/icon-512.png'
];

// 설치 시 캐시
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
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

// 요청 가로채기
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(function () {
        // 네트워크 실패 & 캐시 없음인 경우 최소 fallback
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});