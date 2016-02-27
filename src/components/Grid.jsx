import React, {Component} from 'react'

import GridRow from './GridRow';

export default class Grid extends Component {

  componentDidMount() {
    this.props.setCells(3);
    this.props.setBombs([5,6,7]);
  }

  render() {
    return (
      <div className='gridContainer' style={style}>
        {this.renderRows()}
      </div>
    );
  }

  renderRows = () => {
    const {cells, width} = this.props
    let rows = [];
    for(let i = 0; i < width; i++) {
      const start = i * width;
      rows.push(
        <GridRow 
          {...this.props}
          key={i}
          startIndex={start}
          cells={cells.slice(start, start + width)}
        />);
    }
    return rows;
  };
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '80vw',
  height: '30vw',
  margin: 'auto'
};