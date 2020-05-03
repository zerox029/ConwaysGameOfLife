import React from 'react';
import logo from './logo.svg';

import Board from './components/Board';
import Settings from './components/Settings';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeBoardSize = this.onChangeBoardSize.bind(this);
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.setIsRunning = this.setIsRunning.bind(this);
    this.clear = this.clear.bind(this);

    this.state = {
      boardSize: 10,
      genSpeed: 1000,
      isRunning: false,
    }
  }
  
  onChangeBoardSize(size) {
    this.setState({boardSize: size});
  }

  onChangeSpeed(speed) {
    speed *= 1000;
    this.setState({genSpeed: speed});
  }

  setIsRunning(isRunning) {
    this.setState({isRunning});
  }

  clear() {
    this.refs.board.clearBoard();
  }
  
  render() {
    return (
      <div className="App">
        <h1>Conway's game of life</h1>
        <div className="gameArea">
          <Board size={this.state.boardSize} speed={this.state.genSpeed} startButtonStatus={this.state.isRunning} ref="board"/>
          <Settings changeSize={this.onChangeBoardSize} changeSpeed={this.onChangeSpeed} setIsRunning={this.setIsRunning} clear={this.clear}/>
        </div>
      </div>
    );
  }
}

export default App;
