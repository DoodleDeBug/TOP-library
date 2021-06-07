let myLibrary = [];

function Book(name, author, pages, status) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(name, author, pages, status) {
  myLibrary.push(new Book(name, author, pages, status));
}

addBookToLibrary("The Diary of A Wimpy Kid", "kinney", "44", "read");
// console.log(myLibrary)

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

//Add books to UI

const container = document.querySelector(".book-container");

let bookIndex;

class display {
  //add book to myLibrary
  static addBook(book) {
    myLibrary.push(book);
  }

  static indexBook(book) {
    bookIndex = myLibrary.indexOf(book);
  }

  static displayCards() {
    const books = myLibrary;
    books.forEach((book) => display.makeCard(book));
  }

  static makeCard(book) {
    // console.log(bookIndex);
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.classList.add(bookIndex);
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
}

/// get form input to create new book
const form = document.querySelector("#form");
form.addEventListener("submit", createBook);

function createBook(e) {
  //prevent defualt behaviour of submit
  e.preventDefault();

  //   console.log("heello am creating book");
  const title = document.querySelector("#name").value;
  const auth = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("input[name=status]:checked").value;
  //   console.log(`${title} ${auth} ${pages} ${status}`);

  const book = new Book(title, auth, pages, status);
  display.addBook(book);
  display.indexBook(book);
  display.makeCard(book);
  display.clearForm();

  toggleBookForm();
}

///event: display books

document.addEventListener("DOMContentLoaded", display.displayCards);

// event: remove book
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();

    let index = e.target.parentElement.parentElement.classList;
    myLibrary.splice(index, 1);
  }
});

// event: change status

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    console.log("change status");
    e.target.classList.toggle("read");
    if (e.target.innerText === "Read") {
      e.target.innerText = "Unread";
    } else {
      e.target.innerText = "Read";
    }
  }
});
