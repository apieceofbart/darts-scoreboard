import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ rounds: state.present.rounds, players: state.present.players, currentRound: state.present.currentRound, currentPlayerId: state.present.currentPlayerId });

let CurrentState = ({ rounds, players, currentRound, currentPlayerId }) => {
  const currentPlayerName = players.find(p=> p.id === currentPlayerId).name;
  return (
    <div>
      <h4>Round {currentRound}/{rounds}</h4>
      <h3>Current player: {currentPlayerName}</h3>
    </div>
  )

}

CurrentState.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hits: PropTypes.objectOf(PropTypes.number)
  }).isRequired).isRequired,
  currentRound: PropTypes.number.isRequired,
  currentPlayerId: PropTypes.number.isRequired
}

CurrentState = connect(
  mapStateToProps
)(CurrentState)

export default CurrentState

