import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { recordHit } from '../../actions'

const mapStateToProps = state => ({
  currentPlayerId: state.present.currentPlayerId
});

const mapDispatchToProps = dispatch => ({
  onHitRecorded: (playerId, hit, multiplier) => {
    dispatch(recordHit(playerId, hit, multiplier));
  }
});

let HitRecorder = ({ onHitRecorded, currentPlayerId }) => {
  let playerId, hit, multiplier;

  const onSubmit = e => {
    e.preventDefault();
    onHitRecorded(currentPlayerId, parseInt(hit.value), parseInt(multiplier.value));
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="hit">Number hit: <input ref={n => hit = n} name="hit" type="number" defaultValue={20} min={15} max={25}/></label>
      <label htmlFor="multiplier">multiplier: <input ref={n => multiplier = n} name="multiplier" type="number" defaultValue={1} min={1} max={3}/></label>
      <button type="submit">Record Hit</button>
    </form>
  )

}


HitRecorder = connect(
  mapStateToProps,
  mapDispatchToProps
)(HitRecorder)

export default HitRecorder

