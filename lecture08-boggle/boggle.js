import { dictionary } from "./dictionary.js";

//////////////////////////////////////////////////

const isDictionaryWord = (word) => {
  return dictionary.indexOf(word) > -1;
}

//////////////////////////////////////////////////

class GameState {
  constructor(boardSize) {
    this.board = new Array(boardSize);
    for(let r = 0; r < boardSize; r++) {
      this.board[r] = new Array(boardSize).fill("A");
    }
  }
}

//////////////////////////////////////////////////

/** @type HTMLElement */
let gameElt;
/** @type HTMLElement */
let boardElt;

const BOARD_SIZE = 5;

const gameState = new GameState(BOARD_SIZE);

//////////////////////////////////////////////////

const makeGameBoard = () => {
  // @ts-ignore
  gameElt = document.getElementById("game");

  // create board
  boardElt = document.createElement("div");
  boardElt.className = "board";
  gameElt.appendChild(boardElt);

  // create squares
  for(let row = 0; row < BOARD_SIZE; row++) {
    for(let col = 0; col < BOARD_SIZE; col++) {
      let square = document.createElement("div");
      square.dataset["row"] = `${row}`;
      square.dataset["col"] = `${col}`;
      square.className = "square";
      square.textContent = gameState.board[row][col];
      boardElt.appendChild(square);
    }
  }

  // click listener
  boardElt.onmousedown = handleBoardClick;
}

const handleBoardClick = (event) => {
  // currentTarget is the element the event is attached to
  console.log("currentTarget:", event.currentTarget);

  // target is the actual element INSIDE that we are clicking
  console.log("target:", event.target);

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
  console.log("MouseOver Target:", event.target);
}

//////////////////////////////////////////////////

makeGameBoard();
