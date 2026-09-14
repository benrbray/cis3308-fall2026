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
  controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";
  gameDiv.appendChild(controlsDiv);

  // create div to represent board
  boardDiv = document.createElement("div");
  boardDiv.className = "board";
  gameDiv.appendChild(boardDiv);

  // add 3x3 squares to grid
  for(let idx = 0; idx < 9; idx++) {
    let squareDiv = document.createElement("div");
    squareDiv.className = "square";
    squareDiv.onclick = () => {
      handleSquareClick(idx);
    }

    // add square to the page
    boardDiv.appendChild(squareDiv);

    // keep a reference to square in a list
    squares.push(squareDiv);
  }
};

const handleSquareClick = (idx) => {
  // reject invalid plays
  if(gameState.board[idx] !== 0) {
    console.error("invalid move!");
    return;
  }

  // update the game state
  if(gameState.isPlayerXTurn) {
    gameState.board[idx] = 1;
  } else {
    gameState.board[idx] = 2;
  }
  
  // swap turns
  gameState.isPlayerXTurn = !gameState.isPlayerXTurn;

  // display the updated game state
  displayBoard();
}

// updates the board element on the page
// based on the current game state
const displayBoard = () => {
  for(let idx = 0; idx < 9; idx++) {
    let value = gameState.board[idx];
    
    if(value === 1) {
      squares[idx].className = "square playerX";
    } else if(value === 2) {
      squares[idx].className = "square playerO";
    } else {
      squares[idx].className = "square";
    }
  }
}

// initialize
window.onload = function() {
  gameDiv = document.getElementById("game");
  createGame();
}