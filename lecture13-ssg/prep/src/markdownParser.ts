import { makeHeader, makeHeading, makeParagraph } from "./components.js";

export const markdownToHtml = (markdown: string): string => {
  // split the markdown string into lines
  let markdownLines = markdown.split(/\r?\n/);

  let bodyHtml: string = "";

  // page header
  bodyHtml += makeHeader();

  // parse each line individually
  for(let line of markdownLines) {
    let parseResult = parseLine(line);
    if(parseResult.kind === "heading") {
      bodyHtml += makeHeading(parseResult.level, parseResult.title);
    } else {
      bodyHtml += makeParagraph(parseResult.content);
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
  `
};

//////

interface Heading {
  kind: "heading",
  level: number, // 1-5
  title: string, // text
}

interface Paragraph {
  kind: "paragraph",
  content: string
}

type ParseResult = Heading | Paragraph;

//////

const parseLine = (line: string): ParseResult => {
  // check if this is a heading
  //    ^ matches the start of a new line
  //    (#+) matches one or more # characters
  //    (.*) matches zero or more characters of any kind
  let headingMatch = line.match(/^(#+)(.*)/);
  if(headingMatch !== null) {
    let level: number = headingMatch[1]!.length;
    let title: string = headingMatch[2]!;
    return {
      kind: "heading",
      level: level,
      title: title
    }
  }

  // if we didn't find a heading,
  // then treat the line as a paragraph
  return {
    kind: "paragraph",
    content: line
  }
}