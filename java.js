// ================================
// ข้อมูลหนังสือ
// ================================

let books = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J.K. Rowling",
    borrowed: false
  },
  {
    id: 2,
    title: "เจ้าชายน้อย",
    author: "Antoine de Saint-Exupéry",
    borrowed: false
  },
  {
    id: 3,
    title: "เพอร์ซีย์ แจ็กสัน",
    author: "Rick Riordan",
    borrowed: false
  },
  {
    id: 4,
    title: "ความสุขของกะทิ",
    author: "งามพรรณ เวชชาชีวะ",
    borrowed: false
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    borrowed: false
  },
  {
    id: 6,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    borrowed: false
  }
];


// ================================
// แสดงหนังสือ
// ================================

function displayBooks(list = books) {

  const bookList = document.getElementById("bookList");

  bookList.innerHTML = "";

  if (list.length === 0) {
    bookList.innerHTML = `
      <p class="empty">
        ไม่พบหนังสือที่ค้นหา
      </p>
    `;
    return;
  }

  list.forEach(book => {

    const card = document.createElement("div");

    card.className = "book-card";

    card.innerHTML = `
      <div class="book-icon">📕</div>

      <h3>${book.title}</h3>

      <p class="author">
        ผู้แต่ง: ${book.author}
      </p>

      <span class="status ${
        book.borrowed ? "borrowed" : "available"
      }">
        ${
          book.borrowed
            ? "ถูกยืมแล้ว"
            : "พร้อมให้ยืม"
        }
      </span>

      <button
        onclick="toggleBorrow(${book.id})"
        ${book.borrowed ? "disabled" : ""}
      >
        ${
          book.borrowed
            ? "กำลังถูกยืม"
            : "ยืมหนังสือ"
        }
      </button>
    `;

    bookList.appendChild(card);
  });
}


// ================================
// ยืม / คืนหนังสือ
// ================================

function toggleBorrow(id) {

  const book = books.find(book => book.id === id);

  if (!book) return;

  if (!book.borrowed) {

    book.borrowed = true;

    showNotification(
      `ยืม "${book.title}" สำเร็จ 📚`
    );

  } else {

    book.borrowed = false;

    showNotification(
      `คืน "${book.title}" สำเร็จ ✅`
    );
  }

  displayBooks();
  displayBorrowedBooks();
  updateStats();
}


// ================================
// แสดงรายการหนังสือที่ยืม
// ================================

function displayBorrowedBooks() {

  const borrowedList =
    document.getElementById("borrowedList");

  const borrowedBooks =
    books.filter(book => book.borrowed);

  if (borrowedBooks.length === 0) {

    borrowedList.innerHTML = `
      <p class="empty">
        ยังไม่มีหนังสือที่ยืม
      </p>
    `;

    return;
  }

  borrowedList.innerHTML = "";

  borrowedBooks.forEach(book => {

    const item = document.createElement("div");

    item.className = "borrowed-item";

    item.innerHTML = `
      <div class="borrowed-info">

        <h3>📕 ${book.title}</h3>

        <p>
          ผู้แต่ง: ${book.author}
        </p>

      </div>

      <button
        class="return-btn"
        onclick="returnBook(${book.id})"
      >
        คืนหนังสือ
      </button>
    `;

    borrowedList.appendChild(item);
  });
}


// ================================
// คืนหนังสือ
// ================================

function returnBook(id) {

  const book = books.find(book => book.id === id);

  if (!book) return;

  book.borrowed = false;

  showNotification(
    `คืน "${book.title}" สำเร็จ ✅`
  );

  displayBooks();
  displayBorrowedBooks();
  updateStats();
}


// ================================
// อัปเดตจำนวนหนังสือ
// ================================

function updateStats() {

  const total = books.length;

  const borrowed =
    books.filter(book => book.borrowed).length;

  const available =
    total - borrowed;

  document.getElementById("totalBooks")
    .textContent = total;

  document.getElementById("availableBooks")
    .textContent = available;

  document.getElementById("borrowedBooks")
    .textContent = borrowed;
}


// ================================
// ระบบค้นหา
// ================================

document
  .getElementById("searchInput")
  .addEventListener("input", function () {

    const keyword =
      this.value.toLowerCase().trim();

    const result = books.filter(book =>

      book.title
        .toLowerCase()
        .includes(keyword)

      ||

      book.author
        .toLowerCase()
        .includes(keyword)

    );

    displayBooks(result);
  });


// ================================
// แจ้งเตือน
// ================================

function showNotification(message) {

  const notification =
    document.getElementById("notification");

  notification.textContent = message;

  notification.classList.add("show");

  setTimeout(() => {

    notification.classList.remove("show");

  }, 2500);
}


// ================================
// เริ่มต้นเว็บไซต์
// ================================

displayBooks();
displayBorrowedBooks();
updateStats();
