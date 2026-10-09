import fs from "node:fs";
import path from "node:path";
import { markdownToHtml } from "./markdownParser.js";
// HINTS:
// - fs.globSync
// - fs.mkdirSybc(outputDir, { recursive: true })
// - fs.readFileSync(filePath, "utf8")
// - fs.writeFileSync
export const generateWebsite = (inputDir, outputDir) => {
    createOutputDir(outputDir);
    copyStaticFiles(outputDir);
    convertMarkdownFiles(inputDir, outputDir);
};
export const createOutputDir = (outputDir) => {
    // 2. ensure that the output directory exists
    fs.mkdirSync(outputDir, { recursive: true });
};
export const copyStaticFiles = (outputDir) => {
};
export const convertMarkdownFiles = (inputDir, outputDir) => {
    // 1. get paths to all markdown files in the folder
    let markdownPaths = fs.globSync(`${inputDir}/*.md`);
    console.log(markdownPaths);
    // 3. convert every markdown file into html and save it
    for (let markdownPath of markdownPaths) {
        let markdown = fs.readFileSync(markdownPath, "utf8");
        let html = markdownToHtml(markdown);
        let htmlPath = getOutputPath(inputDir, outputDir, markdownPath);
        fs.writeFileSync(htmlPath, html);
    }
};
// transforms ./markdown/giraffe.md
//       into ./website/giraffe.html
export const getOutputPath = (inputDir, outputDir, inputPath) => {
    // 1. find the relative path of the input file
    let relativeMd = path.relative(inputDir, inputPath);
    // 2. convert the file extension to html
    let parsed = path.parse(relativeMd);
    let relativeHtml = path.format({
        dir: parsed.dir, // directory
        name: parsed.name, // file name without extension
        ext: "html" // extension
    });
    // 3. join the relative path to the final output directory
    return path.join(outputDir, relativeHtml);
};
//# sourceMappingURL=generator.js.map