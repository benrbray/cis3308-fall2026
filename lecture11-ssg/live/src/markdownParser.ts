export const markdownToHtml = (markdown: string): string => {
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