/* eslint-disable import/prefer-default-export */
export const importStoreFromWindow = (key, defaultState) => {
  const state = window.CHESS_ON_RAILS || {};
  return state[key] || defaultState;
};
