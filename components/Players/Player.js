import React, { PropTypes } from 'react'

const Player = ({ name, onRemove, onMoveDown, onMoveUp }) => (
  <li>
    {name}
    <ul className="buttons">
      <li><button className="move-up-button" onClick={onMoveUp}>⬆</button></li>
      <li><button className="move-down-button" onClick={onMoveDown}>⬇</button></li>
      <li><button className="remove-button" onClick={onRemove}>X</button></li>
    </ul>
  </li>
)

Player.propTypes = {
  name: PropTypes.string.isRequired
}

export default Player
