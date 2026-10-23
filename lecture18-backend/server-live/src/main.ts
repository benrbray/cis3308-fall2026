import express from "express";
import { readBookData, type BookInfo } from "./data.js";

const PORT = 3210

const app = express();

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Hello, CIS 3308 from Express!")
});

app.get("/greet", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);

  const name = req.query.name;
  res.send(`<h1>Hello, ${name}</h1>`);
})

app.get("/example", (req, res) => {
  res.send("Example GET endpoint!");
})

app.post("/example", (req, res) => {
  res.send("Example POST endpoint!");
})

////////////////////////////////////////////////////////////

// read the json books data
const bookInfo: BookInfo[] = readBookData();

app.get("/books", (req, res) => {
  let respHtml: string = "";

  for(let book of bookInfo) {
    respHtml += `<div class="book-info">
      <div class="title">
        ${book.title}
      </div>
      <div class="author">
        ${book.author}
      </div>
    </div>`
  }

  res.send(`
    <!doctype>

    <html>
      <head>
        <title>Books</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Books</h1>
        <div class="book-list">
        ${respHtml}
        </div>
      </body>
    </html>
  `);
})

////////////////////////////////////////////////////////////

// start the actual server
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}...`);
});