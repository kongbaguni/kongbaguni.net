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
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. HTML 문서 요청 (페이지 이동 / 새로고침)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetchAndNotify(request).catch(() => caches.match('/crud.html'))
    );
    return;
  }

  // 2. JS / CSS / 이미지 등 정적 리소스 (Cache First 전략)
  event.respondWith(
    caches.match(url.pathname).then((cachedResponse) => {
      return cachedResponse || fetchAndNotify(request);
    })
  );
});

/**
 * 네트워크 요청을 수행하고 상태를 브로드캐스팅하는 공통 함수
 */
async function fetchAndNotify(request) {
  try {
    const response = await fetch(request);
    broadcastNetworkStatus('online');
    return response;
  } catch (error) {
    broadcastNetworkStatus('offline');
    throw error; // 에러를 던져서 .catch() 블록이 실행되도록 함
  }
}


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

''