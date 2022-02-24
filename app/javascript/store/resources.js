import classroom from '@app/api/classroom';

const RESOURCE_INIT = 'RESOURCE_INIT';
const RESOURCE_LOAD = 'RESOURCE_LOAD';
const RESOURCE_FAIL = 'RESOURCE_FAIL';

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
    default:
      return { ...state };
  }
}
