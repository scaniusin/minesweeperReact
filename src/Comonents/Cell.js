import React, { Component } from 'react';
import './styles.css';



class Cell extends Component {
  constructor(props){
    super(props);

    this.state ={
      hasMine : props.cell.hasMine,
      hasFlag : props.cell.hasFlag,
      isOpened : props.cell.isOpened,
      count: props.cell.count,
      game: props.cell.game
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpened : nextProps.cell.isOpened,
      hasMine : nextProps.cell.hasMine,
      hasFlag : nextProps.cell.hasFlag,
      count: nextProps.cell.count,
      game: nextProps.cell.game
    });
  };

  open = () =>{
    this.props.open(this.props.cell);
  };

  rightClick = (e) =>{
    e.preventDefault();
    if(!this.state.isOpened){
      this.props.rightClick(this.props.cell);
    }
  };


  render (){
    const{ hasMine, hasFlag, isOpened, game , count} = this.state;


    let cell = () => {
      if (isOpened && game === "start") {
        if(count === 0){
          return(
            <div className='isOpened'>  </div>
          );
        }else{
          return(
            <div className='isOpened'>
              <span className={'number' + count}>
                {count}
              </span>
            </div>
          );
        }
      }else if(isOpened && game === "gameOver") {
      if(hasMine && hasFlag) {
        return (
          <div className='foundMine'><span> X </span></div>
        );
      }else if (hasFlag && !hasMine) {
          return (
            <div className='notFoundMine'><span> X </span></div>
          );
      }else if (hasMine && !hasFlag) {
          return (
            <div className='hasMine'>  </div>
          );
      }else if(!hasFlag && !hasMine && count === 0){
          return(
            <div className='isOpened'>  </div>
          );
      }else if(!hasFlag && !hasMine && count > 0){
          return(
            <div className='isOpened'>
              <span className={'number' + count}>
                {count}
              </span>
            </div>
          );
        }
      }else if (hasFlag) {
        return (
          <div className='hasFlag'>  </div>
        );
      }
    };

    return(
      <td onClick={this.open.bind(this)} onContextMenu={this.rightClick} className='cell'>
        {cell()}
      </td>
    );
  }
}

export default Cell;