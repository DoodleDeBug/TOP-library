class Book {
  constructor(name, author, pages, status) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

///BRing up form for new book
const newBtn = document.querySelector(".new");
newBtn.addEventListener("click", toggleBookForm); //click button, open modal

const close = document.querySelector(".close-modal");
close.addEventListener("click", toggleBookForm); //click button, close modal

const modal = document.querySelector(".modal");

function toggleBookForm() {
  modal.classList.toggle("hidden"); // show modal
  Display.clearForm();
}

//Add books to UI
const container = document.querySelector(".book-container");

class Display {
  // add book to myLibrary
  static addBook(book) {
    myLibrary.push(book);
    saveLocal();
  }

  static displayCards() {
    myLibrary.forEach((book) => Display.makeCard(book)); // loop through array to output card onto screen
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
}

/// get form input to create new book
const form = document.querySelector("#form");
form.addEventListener("submit", createBook);

function createBook(e) {
  //prevent defualt behaviour of submit (refresh)
  e.preventDefault();

  const title = document.querySelector("#name").value;
  const auth = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("input[name=status]:checked").value;

  if (getBook(title) !== null) {
    alert("A book with that title already exists in your library");
    // clear form
    Display.clearForm();
    return;
  }

  const book = new Book(title, auth, pages, status);

  //add book object to myLibrary array
  Display.addBook(book);

  //add book to ui
  Display.makeCard(book);

  // clear form
  Display.clearForm();

  //close form
  toggleBookForm();
}

// event: change status or remove
container.addEventListener("click", handleEvent);

function getBook(title) {
  for (let book of myLibrary) {
    if (book.name === title) {
      return myLibrary.indexOf(book);
    }
  }
  return null;
}

function handleEvent(e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove(); // remove from ui
    let index = getBook(e.target.parentElement.nextSibling.innerText);
    myLibrary.splice(index, 1); // remove from array
  } else if (e.target.innerText === "Read" || e.target.innerText === "Unread") {
    let index = getBook(e.target.parentElement.childNodes[1].innerText);
    e.target.classList.toggle("read");

    if (e.target.innerText === "Read") {
      myLibrary[index].status = "Unread";
      e.target.innerText = "Unread";
    } else {
      myLibrary[index].status = "Read";
      e.target.innerText = "Read";
    }
  }

  saveLocal(); // save local storage
}

// LOCAL STORAGE
function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary === null) myLibrary = [];
  Display.displayCards();
}

restoreLocal();
