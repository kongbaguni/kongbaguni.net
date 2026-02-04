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