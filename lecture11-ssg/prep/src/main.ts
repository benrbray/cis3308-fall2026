import { parseArgs } from 'node:util';
import { generateWebsite } from './generator.js';

// parse the user's options from the command line
const userOptions = parseArgs({
  options: {
    inputDir: { type: 'string' },
    outputDir: { type: 'string' }
  },
  allowPositionals: false
});

// validate input
let inputDir = userOptions.values.inputDir;
if(inputDir === undefined) { 
  throw new Error("You must specify an input directory.");
}
let outputDir = userOptions.values.outputDir;
if(outputDir === undefined) { 
  throw new Error("You must specify an output directory.");
}

// build the website
generateWebsite(inputDir, outputDir)