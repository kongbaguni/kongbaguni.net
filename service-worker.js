// ES5만 사용
var CACHE_NAME = 'pwa-demo-v1';

// 필요한 정적 파일들
var STATIC_ASSETS = [
  '/index.html',
  '/java.js',
  '/profile.jpeg',
  '/toTop_black.png',
  '/toTop_dark.png',
  '/toTop_light.png',
  '/toTop_white.png',
  '/unicycle.jpg',
  '/style.css',
  '/dev/iOS/index.html',
  '/dev/web/index.html',
  '/snap/index.html',
  '/pwaTest/manifest.json',
  '/pwaTest/app.js',
  '/pwaTest/icon-192.png',
  '/pwaTest/icon-512.png'
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
    caches.keys().then(function (keys) {ㅖ
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

  // 📌 문서 요청만 따로 처리
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          return response;
        })
        .catch(function () {
          // 오프라인이면 무조건 index.html
          return caches.match('/index.html');
        })
    );
    return;
  }

  // 📌 나머지 리소스
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});