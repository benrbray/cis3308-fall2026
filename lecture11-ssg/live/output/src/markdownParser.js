export const markdownToHtml = (markdown) => {
    // split the markdown string into lines
    let markdownLines = markdown.split(/\r?\n/);
    let bodyHtml = "";
    // parse each line individually
    for (let line of markdownLines) {
        let parseResult = parseLine(line);
        if (parseResult.kind === "heading") {
            bodyHtml += `<h1>${parseResult.title}</h1>`;
        }
        else {
            bodyHtml += `<p>${parseResult.content}</p>`;
        }
    }
    return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Website</title>
  </head>
  <body>
    ${bodyHtml}
  </body>
  </html>
  `;
};
//////
const parseLine = (line) => {
    // check if this is a heading
    //    ^ matches the start of a new line
    //    (#+) matches one or more # characters
    //    (.*) matches zero or more characters of any kind
    let headingMatch = line.match(/^(#+)(.*)/);
    if (headingMatch !== null) {
        let level = headingMatch[1].length;
        let title = headingMatch[2];
        return {
            kind: "heading",
            level: level,
            title: title
        };
    }
    // if we didn't find a heading,
    // then treat the line as a paragraph
    return {
        kind: "paragraph",
        content: line
    };
};
//# sourceMappingURL=markdownParser.js.map