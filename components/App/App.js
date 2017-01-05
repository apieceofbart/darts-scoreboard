import React from 'react'
import { connect } from 'react-redux'
import AddPlayer from '../AddPlayer'
import PlayersList from '../Players/PlayersList'
import ScoreTable from '../ScoreTable/ScoreTable'
import HitRecorder from '../HitRecorder/HitRecorder'
import NextPlayerButton from '../NextPlayerButton/NextPlayerButton'
import HitsHistory from '../HitsHistory/HitsHistory'
import UndoRedo from '../UndoRedo/UndoRedo'
import CurrentState from '../CurrentState/CurrentState'
import RoundsInput from '../RoundsInput/RoundsInput'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { changeGameStage } from '../../actions'
import { BEFORE_GAME, DURING_GAME, AFTER_GAME } from '../../defaults/'
import './App.less'

const mapStateToProps = state => ({
  gameStage: state.present.gameStage,
  winner: state.present.winner
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

let App = ({ gameStage, startGame, goToBeforeGame, winner }) => {
  switch (gameStage) {
    case BEFORE_GAME:
      return (
        <div>
          <AddPlayer />
          <PlayersList />
          <RoundsInput />
          <button onClick={startGame}>Start game</button>
        </div>
      );
    case DURING_GAME:
      return (
        <div>
          <CurrentState />
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
          <h1>The winner is {winner.name}!</h1>
          <ScoreTable />
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
