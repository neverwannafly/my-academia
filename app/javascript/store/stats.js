import classroom from '@app/api/classroom';

const STATS_INIT = 'STATS_INIT';
const STATS_LOAD = 'STATS_LOAD';
const STATS_FAIL = 'STATS_FAIL';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const loadStats = (classroomId) => async (dispatch, getState) => {
  const { isLoading } = getState().stats;
  if (isLoading) return;

  dispatch({ type: STATS_INIT });
  try {
    const response = await classroom.stats.index(classroomId);
    dispatch({ type: STATS_LOAD, payload: response });
  } catch (err) {
    dispatch({ type: STATS_FAIL, payload: err.message });
  }
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case STATS_INIT:
      return { ...state, isLoading: true, error: null };
    case STATS_LOAD:
      return { ...state, isLoading: false, data: payload };
    case STATS_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return { ...state };
  }
}
