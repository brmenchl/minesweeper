import React, {Component} from 'react'

import {
  DEFAULT_STATE,
  FLAGGED_STATE,
  CLICKED_STATE
} from '../redux/grid';

export default class Cell extends Component {
  render() {
    return (
      <div className='cellContainer' style={style.cellContainer}>
        {this.renderCell()}
      </div>
    );
  }

  renderCell = () => {
    return (
      <div
        style={this.styleCell()}
        onClick={this.clickHandler.bind(null, CLICKED_STATE)}
        onContextMenu={this.clickHandler.bind(null, FLAGGED_STATE)}
      >
        {this.renderCellContents()}
      </div>
    );
  };

  renderCellContents = () => {
    const {state, hasBomb, adjacentBombs} = this.props.cell;
    switch(state) {
      case CLICKED_STATE:
      return (hasBomb) ? '\u2620' : (adjacentBombs || '');
      case FLAGGED_STATE:
      return '\u2691';
      default:
      return;
    }
  };

  styleCell = () => {
    switch(this.props.cell.state) {
      case DEFAULT_STATE:
      return style.DEFAULT_STATE;
      case FLAGGED_STATE:
      return style.FLAGGED_STATE;
      case CLICKED_STATE:
      return style.CLICKED_STATE;
    }
  };

  clickHandler = (state, e) => {
    e.preventDefault();
    const newState = (this.props.cell.state === state) ? DEFAULT_STATE : state;
    this.props.setCellState(this.props.index, newState);
  };
}

const style = {
  cellContainer: {
    flex: 1,
    display: 'flex',
    textAlign: 'center',
    border: '1px solid black'
  },
  DEFAULT_STATE: {
    flex: 1,
    backgroundColor: 'darkGrey'
  },
  CLICKED_STATE: {
    flex: 1,
    backgroundColor: 'lightGrey'
  },
  FLAGGED_STATE: {
    flex: 1,
    backgroundColor: 'darkGrey'
  },
}