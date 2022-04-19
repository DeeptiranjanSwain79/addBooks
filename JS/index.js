console.log("Welcome to Happy Library");

//Book Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `
        <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        </tr>
    `;
    tableBody.innerHTML += uiString;
}

//Implementing the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//Implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}

//Implementing the show function
Display.prototype.show = function (type, message) {
    let msg = document.getElementById("msg");
    msg.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            <b>Message:&nbsp;</b>${message}
        </div>
    `;

    setTimeout(function () {
        msg.innerHTML = ``;
    }, 2000);
}

//Add Submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You've submitted library form");

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let programming = document.getElementById("programming");
    let fiction = document.getElementById("fiction");
    let cooking = document.getElementById("cooking");

    if (programming.checked) {
        type = programming.value;
    } else if (fiction.checked) {
        type = fiction.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Book added successfully to the library");
    } else {
        display.show("danger", "This book can't be added");
    }

    e.preventDefault();
}