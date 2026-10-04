////////////////////////////////////////////////////////////
//// TAGGED UNIONS /////////////////////////////////////////
////////////////////////////////////////////////////////////
let astarion = {
    kind: "player",
    health: 100,
    name: "Astarion",
    inventory: ["sword", "shield"],
    x: 0,
    y: 0,
};
let beholder = {
    kind: "monster",
    health: 100,
    species: "Beholder",
    treasure: ["gold bar", "scroll of invisibility"],
    xp: 1000,
    x: 0,
    y: 0,
};
function updatePlayer(p) { }
function updateMonster(p) { }
function updateEntities(gameEntities) {
    for (let entity of gameEntities) {
        //entity. // ???
        //updatePlayer(entity);   // ERROR!
        //updateMonster(entity);  // ERROR!
        if (entity.kind == "monster") {
            updateMonster(entity);
        }
        else if (entity.kind == "player") {
            updatePlayer(entity);
        }
    }
}
updateEntities([astarion, beholder]);
export {};
//# sourceMappingURL=03-tagged-union.js.map