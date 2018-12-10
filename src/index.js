import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    // 3. adding 'state' to the components which is used to remember 
    //... things
    // 4. In javascript we always have to call super when defining 
    //... defining the constructor of the subclass. ALL REACT COMPONENT
    //... CLASSES that have CONSTRUCTOR should start with super(props) 
    constructor(props){
      super(props);    
      this.state = {    
        value : null,
      };
    }

    render() {
      return (
        // 0. props is how we transfer the information from parent 
        //... to child
        // 1. we will use arrow function syntax for even handlers
        // 2. if we miss '() =>' then alert will be executed every
        //... time the code re-renders i.e. here 9 times, we need to 
        //... pass the onclick prop as a function, so use () =>
        // 5. this.props.value will give the number that is passed
        //... in the parent while state will give the value of the state
        <button className="square" 
        onClick={() => this.setState({value: 'X'})}
        >
          {/* {this.props.value} */ this.state.value}
        </button>
      );
    }
  }

    // NOTE : to share data between two chilren, we share the space with 
    // parent instead, and parent share it back to the child using props
    // this keep child components in sync with each other, basically the
    // parent is moderating the communication
  
class Board extends React.Component {
  // 6. making an array with 9 nulls corr. to the 9 squares
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
  //  return <Square value={i} />; this one was for giving 
  // ... numerical value to the props b/w 0 to 8

      return <Square value={this.state.squares[i]} />;
  // ... this sets the value of the state as null initially
  }
  
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }  
}
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
