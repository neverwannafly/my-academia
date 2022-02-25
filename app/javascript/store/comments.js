import classroom from '@app/api/classroom';
import { batch } from 'react-redux';
import { setToast } from './toast';

const COMMENT_INIT = 'COMMENT_INIT';
const COMMENT_LOAD = 'COMMENT_LOAD';
const COMMENT_FAIL = 'COMMENT_FAIL';
const COMMENT_CREATE = 'COMMENT_CREATE';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export function loadComments(classroomId, resourceId) {
  return async (dispatch, getState) => {
    const { isLoading } = getState().comments;
    if (isLoading) return;

    dispatch({ type: COMMENT_INIT });
    try {
      const response = await classroom.comments(classroomId, resourceId);
      dispatch({ type: COMMENT_LOAD, payload: { key: resourceId, data: response } });
    } catch (err) {
      dispatch({ type: COMMENT_FAIL, payload: err.message });
    }
  };
}

export function createComment(classroomId, resourceId, body, afterCreate) {
  return async (dispatch, getState) => {
    const { isLoading } = getState().comments;
    const { username } = getState().user;
    if (isLoading) return;

    dispatch({ type: COMMENT_INIT });
    try {
      const response = await classroom.createComment(classroomId, resourceId, body);
      const data = { ...response, ...{ username } };
      batch(() => {
        dispatch({ type: COMMENT_CREATE, payload: { key: resourceId, data } });
        dispatch(setToast({ message: 'Added Resource 🥳', type: 'success' }));
      });
      afterCreate();
    } catch (err) {
      dispatch(setToast({ message: 'Something went wrong 🥲', type: 'error' }));
      dispatch({ type: COMMENT_FAIL, payload: err.message });
    }
  };
}

function addCommentToTop(state, payload) {
  const { key, data } = payload;

  const newState = { ...state };
  newState[key].unshift(data);

  return newState;
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case COMMENT_INIT:
      return { ...state, isLoading: true, error: null };
    case COMMENT_LOAD:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          [payload.key]: payload.data,
        },
      };
    case COMMENT_FAIL:
      return {
        ...state, isLoading: false, error: payload,
      };
    case COMMENT_CREATE:
      return {
        ...state,
        isLoading: false,
        data: addCommentToTop(state.data, payload),
      };
    default:
      return { ...state };
  }
}
