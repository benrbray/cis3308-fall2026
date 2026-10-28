import { useState } from 'react';
import './App.css'

const calculateWinner = (squares: string[]): string|null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const Square = (props: {
  value: string,
  onSquareClick: () => void
}) => {
  return <button className="square" onClick={props.onSquareClick}>
    {props.value}
  </button>;
}

export const Board = () => {
  const [xIsNext, setXIsNext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(""))

  const handleClick = (i: number) => {
    // do nothing if this square is full, or if the game is over!
    if(squares[i] !== "" || calculateWinner(squares) !== null) {
      return;
    }

    // setSquares takes a _new_ array state as input
    // so make a version of the squares array with one value changed
    const updatedSquares = squares.slice();
    
    if(xIsNext) {
      updatedSquares[i] = "X";
    } else {
      updatedSquares[i] = "O";
    }
    
    setSquares(updatedSquares)
    setXIsNext(!xIsNext);
  }

  return (<>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>);
}

export const App = () => {
  return <div>
    <Board />
  </div>
}