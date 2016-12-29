import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { nextPlayer } from '../../actions'
// import './NextPlayerButton.less'

const mapStateToProps = state => ({ players: state.players, currentPlayerId: state.currentPlayerId });
const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(nextPlayer());
  }
});

let NextPlayerButton = ({ players, currentPlayerId, onClick }) => {
  const currentPlayerName = players.find(p=> p.id === currentPlayerId).name;
  return (
    <div>
      <h3>Current player: {currentPlayerName}</h3>
      <button onClick={onClick}>Next Player</button>
    </div>
  )

}

NextPlayerButton.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hits: PropTypes.objectOf(PropTypes.number)
  }).isRequired).isRequired,
  currentPlayerId: PropTypes.number.isRequired
}

NextPlayerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(NextPlayerButton)

export default NextPlayerButton

