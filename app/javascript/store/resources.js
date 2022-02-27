import classroom from '@app/api/classroom';
import { batch } from 'react-redux';
import { setToast } from './toast';

const RESOURCE_INIT = 'RESOURCE_INIT';
const RESOURCE_LOAD = 'RESOURCE_LOAD';
const RESOURCE_COMPLETE = 'RESOURCE_COMPLETE';
const RESOURCE_CREATE = 'RESOURCE_CREATE';
const RESOURCE_UPDATE = 'RESOURCE_UPDATE';

export const RESOURCE_FAIL = 'RESOURCE_FAIL';
export const RESOURCE_ACTING = 'RESOURCE_ACTING';
export const RESOURCE_LIKE = 'RESOURCE_LIKE';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isLoaded: false,
  isActing: false,
};

export function loadResources(classroomId) {
  return async (dispatch, getState) => {
    const { isLoading, isLoaded } = getState().resources;
    if (isLoading || isLoaded || typeof classroomId !== 'number') return;

    dispatch({ type: RESOURCE_INIT });
    try {
      const response = await classroom.resources.index(classroomId);
      dispatch({ type: RESOURCE_LOAD, payload: response });
    } catch (err) {
      dispatch({ type: RESOURCE_FAIL, payload: err.message });
    }
  };
}

export function createResource(classroomId, body, afterCreate) {
  return async (dispatch, getState) => {
    const { isActing } = getState().resources;
    if (isActing) return;

    dispatch({ type: RESOURCE_ACTING });
    try {
      const response = await classroom.resources.create(classroomId, body);
      batch(() => {
        dispatch({ type: RESOURCE_CREATE, payload: response });
        dispatch(setToast({ message: 'Added Resource 🥳', type: 'success' }));
      });
      afterCreate();
    } catch (err) {
      dispatch({ type: RESOURCE_FAIL, payload: err.message });
    }
  };
}

export function updateResource(classroomId, resourceId, body, afterCreate) {
  return async (dispatch, getState) => {
    const { isActing } = getState().resources;
    if (isActing) return;

    dispatch({ type: RESOURCE_ACTING });
    try {
      const response = await classroom.resources.update(classroomId, resourceId, body);
      batch(() => {
        dispatch({ type: RESOURCE_UPDATE, payload: response });
        dispatch(setToast({ message: 'Updated Resource 🚀', type: 'success' }));
      });
      afterCreate();
    } catch (err) {
      dispatch({ type: RESOURCE_FAIL, payload: err.message });
    }
  };
}

export function markCompleted(classroomId, resourceId, afterComplete) {
  return async (dispatch, getState) => {
    const { isActing } = getState().resources;
    if (isActing) return;

    dispatch({ type: RESOURCE_ACTING });
    try {
      const response = await classroom.resources.markCompleted(classroomId, resourceId);
      dispatch({ type: RESOURCE_COMPLETE, payload: { response, resourceId } });
      if (afterComplete) { afterComplete(response); }
    } catch (err) {
      dispatch({ type: RESOURCE_FAIL, payload: err.message });
    }
  };
}

function addResourceToTop(state, payload) {
  const newState = Array.from(state);
  newState.unshift(payload);

  return newState;
}

function completeResource(state, payload) {
  const newState = Array.from(state);
  const { response, resourceId } = payload;
  const index = newState.findIndex((item) => item.id === Number(resourceId));
  newState[index].score = response.score;

  return newState;
}

function toggleContentLike(state, payload) {
  const newState = Array.from(state);
  const { likeableId } = payload;
  const index = newState.findIndex((item) => item.id === Number(likeableId));
  newState[index].liked = !newState[index].liked;
  newState[index].likes_count ||= 0;
  newState[index].likes_count += newState[index].liked ? 1 : -1;

  return newState;
}

function handleUpdateResource(state, payload) {
  const newState = Array.from(state);
  const index = newState.findIndex((item) => item.id === Number(payload.id));
  newState[index] = { ...newState[index], ...payload };

  return newState;
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case RESOURCE_ACTING:
      return { ...state, isActing: true, error: null };
    case RESOURCE_INIT:
      return { ...state, isLoading: true, error: null };
    case RESOURCE_LOAD:
      return {
        ...state, isLoading: false, data: payload, isLoaded: true,
      };
    case RESOURCE_FAIL:
      return {
        ...state, isLoading: false, isActing: false, error: payload, isLoaded: true,
      };
    case RESOURCE_CREATE:
      return {
        ...state, data: addResourceToTop(state.data, payload), isActing: false,
      };
    case RESOURCE_COMPLETE:
      return {
        ...state, data: completeResource(state.data, payload), isActing: false,
      };
    case RESOURCE_UPDATE:
      return {
        ...state, data: handleUpdateResource(state.data, payload), isActing: false,
      };
    case RESOURCE_LIKE:
      return {
        ...state, data: toggleContentLike(state.data, payload), isActing: false,
      };
    default:
      return { ...state };
  }
}
