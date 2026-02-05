let db;
let editingId = null;

/* =========================
   IndexedDB Init
========================= */
const request = indexedDB.open("ProductDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  const store = db.createObjectStore("products", {
    keyPath: "id",
    autoIncrement: true
  });
  store.createIndex("category", "category", { unique: false });
};

request.onsuccess = e => {
  db = e.target.result;
  syncFromApiIfNeeded();
};

/* =========================
   API Sync (최초 1회)
========================= */
function syncFromApiIfNeeded() {
  const tx = db.transaction("products", "readonly");
  const store = tx.objectStore("products");
  const countRequest = store.count();

  countRequest.onsuccess = () => {
    const count = countRequest.result;

    if (count === 0 && navigator.onLine) {
      console.log("🌐 Online & Empty DB → Fetch API");
      fetchProductsFromApi();
    } else {
      loadProducts();
    }
  };
}

function fetchProductsFromApi() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(products => {
      const tx = db.transaction("products", "readwrite");
      const store = tx.objectStore("products");

      products.forEach(p => {
        store.add({
          title: p.title,
          price: p.price,
          description: p.description,
          category: p.category,
          image: p.image
        });
      });

      tx.oncomplete = loadProducts;
    })
    .catch(() => loadProducts());
}

/* =========================
   Form Submit (Add / Edit)
========================= */
$("#productForm").on("submit", function (e) {
  e.preventDefault();

  const product = {
    title: $("#title").val(),
    price: parseFloat($("#price").val()),
    description: $("#description").val(),
    category: $("#category").val(),
    image: $("#image").val()
  };

  const tx = db.transaction("products", "readwrite");
  const store = tx.objectStore("products");

  if (editingId !== null) {
    product.id = editingId;
    store.put(product);
  } else {
    store.add(product);
  }

  tx.oncomplete = () => {
    resetForm();
    loadProducts();
  };
});

/* =========================
   Load Products
========================= */
function loadProducts() {
  const tbody = $("#productTable").empty();
  const tx = db.transaction("products", "readonly");
  const store = tx.objectStore("products");

  store.openCursor().onsuccess = e => {
    const cursor = e.target.result;
    if (!cursor) return;

    const p = cursor.value;
    tbody.append(`
      <tr>
        <td>${p.id}</td>
        <td>${p.title}</td>
        <td>${p.price.toLocaleString()}원</td>
        <td>${p.category}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1"
            onclick="editProduct(${p.id})">수정</button>
          <button class="btn btn-sm btn-danger"
            onclick="deleteProduct(${p.id})">삭제</button>
        </td>
      </tr>
    `);

    cursor.continue();
  };
}

/* =========================
   Edit / Delete / Reset
========================= */
function editProduct(id) {
  const tx = db.transaction("products", "readonly");
  tx.objectStore("products").get(id).onsuccess = e => {
    const p = e.target.result;
    $("#title").val(p.title);
    $("#price").val(p.price);
    $("#description").val(p.description);
    $("#category").val(p.category);
    $("#image").val(p.image);

    editingId = id;
    $("button[type=submit]")
      .text("수정")
      .removeClass("btn-primary")
      .addClass("btn-success");
  };
}

function deleteProduct(id) {
  const tx = db.transaction("products", "readwrite");
  tx.objectStore("products").delete(id);
  tx.oncomplete = loadProducts;
}

function resetForm() {
  $("#productForm")[0].reset();
  editingId = null;
  $("button[type=submit]")
    .text("추가")
    .removeClass("btn-success")
    .addClass("btn-primary");
}

function formatTimeAgo(date) {
  if(date == null) {
    return ""
  }
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
    $btn.on('click', function() {
      alert("TODO : 업로드");
    })

    // 이벤트 리스너 등록
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // 페이지 로드 시 초기 상태 확인
    updateOnlineStatus();
});