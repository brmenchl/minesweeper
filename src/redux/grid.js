export const SET_BOMBS = 'set_bombs';
export const SET_CELLS = 'set_cells';
export const SET_CELL_STATE = 'set_cell_state';

export const DEFAULT_STATE = 0;
export const FLAGGED_STATE = 1;
export const CLICKED_STATE = 2;

export const LOSE_GAME_STATE = 'LOSE_GAME';
export const PLAYING_GAME_STATE = 'PLAYING_GAME';
export const WIN_GAME_STATE = 'WIN_GAME';

const DEFAULT_CELL = {hasBomb: false, state: DEFAULT_STATE, adjacentBombs: 0};

function getAdjacentBombs(index, bombs, width) {
  let adjacentBombCount = 0;
  if(index >= width &&
    bombs.indexOf(index - width) !== -1)
  { // up
    adjacentBombCount++;
  }
  if(index < (Math.pow(width,2) - width) &&
    bombs.indexOf(index + width) !== -1)
  { // down
    adjacentBombCount++;
  }
  if(index > 0 &&
    index % width !== 0 &&
    bombs.indexOf(index - 1) !== -1)
  { // left
    adjacentBombCount++;
  }
  if(index < (Math.pow(width,2) - 1) && 
    (index+1) % width !== 0 && 
    bombs.indexOf(index + 1) !== -1) 
  { // right
    adjacentBombCount++;
  }
  return adjacentBombCount;
}

function clickAdjacentUnBombed(cells, index, width) {
  let stack = [index];
  let newCells = cells.slice(0);
  while(stack.length > 0) {
    let cellIndex = stack.pop();
    newCells[cellIndex].state = CLICKED_STATE;
    if(cellIndex >= width && 
      !newCells[cellIndex - width].hasBomb &&
      !newCells[cellIndex - width].state === CLICKED_STATE) { // up   
      stack.push(cellIndex - width); 
    }
    if(cellIndex < (Math.pow(width,2) - width) &&
      !newCells[cellIndex + width].hasBomb &&
      !(newCells[cellIndex + width].state === CLICKED_STATE)) { // down  
      stack.push(cellIndex + width); 
    }
    if(cellIndex > 0 && cellIndex % width !== 0 &&
      !newCells[cellIndex - 1].hasBomb &&
      !(newCells[cellIndex - 1].state === CLICKED_STATE)) { // left 
      stack.push(cellIndex - 1); 
    }
    if(cellIndex < (Math.pow(width,2) - 1) &&
      (cellIndex + 1) % width !== 0 &&
      !newCells[cellIndex + 1].hasBomb &&
      !(newCells[cellIndex + 1].state === CLICKED_STATE)) { // right 
      stack.push(cellIndex + 1); 
    }
  }
  return newCells;
}

function loseGameState(state) {
  return {
    ...state,
    cells: state.cells.map(cell => {
      return {...cell, state: CLICKED_STATE}
    }),
    gameState: LOSE_GAME_STATE
  }
}

function winGameState(state) {
  return {
    ...state,
    cells: state.cells.map(cell => {
      return {...cell, state: CLICKED_STATE}
    }),
    gameState: WIN_GAME_STATE,
    cellsLeft: 0
  }
}

export default function reducer(state = {cells: [], gameState: PLAYING_GAME_STATE}, {type, payload}) {
  let newCells;
  switch(type) {
    case SET_CELLS:
    newCells = [];
    for(let i = 0; i < (Math.pow(payload.width, 2)); i++) newCells[i] = DEFAULT_CELL;
    return {
      ...state,
      width: payload.width,
      cells: newCells,
      cellsLeft: newCells.length
    };

    case SET_BOMBS:
    newCells = state.cells.map((cell, index) => {
      return {
        ...cell,
        hasBomb: payload.cells.indexOf(index) !== -1,
        adjacentBombs: getAdjacentBombs(index, payload.cells, state.width)
      };
    });
    return {
      ...state,
      cells: newCells,
      cellsLeft: newCells.length - payload.cells.length
    }

    case SET_CELL_STATE:
    newCells = state.cells.slice(0);
    let newCellsLeft = state.cellsLeft;

    if(payload.state === CLICKED_STATE) {
      if(newCells[payload.index].hasBomb) return loseGameState(state);
      newCellsLeft--;
      if(newCellsLeft === 0) return winGameState(state);
      newCells = clickAdjacentUnBombed(newCells, payload.index, state.width);
    }

    newCells[payload.index].state = payload.state;

    return {
      ...state,
      cells: newCells,
      gameState: PLAYING_GAME_STATE,
      cellsLeft: newCells.reduce((prev,curr) => (curr.state !== CLICKED_STATE && !curr.hasBomb) ? prev+1: prev,0)
    };

    default:
    return state;    
  }
}


export function setCells(width) {
  return {type: SET_CELLS, payload: {width}};
}

export function setBombs(cells) {
  return {type: SET_BOMBS, payload: {cells}};
}

export function setCellState(index, state) {
  return {type: SET_CELL_STATE, payload: {index, state}}
}