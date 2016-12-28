import { ADD_PLAYER, REMOVE_PLAYER, EDIT_PLAYER, CHANGE_SCORE, RECORD_HIT, MOVE_PLAYER_UP, MOVE_PLAYER_DOWN } from '../actions'
import { hits } from '../defaults/'

const isPlayerFirst = (players, player) => players.indexOf(player) === 0;

const isPlayerLast = (players, player) => players.indexOf(player) === players.length -1;

const moveDown = (players, player) => {
  const playerId = players.indexOf(player);

  return [...players.slice(0, playerId), players[playerId+1], players[playerId], ...players.slice(playerId+2)];
}

const moveUp = (players, player) => {
  const playerId = players.indexOf(player);

  return [...players.slice(0, playerId - 1), players[playerId], players[playerId-1], ...players.slice(playerId+1)];
}

const updateHits = (hits, currentHit) => {
  if (typeof hits[currentHit] === 'number') {
    return {...hits, [currentHit]: hits[currentHit] + 1};
  }
  return hits;
}

const hasPlayerClosed = (hits, number) => {
  return hits[number] >= 3;
}


const updateScores = (player, hit, players) => {
  if (hasPlayerClosed(player.hits, hit)) {
    const extraHits = player.hits[hit] - 3;
    return players.map(p => {
      if (!hasPlayerClosed(p.hits, hit) && p !== player){
        p.score += hit;
      }
      return p;
    })
  }
  return players;
}

const main = (state = {}, action) => {
  const updatedPlayers = players(state.players, action);
  switch (action.type) {
    case REMOVE_PLAYER:
    case MOVE_PLAYER_UP:
    case MOVE_PLAYER_DOWN:
      const currentPlayerId = updatedPlayers[0].id;
      return {...state, players: updatedPlayers, currentPlayerId};
    default:
      return {...state, players: updatedPlayers}
  }
}

const players = (players = [], action) => {
  const currentPlayer = players.filter(player => player.id === action.id)[0];
  switch (action.type) {
    case ADD_PLAYER:
      return [
        ...players,
        {
          name: action.name,
          id: action.id,
          score: 0,
          hits
        }
      ]
    case REMOVE_PLAYER:
      return players.filter(player => player.id !== action.id);
    case EDIT_PLAYER:
      return players.map(player => {
        if (player.id === action.id) {
          return { ...player, name: action.name }
        }
        return player;
      })
    case CHANGE_SCORE:
      return players.map(player => {
        if (player.id === action.id) {
          return { ...player, score: action.score }
        }
        return player;
      })
    case RECORD_HIT:
      const playersAfterHitRecorded  = players.map(player => {
        if (player.id === action.id) {
          const hits = updateHits(player.hits, action.hit);
          return {...player, hits};
        }
        return player;
      });
      return updateScores(currentPlayer, action.hit, playersAfterHitRecorded);
    case MOVE_PLAYER_UP:
      if (!isPlayerFirst(players, currentPlayer)) {
        return moveUp(players, currentPlayer);
      }
      return players;
    case MOVE_PLAYER_DOWN:
      if (!isPlayerLast(players, currentPlayer)) {
        return moveDown(players, currentPlayer);
      }
    default:
      return players
  }
}

const dartsApp = main;

export default dartsApp
