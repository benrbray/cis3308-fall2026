export const markdownToHtml = (markdown) => {
    // split the markdown string into lines
    let markdownLines = markdown.split(/\r?\n/);
    // parse each line individually
    for (let line of markdownLines) {
        let parseResult = parseLine(line);
    }
    return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Website</title>
  </head>
  <body>
    ${markdown}
  </body>
  </html>
  `;
};
const parseLine = (line) => {
    // check if this is a heading
    //    ^ matches the start of a new line
    //    (#+) matches one or more # characters
    //    (.*) matches zero or more characters of any kind
    let headingMatch = line.match(/^(#+)(.*)/);
    console.log(headingMatch);
};
//# sourceMappingURL=markdownParser.js.map