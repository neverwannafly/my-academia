import classroom from '@app/api/classroom';

const QUOTE_INIT = 'QUOTE_INIT';
const QUOTE_LOAD = 'QUOTE_LOAD';
const QUOTE_FAIL = 'QUOTE_FAIL';
const TOGGLE_QUOTE = 'TOGGLE_QUOTE';

const initialState = {
  data: null,
  isLoading: false,
  isOpen: true,
  error: null,
};

export function toggleQuote() {
  return (dispatch) => {
    dispatch({ type: TOGGLE_QUOTE });
  };
}

export function loadQuote() {
  return async (dispatch, getState) => {
    const { isLoading, data } = getState().quote;
    if (isLoading || data) return;

    dispatch({ type: QUOTE_INIT });
    try {
      const response = await classroom.quote();
      dispatch({ type: QUOTE_LOAD, payload: response.data });
    } catch (err) {
      dispatch({ type: QUOTE_FAIL, payload: err.message });
    }
  };
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case QUOTE_INIT:
      return { ...state, isLoading: true, error: null };
    case QUOTE_LOAD:
      return { ...state, isLoading: false, data: payload };
    case QUOTE_FAIL:
      return { ...state, isLoading: false, error: payload };
    case TOGGLE_QUOTE:
      return { ...state, isOpen: !state.isOpen };
    default:
      return { ...state };
  }
}
