import classroom from '@app/api/classroom';
import { batch } from 'react-redux';
import { setToast } from './toast';

const RESOURCE_INIT = 'RESOURCE_INIT';
const RESOURCE_LOAD = 'RESOURCE_LOAD';
const RESOURCE_FAIL = 'RESOURCE_FAIL';
const RESOURCE_CREATE = 'RESOURCE_CREATE';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isLoaded: false,
};

export function loadResources(classroomId) {
  return async (dispatch, getState) => {
    const { isLoading, isLoaded } = getState().resources;
    if (isLoading || isLoaded || typeof classroomId !== 'number') return;

    dispatch({ type: RESOURCE_INIT });
    try {
      const response = await classroom.resources(classroomId);
      dispatch({ type: RESOURCE_LOAD, payload: response });
    } catch (err) {
      dispatch({ type: RESOURCE_FAIL, payload: err.message });
    }
  };
}

export function createResource(classroomId, body, afterCreate) {
  return async (dispatch, getState) => {
    const { isLoading } = getState().comments;
    if (isLoading) return;

    dispatch({ type: RESOURCE_INIT });
    try {
      const response = await classroom.createResource(classroomId, body);
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

function addResourceToTop(state, payload) {
  const newState = Array.from(state);
  newState.unshift(payload);

  return newState;
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case RESOURCE_INIT:
      return { ...state, isLoading: true, error: null };
    case RESOURCE_LOAD:
      return {
        ...state, isLoading: false, data: payload, isLoaded: true,
      };
    case RESOURCE_FAIL:
      return {
        ...state, isLoading: false, error: payload, isLoaded: true,
      };
    case RESOURCE_CREATE:
      return {
        ...state, data: addResourceToTop(state.data, payload), isLoading: false,
      };
    default:
      return { ...state };
  }
}
