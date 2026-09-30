# Static Site Generator

## System Setup

To run this code, you must have the following installed:

* NodeJS and NPM (I recommend installing with [NVM](https://www.nvmnode.com/))
* [Just](https://github.com/casey/just)

## First-Time Setup

From the project root, run the following command to install all the required dependencies:

```bash
npm install
```

## Running Commands

### `just build-website`

This script automates compiling and running your TypeScript code to generate the website.  Every file in the `markdown` folder is converted into an HTML file and saved in the `website` folder.

### `just clean`

Delete everything in the `output` and `website` folders.

### `just compile`

Compiles your TypeScript code, but doesn't run it.

## Project Structure

Below are the most important folders:

* `src/` Contains all the TypeScript source code.
* `output/` Contains the compiled JavaScript code.
* `markdown/` Files written in Markdown (`.md`) format, used as inputs to the static site generator.
* `website/` The output of the static site generator.

Below are some important files:

* `package.json` Defines the structure of our NPM package.
* `tsconfig.json` Configuration file for TypeScript.
* `justfile` Contains a list of frequently-used commands for compiling and testing our project.