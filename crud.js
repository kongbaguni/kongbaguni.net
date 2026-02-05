let db;
const DB_NAME = "TodoDB";
const STORE_NAME = "todos";

// DB 열기
const request = indexedDB.open(DB_NAME, 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;

  if (!db.objectStoreNames.contains(STORE_NAME)) {
    const store = db.createObjectStore(STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,
    });
  }
};

request.onsuccess = function (e) {
  db = e.target.result;
  readTodos();
};

request.onerror = function () {
  console.error("IndexedDB 열기 실패");
};

// CREATE
function addTodo(title) {
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  store.add({
    title,
    createdAt: new Date(),
  });

  tx.oncomplete = readTodos;
}

// READ
function readTodos() {
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();

  request.onsuccess = function () {
    $("#todoList").empty();

    request.result.forEach((todo) => {
      $("#todoList").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo.title}</span>
          <div>
            <span>${formatTimeAgo(todo.createdAt)}</span>
            <button class="btn btn-sm btn-warning me-1" onclick="editTodo(${todo.id}, '${todo.title}')">수정</button>
            <button class="btn btn-sm btn-danger" onclick="deleteTodo(${todo.id})">삭제</button>
          </div>
        </li>
      `);
    });
  };
}

// UPDATE
function editTodo(id, oldTitle) {
  const newTitle = prompt("수정할 내용", oldTitle);
  if (!newTitle) return;

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const request = store.get(id);
  request.onsuccess = function () {
    const data = request.result;
    data.title = newTitle;
    store.put(data);
  };

  tx.oncomplete = readTodos;
}

// DELETE
function deleteTodo(id) {
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  store.delete(id);

  tx.oncomplete = readTodos;
}

// 이벤트
$("#addBtn").on("click", function () {
  const value = $("#todoInput").val().trim();
  if (!value) return;

  addTodo(value);
  $("#todoInput").val("");
});


function formatTimeAgo(date) {
  var now = new Date();
  var target = new Date(date);

  var diffMs = now - target; // 밀리초 차이
  if (diffMs < 0) return '방금 전';

  var diffMin = Math.floor(diffMs / 1000 / 60);
  var diffHour = Math.floor(diffMin / 60);
  var diffDay = Math.floor(diffHour / 24);

  // 1시간 이내
  if (diffMin < 60) {
    return diffMin <= 0 ? '방금 전' : diffMin + '분 전';
  }

  // 24시간 이내
  if (diffHour < 24) {
    return diffHour + '시간 전';
  }

  // 10일 이내
  if (diffDay < 10) {
    return diffDay + '일 전';
  }

  // 그 외: 날짜 포맷
  var y = target.getFullYear();
  var m = String(target.getMonth() + 1).padStart(2, '0');
  var d = String(target.getDate()).padStart(2, '0');

  return y + '.' + m + '.' + d;
}


function NetworkStatus(onChange) {
  var isOnline = navigator.onLine;

  function notify(status) {
    if (isOnline !== status) {
      isOnline = status;
      onChange(isOnline);
    }
  }

  // 브라우저 이벤트
  window.addEventListener('online', function () {
    checkRealConnection();
  });

  window.addEventListener('offline', function () {
    notify(false);
  });

  // 실제 네트워크 체크
  function checkRealConnection() {
    // 아주 가벼운 요청
    fetch('/ping.txt', { cache: 'no-store' })
      .then(function () {
        notify(true);
      })
      .catch(function () {
        notify(false);
      });
  }

  // 최초 상태 확인
  checkRealConnection();

  return {
    isOnline: function () {
      return isOnline;
    },
    refresh: checkRealConnection
  };
}

$(document).ready(function() {
    const $btn = $('#sync-btn');
    const $btnText = $btn.find('.btn-text');

    // 상태 업데이트 함수
    function updateOnlineStatus() {
        if (navigator.onLine) {
            // 온라인 상태
            $btn.prop('disabled', false)
                .removeClass('btn-secondary')
                .addClass('btn-primary');
            $btnText.text('데이터 전송하기');
        } else {
            // 오프라인 상태
            $btn.prop('disabled', true)
                .removeClass('btn-primary')
                .addClass('btn-secondary');
            $btnText.text('오프라인 상태 (연결 필요)');
        }
    }

    // 이벤트 리스너 등록
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // 페이지 로드 시 초기 상태 확인
    updateOnlineStatus();
});