import classroom from '@app/api/classroom';
import { importStoreFromWindow } from '@app/constants/store';
import { COMMENT_ACTING, COMMENT_FAIL, COMMENT_LIKE } from './comments';

import { RESOURCE_LIKE, RESOURCE_ACTING, RESOURCE_FAIL } from './resources';

const CLASSROOM_INIT = 'CLASSROOM_INIT';
const CLASSROOM_LOAD = 'CLASSROOM_LOAD';
const CLASSROOM_FAIL = 'CLASSROOM_FAIL';
const SEARCH_INIT = 'SEARCH_INIT';
const SEARCH_DONE = 'SEARCH_DONE';

const initialState = {
  data: importStoreFromWindow('classroom', {}),
  tags: importStoreFromWindow('tags', []),
  isLoading: false,
  error: null,
  isSearching: false,
  searchables: [],
};

export function loadClassroom() {
  return async (dispatch, getState) => {
    const { isLoading } = getState().classroom;
    if (isLoading) return;

    dispatch({ type: CLASSROOM_INIT });
    try {
      const response = await classroom.index();
      dispatch({ type: CLASSROOM_LOAD, payload: response });
    } catch (err) {
      dispatch({ type: CLASSROOM_FAIL, payload: err.message });
    }
  };
}

export function search(searchTerm, onSuccess, onFail) {
  return async (dispatch, getState) => {
    const { isSearching, data: { id } } = getState().classroom;

    if (!searchTerm || searchTerm.length < 3 || isSearching) {
      return;
    }
    dispatch({ type: SEARCH_INIT });
    try {
      const response = await classroom.search(id, searchTerm);
      dispatch({ type: SEARCH_DONE, payload: response.data });
      onSuccess();
    } catch (err) {
      if (onFail) {
        onFail(err.message);
      }
    }
  };
}

export function toggleLike(classroomId, likeableType, likeableId, resourceId) {
  return async (dispatch, getState) => {
    const { isActing: commentActing } = getState().comments;
    const { isActing: resourceActing } = getState().resources;
    if (likeableType === 'comment' && commentActing) return;
    if (likeableType === 'classroom_resource' && resourceActing) return;

    dispatch({
      type: likeableType === 'comment' ? COMMENT_ACTING : RESOURCE_ACTING,
    });

    try {
      await classroom.like(classroomId, likeableType, likeableId);
      dispatch({
        type: likeableType === 'comment' ? COMMENT_LIKE : RESOURCE_LIKE,
        payload: { resourceId, likeableId },
      });
    } catch (err) {
      dispatch({
        type: likeableType === 'comment' ? COMMENT_FAIL : RESOURCE_FAIL,
        payload: err.message,
      });
    }
  };
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CLASSROOM_INIT:
      return { ...state, isLoading: true, error: null };
    case CLASSROOM_LOAD:
      return {
        ...state, isLoading: false, data: payload.classroom, tags: payload.tags,
      };
    case CLASSROOM_FAIL:
      return { ...state, isLoading: false, error: payload };
    case SEARCH_INIT:
      return {
        ...state, isSearching: true, searchables: [],
      };
    case SEARCH_DONE:
      return {
        ...state, isSearching: false, searchables: payload,
      };
    default:
      return { ...state };
  }
}
