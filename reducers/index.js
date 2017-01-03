import undoable, { excludeAction } from 'redux-undo'
import { ADD_PLAYER, REMOVE_PLAYER, EDIT_PLAYER, CHANGE_SCORE, RECORD_HIT, MOVE_PLAYER_UP, MOVE_PLAYER_DOWN, NEXT_PLAYER, CHANGE_GAME_STAGE } from '../actions'
import { hits, BEFORE_GAME, DURING_GAME, AFTER_GAME, MAX_ROUNDS, initialStore } from '../defaults/'

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

const hasPlayerClosedAll = player => Object.keys(player.hits).filter(h => player.hits[h] < 3).length === 0;

const hasLeastPoints = (player, players) => {
  return player === players.find(p => p.score === Math.min(...players.map(p => p.score)));
}

const calculateFinalScores = players =>
  players.map(player => {
    const penalty = Object.keys(player.hits).reduce((a,b) => a + (3 - Math.min(3,player.hits[b]))*b, 0);

    return {...player, score: player.score + penalty}
  });

const calculateWinner = players => {
  if (getWinnerBeforeEnd(players)) return getWinnerBeforeEnd(players);
  return players.find(player => player.score === Math.min(...players.map(p => p.score)));
}

const getWinnerBeforeEnd = players => {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (hasPlayerClosedAll(player) && hasLeastPoints(player, players)) return player
  }
  return null;
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
  const currPlayer = updatedPlayers[0];

  let currentPlayerId = currPlayer.id;
  switch (action.type) {
    case CHANGE_GAME_STAGE:
      if (action.stage === BEFORE_GAME) return initialStore.present;
      const winner = (action.stage === AFTER_GAME) ? calculateWinner(updatedPlayers) : null;
      return {...state, players: updatedPlayers, gameStage: action.stage, winner }
    case REMOVE_PLAYER:
    case MOVE_PLAYER_UP:
    case MOVE_PLAYER_DOWN:
      return {...state, players: updatedPlayers, currentPlayerId};
    case RECORD_HIT:
      if (!isValidHit(hits, action.hit)) return state;
      const w = getWinnerBeforeEnd(updatedPlayers);
      const newGameStage =  w ? AFTER_GAME : DURING_GAME;

      return {...state, players: updatedPlayers, lastHit: action, gameStage: newGameStage, winner: w}
    case NEXT_PLAYER:
      const players = state.players;
      const currentPlayer = getCurrentPlayer(state.players, state.currentPlayerId);
      const indexOfPlayer = players.indexOf(currentPlayer);
      const [ newCurrentPlayerId, newCurrentRound ] = (indexOfPlayer === players.length - 1) ? [0, state.currentRound + 1] : [indexOfPlayer + 1, state.currentRound ];
      currentPlayerId = players[newCurrentPlayerId].id;
      if (newCurrentRound > MAX_ROUNDS) {
        const newPlayers = calculateFinalScores(state.players);
        const calculatedWinner = calculateWinner(newPlayers);
        return {...state, players: newPlayers, winner: calculatedWinner, currentPlayerId: calculatedWinner.id, gameStage: AFTER_GAME }
      } else {
        return {...state, currentPlayerId, currentRound: newCurrentRound}
      }
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
      previousHistory.present.gameStage === AFTER_GAME ||
      previousHistory.present.gameStage === BEFORE_GAME
    ) {
      return false;
    }
    return true;
  }
});

export default dartsApp
