import React, { PropTypes } from 'react'
import Player from './Player'
import './Players.less'

const Players = ({ players, onPlayerRemove, onPlayerMoveUp, onPlayerMoveDown }) => {
  const playersList = players.map(player =>
    <Player key={player.id} {...player}
      onRemove={ e => onPlayerRemove(player.id) }
      onMoveUp={ e => onPlayerMoveUp(player.id) }
      onMoveDown={ e => onPlayerMoveDown(player.id) }
    />
  )

  return (
    <ul>
      {playersList}
    </ul>
  )

}

Players.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Players
