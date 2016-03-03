import chai from 'chai';
const should = chai.should();

import reducer, {
  SET_BOMBS,
  SET_CELLS,
  SET_CELL_STATE,
  DEFAULT_STATE,
  FLAGGED_STATE,
  CLICKED_STATE,
  LOSE_GAME_STATE,
  PLAYING_GAME_STATE,
  WIN_GAME_STATE
} from '../../src/redux/grid';

describe('gridReducer', () => {
  describe('on SET_CELLS', () => {
    it('should set a list of cells with default empty state and set cellsLeft to the total count of cells', () => {
      const state = {cells: []};
      const newState = reducer(state, {type: SET_CELLS, payload: {width: 3}});
      newState.should.deep.equal({
        cells: [
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},        
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0},
          {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0}
        ],
        width: 3,
        cellsLeft: 9
      });
    });
  });

  describe('on SET_BOMBS', () => {
    it('should flag cells as hasBomb', () => {
      const state = {
        cells: [
          {hasBomb: false},
          {hasBomb: false},
          {hasBomb: false},
          {hasBomb: false}
        ],
        width: 2
      };
      const newState = reducer(state, {type: SET_BOMBS, payload: {cells:[0,2]}});
      newState.should.deep.equal({
        cells: [
          {hasBomb: true, adjacentBombs: 1},
          {hasBomb: false, adjacentBombs: 1},
          {hasBomb: true, adjacentBombs: 1},
          {hasBomb: false, adjacentBombs: 1}
        ],
        width: 2,
        cellsLeft: 2
      });
    });

    it('should update adjacentBombs on each non-bombed cell', () => {
      const state = {cells: [{}, {}, {}, {}, {}, {}, {}, {}, {}], width: 3};
      const newState = reducer(state, {type: SET_BOMBS, payload: {cells:[5,6,7]}});
      newState.should.deep.equal({
        cells: [
          {hasBomb: false, adjacentBombs: 0},  // 0 0 1
          {hasBomb: false, adjacentBombs: 0},  // 1 2 X
          {hasBomb: false, adjacentBombs: 1},  // X X 2
          {hasBomb: false, adjacentBombs: 1},
          {hasBomb: false, adjacentBombs: 2},
          {hasBomb: true, adjacentBombs: 0},
          {hasBomb: true, adjacentBombs: 1},
          {hasBomb: true, adjacentBombs: 1},
          {hasBomb: false, adjacentBombs: 2}
        ],
        width: 3,
        cellsLeft: 6
      });      
    });
    it('should set cellsLeft field to number of non-bombed cells', () => {
      const state = {cells: [{}, {}, {}, {}, {}, {}, {}, {}, {}], width: 3};
      const newState = reducer(state, {type: SET_BOMBS, payload: {cells:[5,6,7]}});
      newState.should.deep.equal({
        cells: [
          {hasBomb: false, adjacentBombs: 0},  // 0 0 1
          {hasBomb: false, adjacentBombs: 0},  // 1 2 X
          {hasBomb: false, adjacentBombs: 1},  // X X 2
          {hasBomb: false, adjacentBombs: 1},
          {hasBomb: false, adjacentBombs: 2},
          {hasBomb: true, adjacentBombs: 0},
          {hasBomb: true, adjacentBombs: 1},
          {hasBomb: true, adjacentBombs: 1},
          {hasBomb: false, adjacentBombs: 2}
        ],
        width: 3,
        cellsLeft: 6
      });       
    });
  });

  describe('on SET_CELL_STATE', () => {
    describe('for state FLAGGED_STATE', () => {
      it('should set the state of the cell as flagged', () => {
        const state = {
          cells: [
            {state: DEFAULT_STATE},
            {state: DEFAULT_STATE}
          ],
          cellsLeft: 2
        };
        const newState = reducer(state, {type: SET_CELL_STATE, payload: {index: 1, state: FLAGGED_STATE}});
        newState.should.deep.equal({
          cells: [
            {state: DEFAULT_STATE},
            {state: FLAGGED_STATE}
          ],
          gameState: PLAYING_GAME_STATE,
          cellsLeft: 2
        });
      });
    });
    describe('for state DEFAULT_STATE', () => {
      it('should set the state of the cell as default', () => {
        const state = {
          cells: [
            {state: FLAGGED_STATE},
            {state: FLAGGED_STATE}
          ],
          cellsLeft: 2
        };
        const newState = reducer(state, {type: SET_CELL_STATE, payload: {index: 1, state: DEFAULT_STATE}});
        newState.should.deep.equal({
          cells: [
            {state: FLAGGED_STATE},
            {state: DEFAULT_STATE}
          ],
          gameState: PLAYING_GAME_STATE,
          cellsLeft: 2
        });
      });
    });
    describe('for state CLICKED_STATE', () => {
      it('should set gameState to lose and set all cells to CLICKED_STATE if hasBomb is true', () => {
        const state = {
          cells: [
            {hasBomb: true, state: DEFAULT_STATE, adjacentBombs: 0},
            {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
          ],
          cellsLeft: 1
        };
        const newState = reducer(state, {type: SET_CELL_STATE, payload: {index: 0, state: CLICKED_STATE}});
        newState.should.deep.equal({
          cells: [
            {hasBomb: true, state: CLICKED_STATE, adjacentBombs: 0},
            {hasBomb: false, state: CLICKED_STATE, adjacentBombs: 1},
          ],
          gameState: LOSE_GAME_STATE,
          cellsLeft: 1
        });        
      });
      it('should decrement cellsLeft when clicking a non-bombed cell', () => {
        const state = {
          cells: [
            {hasBomb: true, state: DEFAULT_STATE, adjacentBombs: 0},
            {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
            {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
          ],
          cellsLeft: 2
        };
        const newState = reducer(state, {type: SET_CELL_STATE, payload: {index: 1, state: CLICKED_STATE}});
        newState.should.deep.equal({
          cells: [
            {hasBomb: true, state: DEFAULT_STATE, adjacentBombs: 0},
            {hasBomb: false, state: CLICKED_STATE, adjacentBombs: 1},
            {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
          ],
          gameState: PLAYING_GAME_STATE,
          cellsLeft: 1
        });            
      });
      it('should set gameState to win and set all cells to CLICKED_STATE if cellsLeft reaches 0', () => {
        const state = {
          cells: [
            {hasBomb: true, state: DEFAULT_STATE, adjacentBombs: 0},
            {hasBomb: false, state: CLICKED_STATE, adjacentBombs: 1},
            {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 1},
          ],
          cellsLeft: 1
        };
        const newState = reducer(state, {type: SET_CELL_STATE, payload: {index: 2, state: CLICKED_STATE}});
        newState.should.deep.equal({
          cells: [
            {hasBomb: true, state: CLICKED_STATE, adjacentBombs: 0},
            {hasBomb: false, state: CLICKED_STATE, adjacentBombs: 1},
            {hasBomb: false, state: CLICKED_STATE, adjacentBombs: 1},
          ],
          gameState: WIN_GAME_STATE,
          cellsLeft: 0
        }); 
      });
    });
  });
});