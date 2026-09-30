export const markdownToHtml = (markdown: string): string => {
  // split the markdown string into lines
  let markdownLines = markdown.split(/\r?\n/);

  // parse each line individually
  for(let line of markdownLines) {
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
  `
};

//////

interface Heading {
  level: number, // 1-5
  title: string, // text
}

interface Paragraph {
  content: string
}

type ParseResult = Heading | Paragraph;

let heading1: Heading = {
  level: 1,
  title: "This is the Title"
};

let parseResult: ParseResult = {
  content: "paragraph paragraph paragraph"
};

//////

const parseLine = (line: string): ParseResult => {
  // check if this is a heading
  //    ^ matches the start of a new line
  //    (#+) matches one or more # characters
  //    (.*) matches zero or more characters of any kind
  let headingMatch = line.match(/^(#+)(.*)/);
  console.log(headingMatch);

  // TODO
}