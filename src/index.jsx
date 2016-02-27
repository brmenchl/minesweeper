import React, {Component} from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './containers/App';
import reducer from './redux/reducer';

import {DEFAULT_STATE, LOSE_GAME_STATE, PLAYING_GAME_STATE} from './redux/grid';

const initialState = {
  // grid: {
  //   cells: [
  //     {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
  //     {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
  //     {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
  //     {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
  //     {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 2},
  //     {hasBomb: true, state: DEFAULT_STATE},
  //     {hasBomb: true, state: DEFAULT_STATE},
  //     {hasBomb: true, state: DEFAULT_STATE},
  //     {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 2}
  //   ],
  //   width: 3,
  //   gameState: PLAYING_GAME_STATE,
  //   cellsLeft: 6
  // }
}

function configureStore(initialState) {
  const store = createStore(reducer, initialState, 
    window.devToolsExtension ? window.devToolsExtension() : undefined
  );
  return store;
}

render(
  <Provider store={configureStore(initialState)}>
    <App/>
  </Provider>,
  document.getElementById('app')
);