import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { MAX_ROUNDS } from '../../defaults/'

const mapStateToProps = state => ({ players: state.present.players, currentRound: state.present.currentRound, currentPlayerId: state.present.currentPlayerId });

let CurrentState = ({ players, currentRound, currentPlayerId }) => {
  const currentPlayerName = players.find(p=> p.id === currentPlayerId).name;
  return (
    <div>
      <h4>Round {currentRound}/{MAX_ROUNDS}</h4>
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

