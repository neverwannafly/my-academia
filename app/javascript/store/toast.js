const SET_TOAST = 'SET_TOAST';
const UNSET_TOAST = 'UNSET_TOAST';

const initialState = {
  message: '',
  type: 'success',
};

export const setToast = (payload) => (dispatch) => {
  dispatch({ type: SET_TOAST, payload });
};

export const unsetToast = () => (dispatch) => {
  dispatch({ type: UNSET_TOAST });
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_TOAST:
      return { ...payload };
    case UNSET_TOAST:
      return { ...initialState };
    default:
      return { ...state };
  }
}
