// page elements
let gameDiv = null;
let controlsDiv = null;
let boardDiv = null;
let squares = [];

// game state
let gameState = {
  // boolean flag representing
  // which player is next
  isPlayerXTurn : true,

  // initialize board state
  //     0 = empty
  //     1 = player X
  //     2 = player O
  board : new Array(9).fill(0)
};

//////////////////////////////////////////////////

const createGame = () => {
  // create div to represent controls

  // create div to represent board

  // add 3x3 squares to grid
  for(let idx = 0; idx < 9; idx++) {
    // create a new div to represent this square
    // add square to the page
    // keep a reference to square in a list
  }
};

const handleSquareClick = (idx) => {

}

// updates the board element on the page
// based on the current game state
const displayBoard = () => {

}

// initialize
window.onload = function() {

}