import React from 'react';
import Cell from './Cell';

import styles from './Board.module.css';

class Board extends React.Component {
  constructor(props) 
  {
    super(props);

    this.onCellClick = this.onCellClick.bind(this);

    this.state = {
      boardSize: this.props.size,
      cells: [],
      genTime: 1000,
      startButtonStatus: false,
      isRunning: false
    }
  }

  componentDidMount() {
    this.createBoard();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.size !== this.props.size) {
      this.setState({boardSize: this.props.size}, () => this.createBoard());
    }

    if(prevProps.speed !== this.props.speed) {
      this.setState({genTime: this.props.speed});
    }

    if(prevProps.startButtonStatus !== this.props.startButtonStatus) {
      this.setState({startButtonStatus: this.props.startButtonStatus});
    }

    if(this.state.isRunning === false && this.state.startButtonStatus === true) {
      this.startSimulation(this.state.genTime);
    }
  }

  clearBoard() {
    this.setState({cells: this.create2DArray(this.state.boardSize)});
  }

  createBoard() {
    //Create a 2d array populated with booleans representing the state of the cells
    const {boardSize} = this.state;
    if(boardSize !== this.state.cells.length)
    {
      this.setState({cells: this.create2DArray(boardSize)});
    }
  }

  create2DArray(boardSize) {
    var cells = [];
    
    for(let row = 0; row < boardSize; row++) {
      const currentRow = [];
      for(let col = 0; col < boardSize; col++) {
        currentRow.push(false);
      }
      cells.push(currentRow);
    }

    return cells;
  }

  onCellClick(x, y) {
    //toggle the state of the clicked cell
    let {cells} = this.state;
    cells[x][y] = !cells[x][y];
    
    this.setState({cells})
  }

  getCellStatus(x, y) {
    return this.state.cells[x][y];
  }

  startSimulation(genTime) {
    this.setState({isRunning: true});

    if(this.state.startButtonStatus === true)
    {
      this.runGeneration();
      setTimeout(() => this.startSimulation(genTime), genTime);
    }
    else
    {
      this.setState({isRunning: false});
    }
  }

  runGeneration() {
    const {boardSize} = this.state;
    var cellsCopy = this.create2DArray(boardSize);

    for(var x = 0; x < boardSize; x++) {
      for(var y = 0; y < boardSize; y++) {
        cellsCopy[x][y] = this.cellValidityCheck(this.state.cells[x][y], this.getNeighbourCount(x, y));
      }
    }

    this.setState({cells: cellsCopy});
  }

  cellValidityCheck(currentCell, neighbourCount) {
    
    //console.log(neighbourCount);

    //if populated
    if(currentCell === true)
    {
      if(neighbourCount === 2 || neighbourCount === 3)
        return true;
      else
        return false;
    }
    else //if unpopulated
    {
      if(neighbourCount == 3)
        return true;
      else
        return false;
    }
  }

  getNeighbourCount(x, y) {
    var neighbourCount = 0;
    const {cells, boardSize} = this.state;
    for(var i = -1; i < 2; i++) {
      for(var j = -1; j < 2; j++) {
        if(i == 1 || j == 1 || i == -1 || j == -1) {
          const rx = x + i, ry = y + j;
          if(rx >= 0 && ry >= 0 && rx < boardSize && ry < boardSize)
          {
            neighbourCount += (cells[rx][ry] === true ? 1 : 0);
          }
        }
      }
    }

    return neighbourCount;
  }

  render() {
    const {cells} = this.state;

    return(
      <div className={styles.board}>
        {cells.map((row, rowIdx) => {
          return <div key={rowIdx} className="row">
            {row.map((cell, cellIdx) => <Cell key={cellIdx} coords={{cellIdx, rowIdx}} isAlive={this.getCellStatus(cellIdx, rowIdx)} onClick={this.onCellClick}/>)}
          </div>
        })}
      </div>
    );
  }
}

export default Board;