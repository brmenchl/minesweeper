import React, {Component} from 'react'

import {
  DEFAULT_STATE,
  FLAGGED_STATE,
  CLICKED_STATE
} from '../redux/grid';

        // {this.props.cell.hasBomb ? 'X' : this.props.cell.adjacentBombs} //for debugging


export default class Cell extends Component {
  render() {
    return (
      <div className='cellContainer' style={style.cellContainer}>
        {this.renderCellContents()}
      </div>
    );
  }

  renderCellContents = () => {
    switch(this.props.cell.state) {
      case DEFAULT_STATE:
      return this.renderDefaultCell();
      case FLAGGED_STATE:
      return this.renderFlaggedCell();
      case CLICKED_STATE:
      return this.renderClickedCell();
    }
  };

  renderDefaultCell = () => {
    return (
      <div
        style={style.defaultCellContents}
        onClick={this.clickHandler.bind(null, CLICKED_STATE)}
        onContextMenu={this.clickHandler.bind(null, FLAGGED_STATE)}
      ></div>
    );
  };

  renderFlaggedCell = () => {
    return (
      <div
        style={style.flaggedCellContents}
        onClick={this.clickHandler.bind(null, CLICKED_STATE)}
        onContextMenu={this.clickHandler.bind(null, FLAGGED_STATE)}
      >
        &#x2691;
      </div>);
  };

  renderClickedCell = () => {
    return (
      <div
        style={style.clickedCellContents}
        onClick={this.clickHandler.bind(null, CLICKED_STATE)}
        onContextMenu={this.clickHandler.bind(null, FLAGGED_STATE)}        
      >
        {(this.props.cell.hasBomb) ? '\u2620' : this.props.cell.adjacentBombs || ''}
      </div>
    );
  };

  clickHandler = (state, e) => {
    e.preventDefault();
    console.log(state, arguments);
    const newState = (this.props.cell.state === DEFAULT_STATE) ? state : DEFAULT_STATE;
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
  defaultCellContents: {
    flex: 1,
    backgroundColor: 'darkGrey'
  },
  clickedCellContents: {
    flex: 1,
    backgroundColor: 'lightGrey'
  },
  flaggedCellContents: {
    flex: 1,
    backgroundColor: 'darkGrey'
  },
}