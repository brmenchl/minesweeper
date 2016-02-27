import React, {Component} from 'react'

export default class Scoreboard extends Component {
  render() {
    return (
      <div style={style.scoreboard}>
        <h2>{this.props.cellsLeft + ' cells left'}</h2>
      </div>
    );
  }
}

const style = {
  scoreboard: {
    width: '80vw',
    backgroundColor: 'darkGrey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    margin: 'auto'
  }
};