import React from 'react';
import Board from './Board/Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      isXturn: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const newSquares = current.squares.slice();
    if (caluculaterWinner(newSquares) != null || newSquares[i] != null) {
      return
    }
    newSquares[i] = this.state.isXturn ? 'X' : "O";
    this.setState({
      history: history.concat([{
        squares: newSquares,
      }]),
      isXturn: !this.state.isXturn
    })
  }

  render() {
    let status;
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = caluculaterWinner(current.squares);
    if (winner != null) {
      status = 'Winner player:' + winner;
    } else {
      status = 'Next player:' + (this.state.isXturn ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function caluculaterWinner(squares) {
  const victoryLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < victoryLines.length; i++) {
    const [a, b, c] = victoryLines[i]
    if (squares[a] != null &&
      squares[a] == squares[b] &&
      squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;