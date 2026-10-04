////////////////////////////////////////////////////////////
//// OBJECT TYPES //////////////////////////////////////////
////////////////////////////////////////////////////////////
// The parameter's type annotation is an object type
// Meaning:
//     printCoord accepts any object with the fields x and y,
//     where both x and y must have the "number" type
function printCoord(point) {
    console.log("The coordinate's x value is " + point.x);
    console.log("The coordinate's y value is " + point.y);
}
// We can pass in any object with numeric "x" and "y" fields.
printCoord({ x: 3, y: 7 });
// It doesn't matter if the object has extra fields!
let player = {
    x: 3,
    y: 7,
    health: 100,
    strength: 4,
    name: "Astarion"
};
printCoord(player); // ok!
function printCoord2(point) {
    console.log("The coordinate's x value is " + point.x);
    console.log("The coordinate's y value is " + point.y);
}
// ---- //
let astarion = {
    health: 100,
    name: "Astarion",
    inventory: ["sword", "shield"],
    x: 0,
    y: 0
};
let beholder = {
    health: 100,
    species: "Beholder",
    treasure: ["gold bar", "scroll of invisibility"],
    xp: 1000,
    x: 0,
    y: 0,
};
function move(entity, newPos) {
    entity.x = newPos.x;
    entity.y = newPos.y;
}
let entityA = astarion;
let entityB = beholder;
function updatePlayer(p) { }
function updateMonster(m) { }
let gameEntities = [
    astarion, beholder
];
function updateEntities(gameEntities) {
    for (let entity of gameEntities) {
        // updateMonster(entity);
        //entity. // ???
        //updatePlayer(entity);   // ERROR!
        //updateMonster(entity);  // ERROR!
    }
}
updateEntities([astarion, beholder]);
export {};
////////////////////////////////////////////////////////////
//// TAGGED UNIONS /////////////////////////////////////////
////////////////////////////////////////////////////////////
// now, go to tagged-union.ts
//# sourceMappingURL=02-object-types.js.map