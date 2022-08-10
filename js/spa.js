//  //Element Selecting
const container = document.querySelector('.container');
const submit = document.querySelector('#submit');
const list = document.querySelector('#list');
const add = document.querySelector('#add');
const contact = document.querySelector('#contact');
const form = document.querySelector('form');
const touch = document.querySelector('#touch');
// Poping different section in the single page
list.addEventListener('click', () => {
  container.style.display = 'block';
  form.style.display = 'none';
  touch.style.display = 'none';
});
add.addEventListener('click', () => {
  form.style.display = 'block';
  container.style.display = 'none';
  touch.style.display = 'none';
});
contact.addEventListener('click', () => {
  touch.style.display = 'block';
  form.style.display = 'none';
  container.style.display = 'none';
});

// Manipulating books

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

// get data from local storage
function getBooks() {
  const books = JSON.parse(localStorage.getItem('booksCollection')) || [];
  return books;
}
// display local storage data
const books = getBooks();
books.forEach((element) => {
  displayBook(element);
});

// remove a book from the list
function removeFromLocalSorage(title) {
  const previousbooks = getBooks();
  const newBooks = previousbooks.filter((item) => item.title !== title);
  localStorage.setItem('booksCollection', JSON.stringify(newBooks));
}
function deleteBook(target) {
  if (target.classList.contains('remove')) {
    removeFromLocalSorage(target.parentNode.firstElementChild.firstElementChild
      .firstElementChild.innerHTML);
    target.parentNode.remove();
  }
}
function handleremove(e) {
  deleteBook(e.target);
}
document.querySelector('.container').addEventListener('click', handleremove);

// Add a new book
function addBook(book) {
  books.push(book);
  localStorage.setItem('booksCollection', JSON.stringify(books));
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
