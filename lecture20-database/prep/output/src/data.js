import fs from "fs";
let lastId = 0;
const generateId = () => {
    return lastId++;
};
////////////////////////////////////////////////////////////
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
export const createBook = (book) => {
    // add book to the _front_ of the array, so we can see it more easily
    bookList.unshift(({
        id: generateId(),
        book
    }));
    console.log("Created Book!");
};
export const findBookById = (id) => {
    return bookList.find(book => book.id == id);
};
export const updateBook = (id) => {
    const book = findBookById(id);
};
export const deleteBook = (id) => {
    let idx = bookList.findIndex(book => book.id == id);
    if (idx > -1) {
        bookList.splice(idx, 1);
        return true;
    }
    else {
        return false;
    }
};
////////////////////////////////////////////////////////////
// read the json books data
// books are only stored in-memory
// book data is deleted when the server restarts
export const bookList = loadBookData();
//# sourceMappingURL=data.js.map