import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const multipliersNames = {
  1: 'SINGLE',
  2: 'DOUBLE',
  3: 'TRIPLE'
}

const mapStateToProps = state => ({
  lastHit: state.present.lastHit,
  players: state.present.players
})

let HitsHistory = ({ lastHit, players }) => {
  const lastHitPlayer = players.find(p => p.id === lastHit.id);
  const lastHitPlayerName = lastHitPlayer ? lastHitPlayer.name : '';

  return (
    <div>
      <h6>{multipliersNames[lastHit.multiplier]}</h6>
      <h3>{lastHit.hit}</h3>
     <h4>{lastHitPlayerName}</h4>
    </div>
  )
}

HitsHistory = connect(
  mapStateToProps
)(HitsHistory)

export default HitsHistory
