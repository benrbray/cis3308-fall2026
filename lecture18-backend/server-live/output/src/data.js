import fs from "fs";
export const readBookData = () => {
    // read the json file from the data folder
    let fileContents = fs.readFileSync("./data/books.json", { encoding: "utf8" });
    // TODO: we need to actually check that the parsed data
    //       has the format that we expect
    //       but for now, we just "assert" that it's OK
    //       (we'll get a runtime error if the data is invalid)
    let bookInfo = JSON.parse(fileContents);
    return bookInfo;
};
//# sourceMappingURL=data.js.map