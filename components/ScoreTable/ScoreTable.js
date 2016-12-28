import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ players: state.players });

let ScoreTable = ({ players }) => {
  const tableHeader = (
    <tr>
      <th key="player">Player</th>
      <th key="score">Score</th>
      {Object.keys(players[0].hits).reverse().map(h=> <th key={h}>{h}</th>)}
    </tr>
  )
  const tableBody = players.map(player => {
    const playerHits = Object.keys(player.hits).reverse().map(hit => {
      const shownHits = Math.min(player.hits[hit],3);
      return <td key={hit}>{shownHits}</td>;
    });

    return (
      <tr key={player.id}>
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

