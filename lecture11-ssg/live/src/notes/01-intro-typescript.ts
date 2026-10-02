////////////////////////////////////////////////////////////
//// BASIC TYPES ///////////////////////////////////////////
////////////////////////////////////////////////////////////

// x can be any number
const x: number = 100;

// y can be any string
const y: string = "hello!"

// z is an array of booleans
const z :boolean[] = [true, false, true];

// ------------------------------------------------------ //

// LITERAL TYPES
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types

// string literal types
// (rejects any string that is not one of the options)
const alignment: "left" | "center" | "right" = "left";

function alignText(s: string, alignment: "left" | "center" | "right") {
  // do something with the text
}

alignText("Hello", "center"); // OK
// alignText("Hello", "banana") // TYPE ERROR

// numeric literal types
function rollD6(): 1|2|3|4|5|6 {
  let possibilities = [1,2,3,4,5,6] as const; // use "as const" to infer strictest possible type
  let result = possibilities[Math.floor(Math.random() * 6)];

  // without this, we get an error!
  // (typescript knows that array indexing might give undefined)
  if(result === undefined) {
    throw new Error("index out of bounds!");
  }
  
  return result;
}

// comparison
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// options
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
//configure("automatic"); // ERROR!