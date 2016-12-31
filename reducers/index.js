import undoable, { excludeAction } from 'redux-undo'
import { ADD_PLAYER, REMOVE_PLAYER, EDIT_PLAYER, CHANGE_SCORE, RECORD_HIT, MOVE_PLAYER_UP, MOVE_PLAYER_DOWN, NEXT_PLAYER, CHANGE_GAME_STAGE } from '../actions'
import { hits, BEFORE_GAME, DURING_GAME, AFTER_GAME, initialStore } from '../defaults/'

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

const isValidHit = (hits, currentHit) => {
  return typeof hits[currentHit] === 'number';
}

const isGameOver = (players) => {
  for (let i = 0; i < players.length; i++) {
    if (Object.keys(players[i].hits).filter(h => players[i].hits[h] < 3).length === 0) return true
  }
  return false;
}

const updateHits = (hits, currentHit, multiplier) => {
  if (isValidHit(hits, currentHit)) {
    return {...hits, [currentHit]: hits[currentHit] + multiplier};
  }
  return hits;
}

const hasPlayerClosed = (hits, number) => {
  return hits[number] >= 3;
}


const updateScores = (player, hit, multiplier, players) => {
  if (hasPlayerClosed(player.hits, hit)) {
    const extraHits = player.hits[hit] - 3;
    return players.map(p => {
      let score = p.score;
      if (!hasPlayerClosed(p.hits, hit) && p !== player){
        score += hit * multiplier;
      }
      return {...p, score};
    })
  }
  return players;
}

const getCurrentPlayer = (players, curentPlayerId) => {
  return players.find(player => player.id === curentPlayerId);
}

function main(state = initialStore.present, action) {
  const updatedPlayers = players(state.players, action);
  let currentPlayerId = updatedPlayers[0].id;
  switch (action.type) {
    case CHANGE_GAME_STAGE:
      if(action.stage === BEFORE_GAME) return initialStore.present;
      return {...state, players: updatedPlayers, gameStage: action.stage }
    case REMOVE_PLAYER:
    case MOVE_PLAYER_UP:
    case MOVE_PLAYER_DOWN:
      return {...state, players: updatedPlayers, currentPlayerId};
    case RECORD_HIT:
      if (!isValidHit(hits, action.hit)) return state;
      const newGameStage =  isGameOver(updatedPlayers) ? AFTER_GAME : DURING_GAME;

      return {...state, players: updatedPlayers, lastHit: action, gameStage: newGameStage}
    case NEXT_PLAYER:
      const players = state.players;
      const currentPlayer = getCurrentPlayer(state.players, state.currentPlayerId);
      const indexOfPlayer = players.indexOf(currentPlayer);
      const newCurrentPlayerId = (indexOfPlayer === players.length - 1) ? 0 : indexOfPlayer + 1;
      currentPlayerId = players[newCurrentPlayerId].id;
      return {...state, currentPlayerId}
    default:
      return {...state, players: updatedPlayers}
  }
}

function players(players = [], action) {
  const currentPlayer = players.find(player => player.id === action.id);
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
          return {...player, score: action.score }
        }
        return player;
      })
    case RECORD_HIT:
      const playersAfterHitRecorded  = players.map(player => {
        if (player.id === action.id) {
          const hits = updateHits(player.hits, action.hit, action.multiplier);
          return {...player, hits};
        }
        return player;
      });
      return updateScores(currentPlayer, action.hit, action.multiplier, playersAfterHitRecorded);
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

const dartsApp = undoable(main, {
  filter: function filterActions(action, currentState, previousHistory) {
    if (action.type === ADD_PLAYER ||
      (action.type === CHANGE_GAME_STAGE && action.stage === DURING_GAME)
    ) {
      return false;
    }
    return true;
  }
});

export default dartsApp
