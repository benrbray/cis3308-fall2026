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

## Project Structure

Below are the most important folders:

* `src/` Contains all the TypeScript source code.
* `output/` Contains the compiled JavaScript code.

Below are some important files:

* `package.json` Defines the structure of our NPM package.
* `tsconfig.json` Configuration file for TypeScript.
* `justfile` Contains a list of frequently-used commands for compiling and testing our project.