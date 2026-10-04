export const markdownToHtml = (markdown: string): string => {
  // create html string for this post
  let html: string = "";

  for(let line of markdown.split(/\r?\n/)) {
    // parse this line of the markdown file
    let parseResult = parseLine(line);

    if(parseResult.kind == "heading") {
      let tag = `h${parseResult.level}`;
      html += `<${tag}>${parseResult.title}</${tag}>`;
    } else if(parseResult.kind == "paragraph") {
      html += `<p>${parseResult.content}</p>`;
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
    ${html}
  </body>
  </html>
  `
};

interface Heading {
  kind: "heading",
  level: number,
  title: string,
}

interface Paragraph {
  kind: "paragraph",
  content: string
}

type ParseResult = Heading | Paragraph;

const parseLine = (line: string): ParseResult => {
  // check if it's a heading
  let headingMatch = line.match(/^(#+)(.*)/);
  
  if(headingMatch) {
    let headingNum = Math.min(headingMatch.length, 5);
    return {
      kind: "heading",
      level: Math.min(headingMatch.length, 5),
      title: headingMatch[2]!,
    };
  }

  // otherwise assume it's a paragraph
  return {
    kind: "paragraph",
    content: line,
  }
}