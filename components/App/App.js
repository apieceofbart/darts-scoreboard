import React from 'react'
import { connect } from 'react-redux'
import AddPlayer from '../AddPlayer'
import PlayersList from '../Players/PlayersList'
import ScoreTable from '../ScoreTable/ScoreTable'
import HitRecorder from '../HitRecorder/HitRecorder'
import NextPlayerButton from '../NextPlayerButton/NextPlayerButton'
import { startGame } from '../../actions'
import './App.less'

const mapStateToProps = state => ({
  isGameOn: state.isGameOn
});

const mapDispatchToProps = dispatch => ({
  startGame: () => {
    dispatch(startGame())
  }
});

let App = ({ isGameOn, startGame }) => {
  const template = isGameOn ?
  (
    <div>
      <NextPlayerButton />
      <ScoreTable />
      <HitRecorder />
    </div>
  ) :
  (
    <div>
      <AddPlayer />
      <PlayersList />
      <button onClick={startGame}>Start game</button>
    </div>
  );

  return template;
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App
