////////////////////////////////////////////////////////////
//// TAGGED UNIONS /////////////////////////////////////////
////////////////////////////////////////////////////////////

// Idea:  Introduce a new field that can be used to
//        discriminate between each variety.

interface HasHealth {
  health: number
}

interface HasPosition {
  x: number,
  y: number,
}

type Player = HasHealth & HasPosition & {
  kind: "player",
  inventory: string[];
  name: string
};

type Monster = HasHealth & HasPosition & {
  kind: "monster",
  species: string,
  treasure: string[],
  xp: number,
}

let astarion: Player = {
  kind: "player",
  health: 100,
  name: "Astarion",
  inventory: ["sword", "shield"],
  x: 0,
  y: 0,
}

let beholder: Monster = {
  kind: "monster",
  health: 100,
  species: "Beholder",
  treasure: ["gold bar", "scroll of invisibility"],
  xp: 1000,
  x: 0,
  y: 0,
}

// ------------------------------------------------------ //

// type narrowing
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html

// tagged union (aka discriminated union)
// https://mariusschulz.com/blog/tagged-union-types-in-typescript
// https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions

type Entity = Player | Monster;

function updatePlayer(p: Player): void { /* do something */ }
function updateMonster(p: Monster): void { /* do something */ }

function updateEntities(gameEntities: Entity[]) {
  for(let entity of gameEntities) {
    //entity. // ???
    //updatePlayer(entity);   // ERROR!
    //updateMonster(entity);  // ERROR!

    if(entity.kind == "monster") {
      updateMonster(entity);
    } else if(entity.kind == "player") {
      updatePlayer(entity);
    }
  }
}

updateEntities([astarion, beholder]);
