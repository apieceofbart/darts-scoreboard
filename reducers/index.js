import { combineReducers } from 'redux'
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

function players(state = [], action) {
  const currentPlayer = state.filter(player => player.id === action.id)[0];
  switch (action.type) {
    case ADD_PLAYER:
      return [
        ...state,
        {
          name: action.name,
          id: action.id,
          score: 0,
          hits
        }
      ]
    case REMOVE_PLAYER:
      return state.filter(player => player.id !== action.id);
    case EDIT_PLAYER:
      return state.map(player => {
        if (player.id === action.id) {
          return { ...player, name: action.name }
        }
        return player;
      })
    case CHANGE_SCORE:
      return state.map(player => {
        if (player.id === action.id) {
          return { ...player, score: action.score }
        }
        return player;
      })
    case RECORD_HIT:
      const stateAfterHitRecorded  = state.map(player => {
        if (player.id === action.id) {
          const hits = updateHits(player.hits, action.hit);
          return {...player, hits};
        }
        return player;
      });
      return updateScores(currentPlayer, action.hit, stateAfterHitRecorded);
    case MOVE_PLAYER_UP:
      if (!isPlayerFirst(state, currentPlayer)) {
        return moveUp(state, currentPlayer);
      }
      return state;
    case MOVE_PLAYER_DOWN:
      if (!isPlayerLast(state, currentPlayer)) {
        return moveDown(state, currentPlayer);
      }
    default:
      return state
  }
}

const dartsApp = combineReducers({
  players
})

export default dartsApp
