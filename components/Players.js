import React, { PropTypes } from 'react'
import Player from './Player'

const Players = ({ players }) => {
  const playersList = players.map(player =>
    <Player key={player.id} {...player} />
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
