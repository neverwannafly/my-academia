import classroom from '@app/api/classroom';

const ACTIVITIES_INIT = 'ACTIVITIES_INIT';
const ACTIVITIES_LOAD = 'ACTIVITIES_LOAD';
const ACTIVITIES_FAIL = 'ACTIVITIES_FAIL';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const loadActivities = (classroomId) => async (dispatch, getState) => {
  const { isLoading } = getState().activities;
  if (isLoading) return;

  dispatch({ type: ACTIVITIES_INIT });
  try {
    const response = await classroom.activities.index(classroomId);
    dispatch({ type: ACTIVITIES_LOAD, payload: response });
  } catch (err) {
    dispatch({ type: ACTIVITIES_FAIL, payload: err.message });
  }
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case ACTIVITIES_INIT:
      return { ...state, isLoading: true, error: null };
    case ACTIVITIES_LOAD:
      return { ...state, isLoading: false, data: payload };
    case ACTIVITIES_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return { ...state };
  }
}
