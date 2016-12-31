import React from 'react'
import { connect } from 'react-redux'
import AddPlayer from '../AddPlayer'
import PlayersList from '../Players/PlayersList'
import ScoreTable from '../ScoreTable/ScoreTable'
import HitRecorder from '../HitRecorder/HitRecorder'
import NextPlayerButton from '../NextPlayerButton/NextPlayerButton'
import HitsHistory from '../HitsHistory/HitsHistory'
import UndoRedo from '../UndoRedo/UndoRedo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { changeGameStage } from '../../actions'
import { BEFORE_GAME, DURING_GAME, AFTER_GAME } from '../../defaults/'
import './App.less'

const mapStateToProps = state => ({
  gameStage: state.present.gameStage
});

const mapDispatchToProps = dispatch => ({
  startGame: () => {
    dispatch(changeGameStage(DURING_GAME))
  },
  goToBeforeGame: () => {
    dispatch(changeGameStage(BEFORE_GAME));
    dispatch(UndoActionCreators.clearHistory());
  }
});

let App = ({ gameStage, startGame, goToBeforeGame }) => {
  switch (gameStage) {
    case BEFORE_GAME:
      return (
        <div>
          <AddPlayer />
          <PlayersList />
          <button onClick={startGame}>Start game</button>
        </div>
      );
    case DURING_GAME:
      return (
        <div>
          <NextPlayerButton />
          <ScoreTable />
          <HitRecorder />
          <HitsHistory />
          <UndoRedo />
        </div>
      );
    case AFTER_GAME:
      return (
        <div>
          <h1>Game is over!</h1>
          <button onClick={goToBeforeGame}>New game</button>
        </div>
      );
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App
