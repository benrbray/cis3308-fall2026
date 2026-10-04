import fs from "node:fs";
import path from "node:path";
import { markdownToHtml } from "./markdownParser.js";
// HINTS:
// - fs.globSync
// - fs.mkdirSybc(outputDir, { recursive: true })
// - fs.readFileSync(filePath, "utf8")
// - fs.writeFileSync
export const generateWebsite = (inputDir, outputDir) => {
    // 1. get paths to all markdown files in the folder
    let markdownPaths = fs.globSync(`${inputDir}/*.md`);
    console.log(markdownPaths);
    // 2. ensure that the output directory exists
    fs.mkdirSync(outputDir, { recursive: true });
    // 3. convert every markdown file into html and save it
    for (let markdownPath of markdownPaths) {
        // 3a. read the markdown file as a string
        let markdown = fs.readFileSync(markdownPath, "utf8");
        // 3b. convert the markdown string to html
        let html = markdownToHtml(markdown);
        // 3c. get the correct output path for the html file
        let htmlPath = getOutputPath(inputDir, outputDir, markdownPath);
        // 3d. save the html file
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