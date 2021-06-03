let myLibrary = [];

function Book(name, author, pages, status) {
    // the constructor...
    this.name = name
    this.author = author
    this.pages = pages
    this.status = status
}

function addBookToLibrary(name, author, pages, status) {
    myLibrary.push(new Book(name, author, pages, status));
}

addBookToLibrary('hobbit', 'someGuy', '444', 'read');
addBookToLibrary('ff', 'Guy', '884', ' not read');

// console.log(myLibrary)
const container = document.querySelector('.book-container');

function makeCard(name, author, pages, status) {

    const card = document.createElement('div');
    card.classList.add('book-card');
    container.appendChild(card);
    const title = document.createElement('h2');
    title.innerText = name;
    card.appendChild(title);
    const auth = document.createElement('p');
    auth.innerText = `Author: ${author}`;
    card.appendChild(auth);
    const page = document.createElement('p');
    page.innerText = `Pages: ${pages}`;
    card.appendChild(page);
    const stat = document.createElement('p');
    stat.innerText = `Status: ${status}`;
    card.appendChild(stat);
}

function displayCards() {
    myLibrary.forEach((item) => makeCard(item.name, item.author, item.pages, item.status))

}

displayCards();
