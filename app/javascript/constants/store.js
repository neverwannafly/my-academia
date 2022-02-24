/* eslint-disable import/prefer-default-export */
export const importStoreFromWindow = (key, defaultState) => {
  const state = window.MY_CLASSROOM || {};
  return state[key] || defaultState;
};
