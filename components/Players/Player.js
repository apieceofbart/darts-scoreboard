import React, { PropTypes } from 'react'

const Player = ({ name }) => (
  <li>{name}</li>
)

Player.propTypes = {
  name: PropTypes.string.isRequired
}

export default Player
