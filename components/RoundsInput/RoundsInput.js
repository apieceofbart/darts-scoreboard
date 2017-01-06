import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateRounds } from '../../actions'

const mapDispatchToProps = dispatch => ({
  onChange: e => {
    dispatch(updateRounds(parseInt(e.target.value)));
  }
});

const mapStateToProps = state => ({ rounds: state.present.rounds })

let RoundsInput = ({ onChange, rounds }) => {
  return (
    <label htmlFor="rounds">Number of rounds:
      <input name="rounds" type="number" defaultValue = {rounds} onChange={onChange}/>
    </label>
  )

}

RoundsInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  rounds: PropTypes.number.isRequired
}

RoundsInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoundsInput)

export default RoundsInput

