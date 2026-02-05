// ES5 only
var CACHE_NAME = 'pwa-demo-v1';

// 반드시 실제로 존재하는 파일만!
var STATIC_ASSETS = [
  'crud.html',
  'crud.js',
  'jquery-4.0.0.min.js',
  'bootstrap.min.css',
  'style.css',
];

// --------------------
// INSTALL
// --------------------
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // addAll 대신 개별 add → 하나 실패해도 전체 안 죽음
      return Promise.all(
        STATIC_ASSETS.map(function (url) {
          return cache.add(url).catch(function (err) {
            console.warn('[SW] 캐시 실패:', url, err);
          });
        })
      );
    })
  );

  // 새 SW 즉시 활성화
  self.skipWaiting();
});

// --------------------
// ACTIVATE
// --------------------
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
    }).then(function () {
      // 열린 탭 즉시 제어
      return self.clients.claim();
    })
  );
});

// --------------------
// FETCH
// --------------------
self.addEventListener('fetch', function (event) {

  // 1️⃣ HTML 문서 요청 (페이지 이동 / 새로고침)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          return response;
        })
        .catch(function () {
          // 오프라인이면 캐시된 index.html
          return caches.match('/crud.html');
        })
    );
    return;
  }

  // 2️⃣ JS / CSS / 기타 정적 리소스
  event.respondWith(
    caches.match(new URL(event.request.url).pathname)
      .then(function (cachedResponse) {

        // 캐시에 있으면 캐시 사용 (네트워크 판단 안 바꿈)
        if (cachedResponse) {
          return cachedResponse;
        }

        // 캐시에 없으면 네트워크 시도
        return fetch(event.request)
          .then(function (response) {
            broadcastNetworkStatus('online');
            return response;
          })
          .catch(function () {
            broadcastNetworkStatus('offline');
            return caches.match(event.request);
      });
    })
  );
});


/**
 * 네트워크 상태 브로드 케스트 
 */
var NETWORK_STATUS = 'online'; // online | offline
function broadcastNetworkStatus(status) {
  if (NETWORK_STATUS === status) return;
  NETWORK_STATUS = status;

  self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      client.postMessage({
        type: 'NETWORK_STATUS',
        status: status
      });
    });
  });
}
