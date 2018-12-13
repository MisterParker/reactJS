import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // 3. // 4.
    
//     // 7.
//     // constructor(props){
//     //   super(props);    
//     //   this.state = {    
//     //     value : null,
//     //   };
//     // }

//     // 9.

//     render() {
//       return (
//         // 0. // 1. // 2. // 5. // 8.
//         <button className="square" 
//         onClick={() => this.props.onClick()}
//         >
//           {/* {this.state.value} */ this.props.value}
//         </button>
//       );
//     }
//   }

// REPLACING THE CLASS SQUARE WITH FUNCTIONAL COMPONENTS ref. point 9
// 10. 
function Square(props){
  return(
    // note the lack of paranthesis on both the sides of onclick
    <button className="square" onClick={props.onClick}> 
      {props.value}
    </button>
  )
}

function CalculateWinner(squares){
  const lines = [   //all the combinations of win
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i <lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a]===squares[b] &&  //if positions have same character
      squares[a]===squares[c]){
        return squares [a];
      }
  }
  return null;
}

    // NOTE : to share data between two chilren, we share the space with 
    // parent instead, and parent share it back to the child using props
    // this keep child components in sync with each other, basically the
    // parent is moderating the communication
  
class Board extends React.Component {
  // 6.
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,    
    };
  }

  //NOTE: in react it is convention to use handle[event] and on[event]
  // immutability i.e. using .slice() is very important, because
  // a. mutation helps us preserve data, i.e. in case of undo redo we can
  //..protect the data
  //  b. the main benefit is that it HELPS US BUILD PURE COMPONENTS
  handleClick(i){
    const squares = this.state.squares.slice();
    // .slice() to create copy, to modify copy instead of existing array
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares : squares,
      xIsNext : !this.state.xIsNext,
    });
  }
  renderSquare(i) {
  //  return <Square value={i} />; this one was for giving 
  // ... numerical value to the props b/w 0 to 8

      return <Square value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}      // handleClick is defined by us   
      />;
  // ... this sets the value of the state as null initially
  }
  
  render() {
    const winner = CalculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner : '+ winner;
    }else {
      status = 'Next player: ' +
      (this.state.xIsNext ? 'X' : 'O');
    } 

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

    // 0. props is how we transfer the information from parent 
    //... to child
    // 1. we will use arrow function syntax for even handlers
    // 2. if we miss '() =>' then alert will be executed every
    //... time the code re-renders i.e. here 9 times, we need to 
    //... pass the onclick prop as a function, so use () =>
    // 3. adding 'state' to the components which is used to remember 
    //... things
    // 4. In javascript we always have to call super when defining 
    //... defining the constructor of the subclass. ALL REACT COMPONENT
    //... CLASSES that have CONSTRUCTOR should start with super(props) 
    // 5. this.props.value will give the number that is passed
    //... in the parent while state will give the value of the state
    //... replace this.props with this.state
    // 6. making an array with 9 nulls corr. to the 9 squares
    // 7. now delete the constructor in square as it no longer keeps the
    //... the track of game's state
    // 8. replace this.state with this.props and make props.onClick()
    //... instead of this.setState
    // 9. now we will be defining function component of squares
    //... function components are a simpler way to write components that 
    //...only contain a render method and don’t have their own state.
    //...Instead of defining a class which extends React.Component, we can 
    //...write a function that takes props as input and returns what should 
    //...be rendered.
