import React, { Component } from 'react';
import './styles.css';
import Cell from './Cell'



class Table extends Component {

  constructor(props){
    super(props);
    this.state = {
      table: this.createTable(props),
      rows: props.rows,
      cols: props.cols,
      game: props.game
    };
  }
  componentWillReceiveProps(nextProps) {

    if(this.props.openCell > nextProps.openCell ||
      this.props.cols !== nextProps.cols ||
      this.props.rows !== nextProps.rows ||
      this.props.mines !== nextProps.mines
    ) {
      this.setState({
        table: this.createTable(nextProps),
        rows: nextProps.rows,
        cols: nextProps.cols,
        game: nextProps.game
      });
    }

    // else if(this.props.game !== nextProps.game){
    //   this.setState({
    //     game: nextProps.game
    //   });
    // }
  }

  createTable = (props) => {
    let table = [];
    for(let row = 0; row < props.rows; row++){
      table.push([]);
      for(let col = 0; col < props.cols; col++){
        table[row].push({
          x : col,
          y : row,
          count : 0,
          isOpened : false,
          hasMine : false,
          hasFlag : false,
          game: "start"
        });
      }
    }
    for(let i = 0; i < props.mines; i++){
      let cell = table[Math.floor(Math.random()*props.rows)][Math.floor(Math.random()*props.cols)];
      if(cell.hasMine){
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return table;
  };



  open = (cell) => {
    // if(!_table[cell.y][cell.x].isOpened){
    //
    // }
    let num = this.countMines(cell);
    let _table = this.state.table;
    if(!_table[cell.y][cell.x].isOpened){
      this.props.addOpenCell();
    }
    _table[cell.y][cell.x].isOpened = true;
    _table[cell.y][cell.x].count = cell.hasMine ? "b" : num;

    this.setState({table : _table});

    // if(_table[cell.y][cell.x].hasFlag){
    //   _table[cell.y][cell.x].hasFlag = false;
    //   // this.props.checkFlagNum(-1);
    // }
    if(!cell.hasMine && num === 0){
      this.openAround(cell);
    }
    if(cell.hasMine){
      this.props.gameOver();
      this.gameOver();
    }
  };

  rightClick = (cell) => {
    let _table = this.state.table;
    _table[cell.y][cell.x].hasFlag = !cell.hasFlag;

    this.setState({table : _table});
      // this.props.checkFlagNum(-1);
  };

  gameOver = () => {
    let _table = this.state.table;
    for(let rowNum = 0; rowNum < this.state.rows; rowNum++) {
      for (let colNum = 0; colNum < this.state.cols; colNum++) {
        const cell = _table[rowNum][colNum];
        cell.isOpened = true;
        cell.game = "gameOver";
        if(!cell.hasMine){
          cell.count =  this.countMines(cell);
        }
      }
    }
    this.setState({table : _table});
  };

  countMines(cell) {
    let aroundMinesNum = 0;
    for(let row = -1; row <= 1; row++){
      for(let col = -1; col <= 1; col++){
        if( cell.y-0 + row >= 0 &&
            cell.x-0 + col >= 0 &&
            cell.y-0 + row < this.state.table.length &&
            cell.x-0 + col < this.state.table[0].length &&
            this.state.table[cell.y-0 + row][cell.x-0 + col].hasMine &&
            !(row === 0 && col === 0)){
          aroundMinesNum ++;
        }
      }
    }
    return aroundMinesNum;
  }
  openAround(cell){
    let _table = this.state.table;
    for(let row = -1; row <= 1; row++){
      for(let col = -1; col <= 1; col++){
        if(cell.y-0 + row >= 0 &&
          cell.x-0 + col >= 0 &&
          cell.y-0 + row < this.state.table.length &&
          cell.x-0 + col < this.state.table[0].length &&
          !this.state.table[cell.y-0 + row][cell.x-0 + col].hasMine &&
          !this.state.table[cell.y-0 + row][cell.x-0 + col].isOpened){
          this.open(_table[cell.y-0 + row][cell.x-0 + col]);
        }
      }
    }
  }

  renderCells = (cell) =>{
    return(
      <Cell key={cell.x + '.' + cell.y}
            open={this.open.bind(this)}
            rightClick={this.rightClick.bind(this)}
            cell={cell}
            // game={this.state.game}
      >
      </Cell>
    );
  };

  renderRows = (rows) =>{
    const cells = rows.map(this.renderCells);
    let key = Math.random();
    return (
      <tr key={key}>
        {cells}
      </tr>
    );
  };


  render(){
    const renderedTable = this.state.table.map(this.renderRows);
    return (
      <tbody className="table-body" id="table-body">
        {renderedTable}
      </tbody>
    );
  }
}


export default Table;


