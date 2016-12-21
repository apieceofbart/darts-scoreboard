import React, { PropTypes } from 'react'
import './Player.css'

const Player = ({ name }) => (
  <li>{name}</li>
)

Player.propTypes = {
  name: PropTypes.string.isRequired
}

export default Player
