// 전역 변수 (beforeinstallprompt)
var deferredPrompt = null;

// DOM 준비
document.addEventListener('DOMContentLoaded', function () {
  var statusEl = document.getElementById('status');
  var installBtn = document.getElementById('installBtn');
  var loadDataBtn = document.getElementById('loadDataBtn');
  var dataContainer = document.getElementById('dataContainer');

  // PWA 설치 이벤트
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;

    installBtn.style.display = 'inline-block';
    statusEl.textContent = '설치 가능: 홈 화면에 추가 버튼을 눌러보세요.';

    installBtn.onclick = function () {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choiceResult) {
        statusEl.textContent = '설치 결과: ' + choiceResult.outcome;
        deferredPrompt = null;
      });
    };
  });

  // 서비스워커 등록
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function (reg) {
      statusEl.textContent = '서비스 워커 등록 완료. (온라인/오프라인 캐시 지원)';
      console.log('SW registered', reg);
    }).catch(function (err) {
      statusEl.textContent = '서비스 워커 등록 실패: ' + err;
      console.log('SW failed', err);
    });
  } else {
    statusEl.textContent = '이 브라우저는 서비스 워커를 지원하지 않습니다.';
  }

  // 단순 데이터 로드 버튼 (온라인이면 fetch, 아니면 fallback)
  loadDataBtn.onclick = function () {
    // Android 9 WebView는 fetch 지원이 애매할 수 있으니 XMLHttpRequest 사용
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'sample-data.json', true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var data;
          try {
            data = JSON.parse(xhr.responseText);
          } catch (e) {
            dataContainer.innerHTML = '<div class="card">JSON 파싱 오류</div>';
            return;
          }
          renderData(data);
        } else {
          dataContainer.innerHTML = '<div class="card">요청 실패 또는 오프라인일 수 있습니다.</div>';
        }
      }
    };

    xhr.send();
  };

  function renderData(list) {
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      html += '<div class="card">';
      html += '<strong>' + escapeHtml(item.title) + '</strong><br>';
      html += '<span style="font-size:12px;color:#666;">' + escapeHtml(item.desc) + '</span>';
      html += '</div>';
    }
    dataContainer.innerHTML = html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
});