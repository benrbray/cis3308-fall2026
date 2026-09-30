import fs from "node:fs";
import path from "node:path";
import { markdownToHtml } from "./markdownParser.js";

export const generateWebsite = (
  inputDir: string,
  outputDir: string,
) => {
  // get paths to all markdown files in the folder
  let result = fs.globSync(`./${inputDir}/**/*.md`);

  // ensure that the output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  // convert every markdown file into html
  for(let markdownPath of result) {
    let markdown = fs.readFileSync(markdownPath, "utf8");
    let html = markdownToHtml(markdown);
    
    // write the output file
    let htmlPath = getOutputPath(inputDir, outputDir, markdownPath);
    fs.writeFileSync(htmlPath, html);

    console.log(`Generated ${htmlPath}`);
  }

  console.log(result);
}

// transforms ./markdown/giraffe.md
//       into ./website/giraffe.html
export const getOutputPath = (
  inputDir: string,
  outputDir: string,
  inputPath: string
) => {
  // 1. find the relative path of the input file
  let relativeMd = path.relative(inputDir, inputPath);

  // 2. convert the file extension to html
  let parsed = path.parse(relativeMd);
  let relativeHtml = path.format({
    dir: parsed.dir,   // directory
    name: parsed.name, // file name without extension
    ext: "html"        // extension
  });

  // 3. join the relative path to the final output directory
  return path.join(outputDir, relativeHtml);
}