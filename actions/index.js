export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const EDIT_PLAYER = 'EDIT_PLAYER';
export const CHANGE_SCORE = 'CHANGE_SCORE';
export const RECORD_HIT = 'RECORD_HIT';
export const MOVE_PLAYER_UP = 'MOVE_PLAYER_UP';
export const MOVE_PLAYER_DOWN = 'MOVE_PLAYER_DOWN';
export const NEXT_PLAYER = 'NEXT_PLAYER';
export const CHANGE_GAME_STAGE = 'CHANGE_GAME_STAGE';
export const UPDATE_ROUNDS = 'UPDATE_ROUNDS';
import { initialStore } from '../defaults/'

let nextPlayerId = initialStore.present.players.length || 0;

export function addPlayer(name) {
  return {
    type: ADD_PLAYER,
    id: nextPlayerId++,
    name
  }
};

export function removePlayer(id) {
  return {
    type: REMOVE_PLAYER,
    id
  }
};

export function editPlayer(id, name) {
  return {
    type: EDIT_PLAYER,
    id,
    name
  }
};

export function changeScore(id, score) {
  return {
    type: CHANGE_SCORE,
    id,
    score
  }
};

export function recordHit(id, hit, multiplier) {
  return {
    type: RECORD_HIT,
    id,
    hit,
    multiplier
  }
};

export function movePlayerUp(id) {
  return {
    type: MOVE_PLAYER_UP,
    id
  }
}

export function movePlayerDown(id) {
  return {
    type: MOVE_PLAYER_DOWN,
    id
  }
}

export function nextPlayer() {
  return {
    type: NEXT_PLAYER
  }
}

export function changeGameStage(stage) {
  return {
    type: CHANGE_GAME_STAGE,
    stage
  }
}

export function updateRounds(rounds) {
  return {
    type: UPDATE_ROUNDS,
    rounds
  }
}
