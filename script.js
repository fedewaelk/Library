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
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

Book.prototype.toggleStatus = function () {
    this.status = this.status === "read" ? "not read yet" : "read";
};

function displayBooks() {
    const tableBody = document.querySelector('#library-table tbody');
    tableBody.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button class="toggle-status-btn" data-index="${index}">${book.status}</button></td>
            <td>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });

    const toggleButtons = document.querySelectorAll('.toggle-status-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });
}

function removeBook(event) {
    const bookIndex = event.target.getAttribute('data-index');
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

function toggleReadStatus(event) {
    const bookIndex = event.target.getAttribute('data-index');
    myLibrary[bookIndex].toggleStatus();
    displayBooks();
}

displayBooks();

const showButton = document.getElementById("showDialog");
const addDialog = document.getElementById("addDialog");
const confirmBtn = addDialog.querySelector("#confirmBtn");

showButton.addEventListener("click", () => {
    addDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const titleInput = addDialog.querySelector('input[placeholder="Title"]');
    const authorInput = addDialog.querySelector('input[placeholder="Author"]');
    const pagesInput = addDialog.querySelector('input[placeholder="Number of pages"]');
    const statusSelect = addDialog.querySelector("select");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = statusSelect.value;

    if (title && author && pages && status !== "default") {
        addBookToLibrary(title, author, parseInt(pages, 10), status);

        displayBooks();

        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        statusSelect.value = "default";

        addDialog.close();
    } else {
        alert("Please fill in all fields correctly.");
    }
});
