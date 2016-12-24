import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { recordHit } from '../../actions'

const mapDispatchToProps = dispatch => ({
  onHitRecorded: (playerId, hit) => {
    dispatch(recordHit(playerId, hit));
  }
});

let HitRecorder = ({ onHitRecorded }) => {
  let playerId, hit;

  const onSubmit = e => {
    e.preventDefault();
    onHitRecorded(parseInt(playerId.value), parseInt(hit.value));
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="playerId">Player ID: <input ref={n => playerId = n } name="playerId" type="number" defaultValue={0} min={0} /></label>
      <label htmlFor="hit">Number hit: <input ref={n => hit = n} name="hit" type="number" defaultValue={20} min={15} max={25}/></label>
      <button type="submit">Record Hit</button>
    </form>
  )

}


HitRecorder = connect(
  null,
  mapDispatchToProps
)(HitRecorder)

export default HitRecorder

