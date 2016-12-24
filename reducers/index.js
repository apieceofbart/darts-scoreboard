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
        return player
      })
    case CHANGE_SCORE:
      return state.map(player => {
        if (player.id === action.id) {
          return { ...player, score: action.score }
        }
        return player;
      })
    case RECORD_HIT:
      return state.map(player => {
        if (player.id === action.id) {
          const hitCount = Math.min(player.hits[action.hit] + 1, 3);
          const hits = {...player.hits, [action.hit]: hitCount};
          return {...player, hits};
        }
        return player;
      })
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
