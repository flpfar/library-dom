const booksList = document.querySelector('.books-list');
const bookFormBtn = document.querySelector('.book-form-btn');
const newBooksBtn = document.querySelector('.new-books-btn');
const form = document.querySelector('.book-form');

const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages ${
      this.read ? 'reading' : 'not read yet'
    }`;
  };
}

function render() {
  while(booksList.firstChild && booksList.removeChild(booksList.firstChild));

  for(book of myLibrary){
    const bookItem = document.createElement('li');
    const bookText = document.createTextNode(book.title)
    const deleteBtn = createDeleteBtn(book);
    const readBtn = createReadBtn(book);

    bookItem.appendChild(bookText);
    bookItem.appendChild(readBtn);
    bookItem.appendChild(deleteBtn);
    booksList.appendChild(bookItem);
  }
}

function createReadBtn(book) {
  const readBtn = document.createElement('button');
  readBtn.textContent = (book.read ? 'Unread' : 'Read');

  readBtn.addEventListener('click', () => {
    book.read = !book.read;
    readBtn.textContent = (book.read ? 'Unread' : 'Read');
    render();
  })

  return readBtn;
}

function createDeleteBtn(book) {
  const deleteBtn = document.createElement('button');
  const deleteBtnText = document.createTextNode('Delete');

  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.addEventListener('click', () => {
    const elementIndex = myLibrary.findIndex(item => item.title === book.title && item.author === book.author);
    deleteBook(elementIndex);
  })

  return deleteBtn;
}

function deleteBook(bookIndex) {
  myLibrary.splice(bookIndex, 1);
  saveToStorage();
  render();
}

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  form.reset();
  saveToStorage();
  render();
}

function saveToStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

bookFormBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
});

newBooksBtn.addEventListener('click', () => {
  form.style.display === 'block' ? form.style.display = 'none' : form.style.display = 'block';
});

render();