////////////////////////////////////////////////////////////
//// OBJECT TYPES //////////////////////////////////////////
////////////////////////////////////////////////////////////

// The parameter's type annotation is an object type
// Meaning:
//     printCoord accepts any object with the fields x and y,
//     where both x and y must have the "number" type

function printCoord(point: { x: number; y: number }) {
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
  strength : 4,
  name: "Astarion"
};

printCoord(player) // ok!

// We can use an interface to give a name to an object type:

interface Point {
  x: number,
  y: number
}

function printCoord2(point: Point) {
  console.log("The coordinate's x value is " + point.x);
  console.log("The coordinate's y value is " + point.y);
}

////////////////////////////////////////////////////////////
//// DATA MODELING WITH TYPES //////////////////////////////
////////////////////////////////////////////////////////////

interface HasHealth {
  health: number
}

interface HasPosition {
  x: number,
  y: number,
}

type Player = HasHealth & HasPosition & {
  inventory: string[];
  name: string
};

type Monster = HasHealth & HasPosition & {
  species: string,
  treasure: string[],
  xp: number,
}

// ---- //

let astarion: Player = {
  health: 100,
  name: "Astarion",
  inventory: ["sword", "shield"],
  x: 0,
  y: 0,
}

let beholder: Monster = {
  health: 100,
  species: "Beholder",
  treasure: ["gold bar", "scroll of invisibility"],
  xp: 1000,
  x: 0,
  y: 0,
}

function move(entity: HasPosition, newPos: Point) {
  entity.x = newPos.x;
  entity.y = newPos.y;
}

//// QUESTION:
// How would we achieve the same thing in Java?  Python?

type Entity = Player | Monster;

let entityA: Entity = astarion;
let entityB: Entity = beholder;

function updatePlayer(p: Player): void { /* do something */ }
function updateMonster(p: Monster): void { /* do something */ }

let gameEntities: Entity[] = [
  astarion, beholder
];

function updateEntities(gameEntities: Entity[]) {
  for(let entity of gameEntities) {
    //entity. // ???
    //updatePlayer(entity);   // ERROR!
    //updateMonster(entity);  // ERROR!
  }
}

updateEntities([astarion, beholder]);

////////////////////////////////////////////////////////////
//// TAGGED UNIONS /////////////////////////////////////////
////////////////////////////////////////////////////////////

// now, go to tagged-union.ts

