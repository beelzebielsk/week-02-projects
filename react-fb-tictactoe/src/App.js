import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// - Each Tile should render the symbol which reflects it's state, as
// defined by the parent board. Altering the state of a Tile should alter
// the state of its parent board.
// - Only empty Tiles should have their state be settable. Whatever
// onclick method they get should probably check the Tile's state, and do
// nothing of the Tile is not empty.
class Tile extends Component {
  constructor(props) {
    super(props);
    this.makeMove = () => {
      if (this.props.children === '') {
        this.props.recordMove(this.props.index);
      }
    };
  }
  render() {
    return (
      <td className="tile" 
          onClick={this.makeMove}>
        {this.props.children}
      </td>
    );
  }
}

// - The board should hold state reflecting the moves made.
// - The state should be exportable as a simple object, of which copies
// can be made. The copies will be placed in the moveHistory log, and will
// be restorable.
// - The board should create a method for altering its state and pass that
// method down to the children Tiles. The method should take in an index
// and a symbol.
// - This should have a function which accepts a representation of board
// state and sets the board's state to that state.
// - The board should keep track of the current player's symbol.
// - How do I design this so that the minimum number of redraws is
// performed?
class Board extends Component {
  constructor(props) {
    super(props);
    let state = { 
      currentMove : 'x',
      finished : false
    };
    for (let i = 0; i < 9; i++) {
      state[i] = '';
    }
    this.state = state;
    this.recordMove = (index) => {
      console.log("Recording Move from Board.");
      console.log(index);
      this.setState((prevState) => {
        let move = { 
          currentMove : (prevState.currentMove === 'x' ? 'o' : 'x')
        };
        move[index] = prevState.currentMove
        return move;
      });
    }
  }
  checkDiagonal(index, state) {
    let directions = [
      [0, 4, 8], // top-left to bottom-right
      [2, 4, 6], // bottom-left to top-right
    ];
    for (let diagonal of directions) {
      if (diagonal.contains(index)) {
        let winning = diagonal.map(
          pos => state.state[pos]
        ).every(
          sym => sym === state.currentMove
        )
        if (winning) return winning;
      }
    }
    return false;
  }
  checkRow(index, state) {
    let row = Math.floor(index / 3);
    let toCheck = [-2, -1, 0, 1, 2];
    return toCheck.map(
      pos => pos + index
    ).filter(
      pos => Math.floor(pos / 3) === row
    ).map(
      pos => state[pos]
    ).every(
     sym => sym === state.currentMove
    );
  }
  checkColumn(index, state) {
    let column = index % 3;
    let toCheck = [-6, -3, 0, 3, 6];
    return toCheck.map(
      pos => pos + index
    ).filter(
      pos => (pos >= 0 && pos < 9)
    ).map(
      pos => state[pos]
    ).every(
     sym => sym === state.currentMove
    );
  }
  render() {
    let table = <table></table>
    return (
      <table>
        <tbody>
          <tr>
            <Tile index={0} recordMove={this.recordMove}>
              {this.state[0]}
            </Tile>
            <Tile index={1} recordMove={this.recordMove}>
              {this.state[1]}
            </Tile>
            <Tile index={2} recordMove={this.recordMove}>
              {this.state[2]}
            </Tile>
          </tr>                                       
          <tr>                                        
            <Tile index={3} recordMove={this.recordMove}>
              {this.state[3]}
            </Tile>
            <Tile index={4} recordMove={this.recordMove}>
              {this.state[4]}
            </Tile>
            <Tile index={5} recordMove={this.recordMove}>
              {this.state[5]}
            </Tile>
          </tr>                                       
          <tr>                                        
            <Tile index={6} recordMove={this.recordMove}>
              {this.state[6]}
            </Tile>
            <Tile index={7} recordMove={this.recordMove}>
              {this.state[7]}
            </Tile>
            <Tile index={8} recordMove={this.recordMove}>
              {this.state[8]}
            </Tile>
          </tr>
        </tbody> 
      </table>
    );
  }
}

// - This should hold state. A list of states from the board. Rendering
// will just be a list of links, each of which executes some javascript
// which sets the board's state.
// - Going earlier in history shouldn't change the move log immediately
// (in other words, if we go from move 6 to move 3, we shouldn't
// immediately erase moves 4,5, and 6. We should only remove those moves
// if the user makes a move after restoring history. Basically, if the
// user makes a move, and the number of game moves doesn't match the
// number of history moves, then we change the history to match.
class MoveHistory extends Component {}

class App extends Component {
  render() {
    return (
      <Board/>
    );
  }
}

export default App;
