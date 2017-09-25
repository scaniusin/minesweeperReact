import React, { Component } from 'react';
// import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import './utils';
import Table from "./Components/Table";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      time: 0,
      game: "start", // start gameOver winner
      openCell: 0,
      cols : 5,
      rows: 5,
      mines: 10,
      colsFinal : 5,
      rowsFinal: 5,
      minesFinal: 10,
    };
  }
  componentWillMount() {
    this.interval = [];
  }

  handleChanges = (e) => {
    // _.debounce(() => this.setState({ [e.target.name]: e.target.value}), 400);
    // setTimeout(() => {this.setState({ [e.target.name]: e.target.value})}, 1000)
    this.setState({ [e.target.name]: e.target.value});
  };

  onSubmit = (e) =>{
    e.preventDefault();

    if(this.state.mines >=  this.state.cols *  this.state.rows ||
        this.state.cols > 30 || this.state.rows > 30
    ){
      this.setState({
        mines: 10,
        cols : 5,
        rows: 5,
      });
      alert("Maximum of Colls and Rows is 30, mines should be less than colls*mines")
    }else{
      this.setState({
        game: "start",
        colsFinal: this.state.cols,
        rowsFinal: this.state.rows,
        minesFinal: this.state.mines,
        openCell: 0
      });
    }
  };

  gameOver = () => {
    this.setState({game: "gameOver"});
    this.refs.msgImg.src = "img/sad-smile.png";
    this.refs.msgText.innerHTML = "You are Loser!";
    clearInterval(this.interval);
  };

  newGame = () =>{
    if(this.state.mines >=  this.state.cols *  this.state.rows ||
      this.state.cols > 30 || this.state.rows > 30){
      this.setState({
        mines: 10,
        cols : 5,
        rows: 5,
      });
      alert("Maximum of Colls and Rows is 30, mines should be less than colls*mines")
    }else{
      this.setState({
        game: "start",
        colsFinal: this.state.cols,
        rowsFinal: this.state.rows,
        minesFinal: this.state.mines,
        openCell: 0,
        time:0
      });
    }
    this.refs.msgImg.src = "img/wonder-smile.png";
    this.refs.msgText.innerHTML = "Let's see who you are?";
  };

  tick() {
    if(this.state.openCell > 0 && this.state.game === "start"){
      this.setState({time: this.state.time + 1 });
    }
  }

  addOpenCell = () =>{
    if(this.state.openCell === 0){
      this.interval = setInterval(this.tick.bind(this), 1000);
    }
    this.setState({
      openCell: ++ this.state.openCell
    });

    if((this.state.colsFinal * this.state.rowsFinal - this.state.minesFinal) === this.state.openCell){
      this.setState({
        game: "winner"
      });
      this.refs.msgImg.src = "img/happy-smile.png";
      this.refs.msgText.innerHTML = "You are the Winner!";
      console.log("winner");
    }
  };

  render() {
    const{ cols, rows, mines, colsFinal, rowsFinal, minesFinal, openCell} = this.state;



    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4>Welcome to MineSweeper on ReactJS</h4>
        </div>

        <form onSubmit={this.onSubmit} className="row justify-content-center m-t">
          <div className="input-group col-md-2 sm-t">
            <span className="input-group-addon">Colons:</span>
            <input type="text" className="form-control" value={cols} onChange={this.handleChanges} name="cols" id="width"/>
          </div>
          <div className="input-group col-md-2 sm-t">
            <span className="input-group-addon">Rows:</span>
            <input type="text" className="form-control" value={rows} onChange={this.handleChanges} name="rows" id="height"/>
          </div>
          <div className="input-group col-md-2 sm-t">
            <span className="input-group-addon">Mines:</span>
            <input type="text" className="form-control" value={mines} onChange={this.handleChanges} name="mines" id="mines"/>
          </div>
          <div className="input-group col-md-2 sm-t text-center">
            <button type="submit" className="btn btn-outline-info" id="set">Set</button>
          </div>
        </form>

        <div className="row justify-content-center m-t">
          <div className="msg col-md-4">
            <div className="msg-timer">
              <span>Timer:   </span>
              <span id="stopwatch" > {this.state.time}  </span>
            </div>
          </div>
          <div className="msg col-md-4 sm-t">
            <img ref="msgImg" id="msg-img" src="img/wonder-smile.png" width="50px" alt="smiles"/>
            <b><span ref="msgText" id="msg-text">Let's see who you are?</span></b>
          </div>
          <div className="buttons col-md-4 sm-t">
            <button onClick={this.newGame} type="button" className="btn btn-outline-warning" id="reset" >New Game</button>
          </div>
        </div>

        <div className="row justify-content-center m-t m-b">
          <table className="text-center" >
            <Table cols={colsFinal}
                   rows={rowsFinal}
                   mines={minesFinal}
                   openCell={openCell}
                   gameOver={this.gameOver.bind(this)}
                   addOpenCell={this.addOpenCell.bind(this)}
            />

          </table>
        </div>
      </div>
    );
  }
}

export default App;
