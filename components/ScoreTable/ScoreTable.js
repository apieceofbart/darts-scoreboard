import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import './ScoreTable.less'

const mapStateToProps = state => ({ players: state.present.players, currentPlayerId: state.present.currentPlayerId });

let ScoreTable = ({ players, currentPlayerId }) => {
  const hits = Object.keys(players[0].hits).reverse().map(h=> <th key={h}>{h}</th>);
  const tableHeader = (
    <tr>
      <th key="player">Player</th>
      <th key="score">Score</th>
      {hits}
    </tr>
  )
  const tableBody = players.map(player => {
    const playerHits = Object.keys(player.hits).reverse().map(hit => {
      const shownHits = Math.min(player.hits[hit],3);
      return <td key={hit}>{shownHits}</td>;
    });

    const highlight = (player.id === currentPlayerId) ? 'highlight' : '';

    return (
      <tr key={player.id} className={highlight}>
        <td key="name">
          {player.name}
        </td>
        <td key="score">
          {player.score}
        </td>
        {playerHits}
      </tr>
    )
  });

  return (
    <table>
      <thead>
        {tableHeader}
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  )

}

ScoreTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    hits: PropTypes.objectOf(PropTypes.number)
  }).isRequired).isRequired
}

ScoreTable = connect(
  mapStateToProps
)(ScoreTable)

export default ScoreTable

