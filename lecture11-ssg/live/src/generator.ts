import fs from "node:fs";
import path from "node:path";
import { markdownToHtml } from "./markdownParser.js";

// HINTS:
// - fs.globSync
// - fs.mkdirSybc(outputDir, { recursive: true })
// - fs.readFileSync(filePath, "utf8")
// - fs.writeFileSync

export const generateWebsite = (
  inputDir: string,
  outputDir: string,
) => {
  // 1. get paths to all markdown files in the folder
  // 2. ensure that the output directory exists
  // 3. convert every markdown file into html and save it
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