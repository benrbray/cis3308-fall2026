////////////////////////////////////////////////////////////
//// BASIC TYPES ///////////////////////////////////////////
////////////////////////////////////////////////////////////
// x can be any number
const x = 100;
// y can be any string
const y = "hello!";
// z is an array of booleans
const z = [true, false, true];
// ------------------------------------------------------ //
// Left, Centered, Right
function align(s, alignment) {
    if (alignment !== "left" && alignment !== "right" && alignment !== "center") {
        throw new Error("sorry, invalid argument!");
    }
}
// ------------------------------------------------------ //
// LITERAL TYPES
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
// string literal types
// (rejects any string that is not one of the options)
const alignment = "left";
function alignText(userString, alignment) {
    // do something with the text
}
alignText("Hello", "center"); // OK
alignText("banana", "left"); // TYPE ERROR
// numeric literal types
function rollD6() {
    let possibilities0 = [1, 2, 3, 4, 5, 6];
    let possibilities = [1, 2, 3, 4, 5, 6]; // use "as const" to infer strictest possible type
    let result = possibilities[Math.floor(Math.random() * 6)];
    // // without this, we get an error!
    // // (typescript knows that array indexing might give undefined)
    if (result == undefined) {
        throw new Error("index out of bounds!");
    }
    return result;
}
// comparison
function compare(a, b) {
    return a === b ? 0 : a > b ? 1 : -1;
}
function configure(x) {
    // ...
}
configure({ width: 100 });
configure("auto");
//configure("automatic"); // ERROR!
////////////////////////////////////////////////////////////
let a = undefined;
let b = a;
export {};
//# sourceMappingURL=01-intro-typescript.js.map