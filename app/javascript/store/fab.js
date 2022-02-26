const FAB_SET_STATE = 'FAB_SET_STATE';
const FAB_OPEN = 'FAB_OPEN';
const FAB_CLOSE = 'FAB_CLOSE';

export const setFabState = (newState) => (dispatch) => {
  dispatch({ type: FAB_SET_STATE, payload: newState });
};

export const setFabOpen = (id = null) => (dispatch) => {
  dispatch({ type: FAB_OPEN, payload: id });
};

export const setFabClose = () => (dispatch) => {
  dispatch({ type: FAB_CLOSE });
};

const initialState = {
  isOpen: false,
  mode: 'create',
  type: 'comment',
  id: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FAB_SET_STATE:
      return { ...state, ...payload };
    case FAB_OPEN:
      return { ...state, isOpen: true, id: payload };
    case FAB_CLOSE:
      return { ...state, isOpen: false, id: null };
    default:
      return { ...state };
  }
}
