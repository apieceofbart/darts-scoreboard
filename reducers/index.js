import { combineReducers } from 'redux'
import { ADD_PLAYER, REMOVE_PLAYER, EDIT_PLAYER, CHANGE_SCORE } from '../actions'

function players(state = [], action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [
        ...state,
        {
          name: action.name,
          id: action.id
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
    default:
      return state
  }
}

const dartsApp = combineReducers({
  players
})

export default dartsApp
