import React, {Component} from 'react'

import Cell from './Cell';

export default class GridRow extends Component {
  render() {
    return (
      <div className='gridRowContainer' style={style}>
        {this.renderCells()}
      </div>
    );
  }

  renderCells = () => {
    return this.props.cells.map((cell, index) => 
      <Cell
        {...this.props}
        key={index}
        index={this.props.startIndex+index}
        cell={cell}
      />
    );
  }
}

const style = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row'
};