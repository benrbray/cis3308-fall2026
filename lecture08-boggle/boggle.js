import { dictionary } from "./dictionary.js";

//////////////////////////////////////////////////

const isDictionaryWord = (word) => {
  return dictionary.indexOf(word) > -1;
}

//////////////////////////////////////////////////

class GameState {
  constructor(boardSize) {
    // creates a 2d array of strings
    this.board = new Array(boardSize);
    for(let r = 0; r < boardSize; r++) {
      this.board[r] = new Array(boardSize).fill("A");
    }

    // keep a list of the selected squares
    this.selectedSquares = [];
  }

  beginSelection(row, col) {
    console.log("BEGIN", row, col);
    // reset the selection
    this.selectedSquares = [];
    this.selectedSquares.push({
      row: row,
      col: col,
    })
  }

  addToSelection(row, col) {
    console.log("ADD", row, col);
    this.selectedSquares.push({
      row: row,
      col: col,
    })
  }

  closeSelection() {
    console.log("CLOSE");
    // TODO
  }
}

//////////////////////////////////////////////////

const makeGameBoard = () => {
  // @ts-ignore

}

class View {
  
  constructor(
    gameElt
  ) {
    // create board
    boardElt = document.createElement("div");
    boardElt.className = "board";
    gameElt.appendChild(boardElt);

    // create list of squares
    this.squares = [];
    
    // create squares
    for(let row = 0; row < BOARD_SIZE; row++) {
      let squareRow = [];
      for(let col = 0; col < BOARD_SIZE; col++) {
        let square = document.createElement("div");
        square.dataset["row"] = `${row}`;
        square.dataset["col"] = `${col}`;
        square.className = "square";
        square.textContent = gameState.board[row][col];
        boardElt.appendChild(square);

        // keep a reference to this square
        squareRow.push(square);
      }
      this.squares.push(squareRow);
    }
    
    // click listener
    boardElt.onmousedown = handleBoardClick;
  }

  updateView() {
    // unselect all squares first
    for(let row = 0; row < BOARD_SIZE; row++) {
      for(let col = 0; col < BOARD_SIZE; col++) {
        this.squares[row][col].classList.remove("selected");
      }
    }

    // add the "selected" css class to
    // any currently selected squares
    for(let selectedSquare of gameState.selectedSquares) {
      let squareElt = this.squares[selectedSquare.row][selectedSquare.col]
      squareElt.classList.add("selected");
    }
  }
}

const handleBoardClick = (event) => {
  console.log(event);
  // currentTarget is the element the event is attached to
  // target is the actual element INSIDE that we are clicking
  // console.log("currentTarget:", event.currentTarget);
  // console.log("target:", event.target);

  // make sure that the clicked element is a square
  if(event.target.className !== "square") {
    return;
  }
  
  // begin a new selection
  let row = event.target.dataset["row"];
  let col = event.target.dataset["col"];
  gameState.beginSelection(row, col);
  view.updateView();

  // attach a new listener for "mouseover" events
  boardElt.addEventListener("mouseover", handleMouseOver);

  // if we ever stop, stop responding to "mouseover"
  boardElt.addEventListener("mouseleave", removeMouseOver);
  boardElt.addEventListener("mouseup", removeMouseOver);
}

const removeMouseOver = (event) => {
  boardElt.removeEventListener("mouseover", handleMouseOver);
}

const handleMouseOver = (event) => {
  let squareElt = event.target;
  let row = squareElt.dataset["row"];
  let col = squareElt.dataset["col"];

  gameState.addToSelection(row, col);
  view.updateView();
}

//////////////////////////////////////////////////

/** @type HTMLElement */
let boardElt;

// create view
const BOARD_SIZE = 5;
const gameState = new GameState(BOARD_SIZE);

// create view
let gameElt = document.getElementById("game");
let view = new View(gameElt);