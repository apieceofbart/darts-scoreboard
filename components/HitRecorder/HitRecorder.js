import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { recordHit } from '../../actions'

const mapStateToProps = state => ({
  currentPlayerId: state.currentPlayerId
});

const mapDispatchToProps = dispatch => ({
  onHitRecorded: (playerId, hit) => {
    dispatch(recordHit(playerId, hit));
  }
});

let HitRecorder = ({ onHitRecorded, currentPlayerId }) => {
  let playerId, hit;

  const onSubmit = e => {
    e.preventDefault();
    onHitRecorded(currentPlayerId, parseInt(hit.value));
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="hit">Number hit: <input ref={n => hit = n} name="hit" type="number" defaultValue={20} min={15} max={25}/></label>
      <button type="submit">Record Hit</button>
    </form>
  )

}


HitRecorder = connect(
  mapStateToProps,
  mapDispatchToProps
)(HitRecorder)

export default HitRecorder

