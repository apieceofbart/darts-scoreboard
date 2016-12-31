export const hits = {
  25: 0,
  20: 0,
  19: 0,
  18: 0,
  17: 0,
  16: 0,
  15: 0
}

export const BEFORE_GAME = 0;
export const DURING_GAME = 1;
export const AFTER_GAME = 2;

export const initialStore = {
  past: {},
  future: {},
  present: {
    players: [
      { id: 0, name: "baro", score: 0, hits},
      { id: 1, name: "jaro", score: 0, hits},
      { id: 2, name: "kuba", score: 0, hits}
    ],
    currentPlayerId: 0,
    gameStage: BEFORE_GAME,
    lastHit: {}
  }
};
