import { dictionary } from "./dictionary.js";
import { randomBoard5x5 } from "./random.js";

//////////////////////////////////////////////////

const isDictionaryWord = (word) => {
  return dictionary.indexOf(word) > -1;
}

///////////////////////////////////////////////////

const logElt = document.getElementById("log");

const log = (...x) => {
  let messageElt = document.createElement("div");
  messageElt.className = "log-row";
  messageElt.textContent = x.map(d => String(d)).join(" ");
  if(logElt) { 
    logElt.prepend(messageElt);
  }
  console.log(...x);
}

//////////////////////////////////////////////////

/**
 * `GameState` is the _controller_ for our Boggle game.  It
 * exposes methods that can be used to make word selections,
 * compute scores, reset the game, etc..
 * 
 * The GameState class is responsible for ensuring that the
 * internal state remains valid at all times.  There should
 * be no risk of accidentally "breaking" the game by using
 * the public interface.
 */
class GameState {
  constructor(boardSize) {
    // save the board size in a field of this class
    this.boardSize = boardSize;

    // creates a 2d array of strings
    this.board = new Array(this.boardSize);
    for(let r = 0; r < this.boardSize; r++) {
      this.board[r] = new Array(this.boardSize).fill("A");
    }

    // keep a list of the selected squares
    this.selectedSquares = [];

    // initialize
    this.reset();
  }

  reset() {
    // generate a random board
    this.board = randomBoard5x5();
    
    // reset selection
    this.selectedSquares = [];
  }

  /** Begin selecting a new word from the grid. */
  beginSelection(row, col) {
    log("BEGIN", row, col);
    // reset the selection
    this.selectedSquares = [];
    this.selectedSquares.push({
      row: row,
      col: col,
    })
  }

  /** Add a new square to the user's current selection. */
  addToSelection(row, col) {
    log("ADD", row, col);
    this.selectedSquares.push({
      row: row,
      col: col,
    })
  }

  /** End the selection, and submit the word for scoring. */
  closeSelection() {
    log("CLOSE");
    // TODO
  }
}

//////////////////////////////////////////////////

/**
 * `View` is responsible for managing the visual appearance
 * of our game.  The actual game state is stored in the 
 * `GameState` class, but `View` has methods to synchronize
 * the HTML of the page with the current game state.
 */
class View {
  
  constructor(
    gameElt,
    /** @type GameState */ gameState,
  ) {
    // create board
    boardElt = document.createElement("div");
    boardElt.className = "board";
    gameElt.appendChild(boardElt);

    // create list of squares
    this.squares = [];
    
    // create squares
    for(let row = 0; row < gameState.boardSize; row++) {
      let squareRow = [];
      for(let col = 0; col < gameState.boardSize; col++) {
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

  /**
   * Synchronize the web page to reflect the current `GameState`.
   */
  updateView() {
    // unselect all squares first
    for(let row = 0; row < gameState.boardSize; row++) {
      for(let col = 0; col < gameState.boardSize; col++) {
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
  // eventcurrentTarget is the element this event is attached to
  // event.target is the element we actually clicked (possibly a child of currentTarget)
  let element = event.target;

  // make sure that the clicked element is a square
  if(element.className !== "square") {
    return;
  }
  
  // begin a new selection
  let row = element.dataset["row"];
  let col = element.dataset["col"];

  gameState.beginSelection(row, col);
  view.updateView();

  // attach a new listener for "mouseover" events
  boardElt.addEventListener("mouseover", handleMouseOver);

  // when we release the mouse or leave the game area,
  // remove the event listener for "mouseover"
  const removeMouseOver = () => {
    boardElt.removeEventListener("mouseover", handleMouseOver);
  }
  boardElt.addEventListener("mouseleave", removeMouseOver);
  boardElt.addEventListener("mouseup", removeMouseOver);
}

/**
 * Handler for the "mouseover" event on the game board.
 *   (triggers whenever `event.target` changes)
 */
const handleMouseOver = (event) => {
  // ignore any elements which are not board squares
  let element = event.target;
  if(element.className !== "square") {
    return;
  }

  // read the "row" and "col" dataset attributes
  let row = element.dataset["row"];
  let col = element.dataset["col"];

  // add this square to the user's selection
  gameState.addToSelection(row, col);
  view.updateView();
}

//////////////////////////////////////////////////

// The code below actually starts the game!

/** @type HTMLElement */
let boardElt;

// create view
const BOARD_SIZE = 5;
const gameState = new GameState(BOARD_SIZE);

// create view
let gameElt = document.getElementById("game");
let view = new View(gameElt, gameState);