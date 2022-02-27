import classroom from '@app/api/classroom';
import { batch } from 'react-redux';
import { setToast } from './toast';

const COMMENT_INIT = 'COMMENT_INIT';
const COMMENT_LOAD = 'COMMENT_LOAD';
const COMMENT_CREATE = 'COMMENT_CREATE';
const COMMENT_UPDATE = 'COMMENT_UPDATE';

export const COMMENT_FAIL = 'COMMENT_FAIL';
export const COMMENT_ACTING = 'COMMENT_ACTING';
export const COMMENT_LIKE = 'COMMENT_LIKE';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
  isActing: false,
};

export function loadComments(classroomId, resourceId, resourceType) {
  return async (dispatch, getState) => {
    const { isLoading } = getState().comments;
    if (isLoading) return;

    dispatch({ type: COMMENT_INIT });
    try {
      const response = await classroom.comments.index(classroomId, resourceId, resourceType);
      dispatch({ type: COMMENT_LOAD, payload: { key: resourceId, data: response } });
    } catch (err) {
      dispatch({ type: COMMENT_FAIL, payload: err.message });
    }
  };
}

export function createComment(classroomId, resourceId, resourceType, body, afterCreate) {
  return async (dispatch, getState) => {
    const { isLoading } = getState().comments;
    const { username } = getState().user;
    if (isLoading) return;

    dispatch({ type: COMMENT_INIT });
    try {
      const response = await classroom.comments.create(classroomId, resourceId, resourceType, body);
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

export function updateComment(
  classroomId,
  resourceId,
  resourceType,
  commentId,
  body,
  afterCreate,
) {
  return async (dispatch, getState) => {
    const { isActing } = getState().resources;
    if (isActing) return;

    dispatch({ type: COMMENT_ACTING });
    try {
      const response = await classroom.comments.update(
        classroomId,
        resourceId,
        resourceType,
        commentId,
        body,
      );
      batch(() => {
        dispatch({ type: COMMENT_UPDATE, payload: response });
        dispatch(setToast({ message: 'Updated Comment 🚀', type: 'success' }));
      });
      afterCreate();
    } catch (err) {
      dispatch({ type: COMMENT_FAIL, payload: err.message });
    }
  };
}

function addCommentToBottom(state, payload) {
  const { key, data } = payload;

  const newState = { ...state };
  newState[key].push(data);

  return newState;
}

function handleCommentUpdate(state, payload) {
  const newState = { ...state };
  const { id, commentable_id: commentableId } = payload;
  const index = newState[commentableId].findIndex((item) => item.id === id);
  newState[commentableId][index] = { ...newState[commentableId][index], ...payload };

  return newState;
}

function toggleContentLike(state, payload) {
  const newState = { ...state };
  const { resourceId, likeableId } = payload;

  const index = newState[resourceId].findIndex((item) => item.id === Number(likeableId));
  newState[resourceId][index].liked = !newState[resourceId][index].liked;
  newState[resourceId].likes_count ||= 0;
  newState[resourceId].likes_count += newState[index].liked ? 1 : -1;

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
        ...state, isLoading: false, error: payload, isActing: false,
      };
    case COMMENT_ACTING:
      return {
        ...state, isActing: true, error: null,
      };
    case COMMENT_LIKE:
      return {
        ...state, isActing: false, data: toggleContentLike(state.data, payload),
      };
    case COMMENT_CREATE:
      return {
        ...state,
        isLoading: false,
        data: addCommentToBottom(state.data, payload),
      };
    case COMMENT_UPDATE:
      return {
        ...state,
        isActing: false,
        data: handleCommentUpdate(state.data, payload),
      };
    default:
      return { ...state };
  }
}
