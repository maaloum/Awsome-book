/* Using classes */

// Element Selecting
const container = document.querySelector('.container');
const submit = document.querySelector('#submit');

// get data from local storage
function getBooks() {
  const books = localStorage.getItem('books');
  if (!books) return [];
  return JSON.parse(books);
}
// add a book to local storage
function addBooks(book) {
  const books = getBooks();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
}

// remove a book from localStorage
function removeBooks(title) {
  const books = getBooks();
  const newBooks = books.filter((item) => item.title !== title);
  localStorage.setItem('books', JSON.stringify(newBooks));
}

// create a class for books
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Creating UI to display the content
const displayBook = (book) => {
  container.innerHTML += `
  <div class = "wrapper">
  <div class ="content">  <p class = "title"> title : <span>${book.title}</span> by </p>
  <p>Author : ${book.author}</p></div>
  <button class = "remove" type = button>Remove</button>
  </div>
  `;
};
// display local storage data
const books = getBooks();
books.forEach((element) => {
  displayBook(element);
});

// Add a book
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const t = document.querySelector('#title').value;
  const a = document.querySelector('#author').value;
  const book = new Book(t, a);
  if (!(t === '' && a === '')) {
    addBooks(book);
    displayBook(book);
  }
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
});

// remove a book from the list
function deleteBook(target) {
  if (target.classList.contains('remove')) {
    removeBooks(target.parentNode.firstElementChild.firstElementChild.firstElementChild.innerHTML);
    target.parentNode.remove();
  }
}
function handleremove(e) {
  deleteBook(e.target);
}
document.querySelector('.container').addEventListener('click', handleremove);
