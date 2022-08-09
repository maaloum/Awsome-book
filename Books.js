//  //Element Selecting
const container = document.querySelector('.container');
const submit = document.querySelector('#submit');
const bookLists = [];

// Creating UI to display the content
const displayBook = (book) => {
  container.innerHTML += `
  <div>
  <p class = "title"> title : <span>${book.title}</span></p>
  <p>Author : ${book.author}</p>
  <hr>
  <button class = "remove" type = button>Remove</button>
  </div>
  `;
};

// get data from local storage
function getBooks() {
  const books = localStorage.getItem('booksCollection');
  if (!books) return [];
  return JSON.parse(books);
}
// display local storage data
const books = getBooks();
books.forEach((element) => {
  displayBook(element);
});

// remove a book from the list
function removeFromLocalSorage(title) {
  const books = getBooks();
  const newBooks = books.filter((item) => item.title !== title);
  localStorage.setItem('booksCollection', JSON.stringify(newBooks));
}
function deleteBook(target) {
  if (target.classList.contains('remove')) {
    removeFromLocalSorage(target.parentNode.firstElementChild.firstElementChild.innerHTML);
    target.parentNode.remove();
  }
}
function handleremove(e) {
  deleteBook(e.target);
}
document.querySelector('.container').addEventListener('click', handleremove);

// Add a new book
function addBook(book) {
  bookLists.push(book);
  localStorage.setItem('booksCollection', JSON.stringify(bookLists));

  displayBook(book);
}

// add the event to the button
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const t = document.querySelector('#title').value;
  const a = document.querySelector('#author').value;
  // const book = new Book(t, a);
  if (!(t === '' && a === '')) {
    const newBook = {
      title: t,
      author: a,
    };
    addBook(newBook);
  }
});