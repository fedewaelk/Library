const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 310, "read"),
    new Book("1984", "George Orwell", 328, "not read yet"),
    new Book("Dune", "Frank Herbert", 412, "not read yet"),
    new Book("The Last Wish", "Andrzej Sapkowski", 288, "read"),
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function() {
        return `"${this.title} by ${this.author}, ${this.pages} pages, ${this.status}"`;
    };
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

function displayBooks() {
    const tableBody = document.querySelector('#library-table tbody');
    tableBody.innerHTML = '';

    myLibrary.forEach(book => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.status}</td>
        `;

        tableBody.appendChild(row);
    });
}

displayBooks();