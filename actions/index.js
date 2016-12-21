export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const EDIT_PLAYER = 'EDIT_PLAYER';
export const CHANGE_SCORE = 'CHANGE_SCORE';

let nextPlayerId = 0;

export function addPlayer(name) {
  return {
    type: ADD_PLAYER,
    id: nextPlayerId++
    name,
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
    score
  }
};
