import express from "express";
import { bookList, createBook, deleteBook, getBookById, saveBookData } from "./data.js";
import ReactDOM from "react-dom/server";
import { App } from "./App.js";
const PORT = 3210;
const app = express();
// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // support form data body 
app.use(express.json()); // support json request body
////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Hello, CIS 3308 from Express!");
});
app.get("/react", (req, res) => {
    let html = ReactDOM.renderToString(App());
    res.send(html);
});
////////////////////////////////////////////////////////////
// CREATE
app.post("/books/create", (req, res) => {
    console.log(req.body);
    // create a new book
    createBook({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
    });
    saveBookData(bookList);
    // 303 SEE OTHER
    // used when submitting forms, will
    // make a GET request to the provided URL
    res.redirect(303, "/books");
});
// DELETE
app.post("/books/:bookId/delete", (req, res) => {
    console.log("DELETE BOOK ID:", req.params.bookId);
    deleteBook(parseInt(req.params.bookId));
    saveBookData(bookList);
    res.redirect(303, "/books");
});
// READ
app.get("/books", (req, res) => {
    let respHtml = "";
    for (let bookEntity of bookList) {
        respHtml += `<div class="book">
      <div class="title">
        <a href="/books/${bookEntity.id}">${bookEntity.book.title}</a>
      </div>
      <div class="author">
        ${bookEntity.book.author}
      </div>
      <form action="/books/${bookEntity.id}/delete" method="POST">
        <button>Delete</button>
      </form>
    </div>`;
    }
    res.send(`
    <!doctype>

    <html>
      <head>
        <title>Books</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="column">
          <h1>Books</h1>

          <form class="book-form" action="/books/create" method="POST">
            <label for="title">Title</label>
            <input name="title" type="text">
            
            <label for="author">Author</label>
            <input name="author" type="text">
            
            <label for="url">URL</label>
            <input name="url" type="text">

            <button type="submit">Create Book!</button>
          </form>
          
          <div class="book-list">
          ${respHtml}
          </div>
        
          </div>
      </body>
    </html>
  `);
});
app.get("/books/:bookId", (req, res) => {
    let bookId = parseInt(req.params.bookId);
    // find the book
    let book = getBookById(bookId);
    if (book !== undefined) {
        res.send(`<html>
      <head>
      </head>
        <title>${book.book.title}</title>
      <body>
        <h1>${book.book.title}<h1>

        ${book.book.author}$
      </body>
    </html>`);
    }
    else {
        res.status(404);
        res.send("Not found");
    }
});
////////////////////////////////////////////////////////////
// start the actual server
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}...`);
});
//# sourceMappingURL=server-old.js.map