import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { nextPlayer } from '../../actions'
// import './NextPlayerButton.less

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch(nextPlayer());
  }
});

let NextPlayerButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>Next Player</button>
  )

}

NextPlayerButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

NextPlayerButton = connect(
  null,
  mapDispatchToProps
)(NextPlayerButton)

export default NextPlayerButton

