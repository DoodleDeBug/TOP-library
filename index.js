function Book(name, author, pages, status) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

///BRing up form for new book

const newBtn = document.querySelector(".new");
newBtn.addEventListener("click", toggleBookForm); //click button, toggle modal

const close = document.querySelector(".close-modal");
close.addEventListener("click", toggleBookForm); //click button, toggle modal

const modal = document.querySelector(".modal");

function toggleBookForm() {
  modal.classList.toggle("hidden"); // show modal
  display.clearForm();
}

///local storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(name, e) {
    const books = Store.getBooks();
    console.log(name);
    if (e.target.classList.contains("remove")) {
      books.forEach((book, index) => {
        if (book.name === name) {
          books.splice(index, 1);
        }
      });

      localStorage.setItem("books", JSON.stringify(books));
    }
  }
}

//Add books to UI
const container = document.querySelector(".book-container");

let bookIndex;

class display {
  static displayCards() {
    const books = Store.getBooks();
    books.forEach((book) => display.makeCard(book));
  }

  static makeCard(book) {
    const card = document.createElement("div");
    card.classList.add("book-card");
    container.appendChild(card);
    const closeCard = document.createElement("div");
    closeCard.innerHTML = '<span class="remove x-btn">X</span>';
    closeCard.classList.add("btn-container");
    card.appendChild(closeCard);
    const title = document.createElement("h2");
    title.classList.add("title");
    title.innerText = book.name;
    card.appendChild(title);
    const auth = document.createElement("p");
    auth.innerText = `Author: ${book.author}`;
    card.appendChild(auth);
    const page = document.createElement("p");
    page.innerText = `Pages: ${book.pages}`;
    card.appendChild(page);
    const stat = document.createElement("p");
    stat.innerText = `Status:`;
    card.appendChild(stat);
    const statBtn = document.createElement("button");
    statBtn.classList.add("btn");
    statBtn.classList.add("status");
    book.status === "Read" ? statBtn.classList.add("read") : null;
    statBtn.innerText = `${book.status}`;
    card.appendChild(statBtn);
  }

  //clear the form
  static clearForm() {
    document.querySelector("#name").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
  }

  //toggle status
  static toggleStatus(book, e) {
    console.log("change");
    e.target.classList.toggle("read");
    if (e.target.innerText === "Read") {
      book.status = "Unread";
      e.target.innerText = "Unread";
    } else {
      e.target.innerText = "Read";
      book.status = "Read";
    }
  }

  static deleteBook(e) {
    if (e.target.classList.contains("remove")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

/// get form input to create new book
const form = document.querySelector("#form");
form.addEventListener("submit", createBook);

function createBook(e) {
  //prevent defualt behaviour of submit
  e.preventDefault();

  const title = document.querySelector("#name").value;
  const auth = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("input[name=status]:checked").value;

  const book = new Book(title, auth, pages, status);

  //add book to ui
  display.makeCard(book);

  //add book to local storage
  Store.addBook(book);

  // clear form
  display.clearForm();

  // event: change status
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("status")) {
      display.toggleStatus(book, e);
    }
  });

  toggleBookForm();
}

///event: display books
document.addEventListener("DOMContentLoaded", display.displayCards);

// event: remove book
container.addEventListener("click", (e) => {
  // remove from ui
  display.deleteBook(e);

  // remove from store
  Store.removeBook(
    e.target.parentElement.parentElement.childNodes[1].innerText,
    e
  );
});
