const HOME_INIT = 'HOME_INIT';
const HOME_LOAD = 'HOME_LOAD';
const HOME_FAIL = 'HOME_FAIL';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case HOME_INIT:
      return { ...state, isLoading: true, error: null };
    case HOME_LOAD:
      return { ...state, isLoading: false, data: payload };
    case HOME_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return { ...state };
  }
}
