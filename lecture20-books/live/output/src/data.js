import fs from "fs";
let lastId = 0;
const generateId = () => {
    return lastId++;
};
////////////////////////////////////////////////////////////
export const createBook = (book) => {
    bookList.unshift({
        id: generateId(),
        book: book,
    });
};
export const deleteBook = (id) => {
    let idx = bookList.findIndex(book => book.id == id);
    if (idx > -1) {
        bookList.splice(idx, 1);
    }
};
export const getBookById = (id) => {
    let book = bookList.find(entity => entity.id == id);
    return book;
};
export const loadBookData = () => {
    // read the json file from the data folder
    let fileContents = fs.readFileSync("./data/books.json", { encoding: "utf8" });
    // TODO: we need to actually check that the parsed data
    //       has the format that we expect
    //       but for now, we just "assert" that it's OK
    //       (we'll get a runtime error if the data is invalid)
    let bookList = JSON.parse(fileContents);
    return bookList.map(book => ({
        id: generateId(),
        book: book
    }));
};
export const saveBookData = (books) => {
    let json = JSON.stringify(books.map(entity => entity.book));
    fs.writeFileSync("./data/books.json", json, { encoding: "utf-8" });
};
////////////////////////////////////////////////////////////
// read the json books data
// books are only stored in-memory
// book data is deleted when the server restarts
export const bookList = loadBookData();
//# sourceMappingURL=data.js.map