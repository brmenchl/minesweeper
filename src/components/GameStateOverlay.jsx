import React, {Component} from 'react'

import {PLAYING_GAME_STATE, LOSE_GAME_STATE, WIN_GAME_STATE} from '../redux/grid';

export default class GameStateOverlay extends Component {
  render() {
    if(this.props.gameState !== PLAYING_GAME_STATE) {
      return (
        <div className='gameStateMessageContainer' style={style.overlay}>
          <h1 style={style.message}>{
            this.props.gameState === LOSE_GAME_STATE ? "Game Over" : "YOU WIN!"
        }</h1>
        </div>
      );
    } else return null;
  }
}

const style = {
  overlay: {
    position: 'absolute',
    top:0,
    left:0,
    width: '100%',
    height: '100%',
    zIndex: '1000',
    backgroundColor: 'black',
    opacity: 0.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    color: 'white',
    fontSize: '80px'   
  }
};