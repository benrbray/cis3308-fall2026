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
  board : new Array(9).fill(0),

  // scores
  scoreX : 0,
  scoreO : 0
};

//////////////////////////////////////////////////

const createGame = () => {
  gameDiv = document.getElementById("game");

  // create div to represent controls
  controlsDiv = document.createElement("div");
  controlsDiv.className = "controls";
  controlsDiv.textContent = "Tic Tac Toe Controls Here";
  // @ts-ignore
  gameDiv.appendChild(controlsDiv);

  // create div to represent board
  boardDiv = document.createElement("div");
  boardDiv.className = "board";
  // @ts-ignore
  gameDiv.appendChild(boardDiv);

  // add 3x3 squares to grid
  for(let idx = 0; idx < 9; idx++) {
    // create a new div to represent this square
    let square = document.createElement("div");
    square.className = "square";
    square.onclick = () => {
      // this code will run when the square is clicked
      handleSquareClick(idx);
    };
    // add square to the page
    boardDiv.appendChild(square);
    // keep a reference to square in a list
    squares.push(square);
  }
};

const checkWinner = (playerId) => {
  // check for horizontal wins
  // check for vertical wins
  // check for diagonl wins

  // return true if playerId wins
  return true
};

const resetBoard = () => {
  // TODO:  reset the game board
}

const handleSquareClick = (idx) => {
  // make sure the square is empty
  if(gameState.board[idx] != 0) {
    return;
  }

  // decide whose turn it is
  if(gameState.isPlayerXTurn) {
    // place an X in the board
    gameState.board[idx] = 1;
  } else {
    // place an O in the board
    gameState.board[idx] = 2;
  }

  // swap player turns
  gameState.isPlayerXTurn = !gameState.isPlayerXTurn;

  // check for a winner
  let playerXWins = checkWinner(1);
  if(playerXWins) {
    gameState.scoreX++;
  }
  
  let playerOWins = checkWinner(2);
  if(playerOWins) {
    gameState.scoreO++;
  }

  if(playerXWins || playerOWins) {
    // reset the game board
    resetBoard();
  }

  // update the visual appearance of the page
  displayBoard();
}

// updates the board element on the page
// based on the current game state
const displayBoard = () => {
  for(let i = 0; i < 9; i++) {
    let squareElt = squares[i];
    let squareState = gameState.board[i];

    if(squareState == 1) {
      squareElt.textContent = "X";
    } else if(squareState == 2) {
      squareElt.textContent = "O";
    } else {
      squareElt.textContent = "";
    }
  }
}

createGame();