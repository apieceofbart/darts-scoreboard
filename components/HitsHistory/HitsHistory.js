import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ lastHit, players }) => ({
  lastHit,
  players
})

let HitsHistory = ({ lastHit, players }) => {
  const lastHitPlayer = players.find(p => p.id === lastHit.id);
  const lastHitPlayerName = lastHitPlayer ? lastHitPlayer.name : '';

  return (
    <div>
      <h3>{lastHit.hit}</h3>
     <h4>{lastHitPlayerName}</h4>
    </div>
  )
}

HitsHistory = connect(
  mapStateToProps
)(HitsHistory)

export default HitsHistory
