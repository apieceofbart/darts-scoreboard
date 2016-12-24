import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeScore } from '../../actions'

const mapDispatchToProps = dispatch => ({
  onChangePlayerScore: (playerId, score) => {
    dispatch(changeScore(playerId, score));
  }
});

let ScoreChanger = ({ onChangePlayerScore }) => {
  let playerId, score;

  const onSubmit = e => {
    e.preventDefault();
    onChangePlayerScore(parseInt(playerId.value), parseInt(score.value));
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="playerId">ID: <input ref={n => playerId = n } name="playerId" type="number" defaultValue={0} /></label>
      <label htmlFor="score">Score: <input ref={n => score = n} name="score" type="number" defaultValue={50} /></label>
      <button type="submit">Change Score</button>
    </form>
  )

}


ScoreChanger = connect(
  null,
  mapDispatchToProps
)(ScoreChanger)

export default ScoreChanger

