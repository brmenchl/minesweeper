import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from '../redux/actions';

import Grid from '../components/Grid';
import GameStateOverlay from '../components/GameStateOverlay';
import Scoreboard from '../components/Scoreboard';

function mapStateToProps(state) {
  return {
    cells: state.grid.cells,
    width: state.grid.width,
    gameState: state.grid.gameState,
    cellsLeft: state.grid.cellsLeft
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

class App extends Component {
  render() {
    return (
      <div className="applicationContainer">
        <GameStateOverlay gameState={this.props.gameState}/>
        <Grid {...this.props}/>
        <Scoreboard cellsLeft={this.props.cellsLeft} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);