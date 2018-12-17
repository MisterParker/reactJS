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
    if(squares[a] && squares[a]===squares[b] &&  
      squares[a]===squares[c]){ 
        // eslint-disable-next-lin
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
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,    
  //   };
  // }

  //NOTE: in react it is convention to use handle[event] and on[event]
  // immutability i.e. using .slice() is very important, because
  // a. mutation helps us preserve data, i.e. in case of undo redo we can
  //..protect the data
  //  b. the main benefit is that it HELPS US BUILD PURE COMPONENTS

  // 16
  // handleClick(i){
  //   const squares = this.state.squares.slice();
  //   // .slice() to create copy, to modify copy instead of existing array
  //   if(CalculateWinner(squares) || squares[i]){
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //       squares : squares,
  //     xIsNext : !this.state.xIsNext,
  //   });
  // }
  renderSquare(i) {
  //  return <Square value={i} />; this one was for giving 
  // ... numerical value to the props b/w 0 to 8

      return <Square value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}      // handleClick is defined by us   
      />;
  // ... this sets the value of the state as null initially
  }
  
  render() {
    
    // const winner = CalculateWinner(this.state.squares);
    // let status;
    // if(winner){
    //   status = 'Winner : '+ winner;
    // }else {
    //   status = 'Next player: ' +
    //   (this.state.xIsNext ? 'X' : 'O');
    // } 

    return (
      <div>
        {/* <div className="status">{status}</div> */}
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
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber : 0,
      xIsNext: true,
    };
  }
  // Handle click fires when we click a square
  handleClick(i){
    const history = this.state.history.slice(
      0, this.state.stepNumber + 1);                      // 23.
    const current = history[history.length-1];
    const squares = current.squares.slice();
    // .slice() to create copy, to modify copy instead of existing array
    if(CalculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history : history.concat([{
        squares : squares,
      }]),
      stepNumber  : history.length,
      xIsNext : !this.state.xIsNext,
    });
  }
  // 22.
  jumpTo(step){
    this.setState({
      stepNumber : step,
      xIsNext: (step % 2)===0,
    });
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];         // 24.
    const current = history[this.state.stepNumber];
    const winner = CalculateWinner(current.squares);
    // 17. mapping history
    const moves = history.map((step, move) => {
      const desc = move ? 
      'Go to move #' + move : 'Go to game start';
      return(
        // move can be used as a key since it is never re-ordered, deleted or
        // ...inserted in between
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>
            {desc} </button>
        </li>
      );
    });

    let status;
    if(winner){
      status = 'Winner: '+ winner;
    }else{
      status = 'Next Player: '+ (this.state.xIsNext ? 'X':'O');
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
        <ol>{moves}</ol>
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
//... // 10. making us decide a winner by creating a caluclate winner function
//...and fixing a state xIsNext to check whos turn it is
// 11. include time travel that is history, for this the props will be 
//...transfer from game to board and so DELETE constructor in board
//...and include it in game, and again
// 12. change the this.state to this.props in the boards since now the 
//... the game is handling the states and passing it as props
// 13. replace this.state.squares[i] with this.props.squares[i] in renderSquare
// 14. replace this.handleClick(i) with this.props.onClick(i) 
// 15. update the Game component’s render function to use the most recent 
//...history entry to determine and display the game’s status
// 16. now update the handleclick fucntion include history inside into 
//...to it and concatanate it inside the setState function, unlike the push()
//...method, concat() method doesnt mutate so we will prefer using it.
//... MOVE THE handleclick TO GAME FROM BOARD

// 17. history function is creasted that will store all the moves of the
//... and current state is defined using history and winner state is defined
//...by checking all the current states
// 18. now history is mapped using the map function, i.e map is used to 
//...map history of our moves to react elements present on the screen
// EXAMPLE:
//...const numbers = [1, 2, 3];
//...const doubled = numbers.map(x => x * 2); // [2, 4, 6]

//20. FYI: key cannot be refrences using this.props.key. //#endregionReact 
//...automatically uses key to decide which components to update. A component 
//...,cannot inquire about its key. 
// 21. we have added key to the buttons and used move as the key, it is save
//...to use it as a key since it in not re-ordered, deleted or inserted in between
// 22. Now, we are defining the jupmTo function, the function that is called when the
//...history button or step button are pressed.
// 23. mow we make changes in handleCLick that is fired when a square is clicked
//...we change this.state,history to this.state.history.slice(0, this.state.stepNo. +1)
//...it will makes sure that we can make new moves if we go to back moves i.e. we 
//... throw away all the stored future moves.
// 24. finally we are modifying the current state in the game render code
//.. instead of rendering the last move we will make it to render the selected move
//...according to the step.

//..................................................................................
//....................................THE END.......................................
//..................................................................................