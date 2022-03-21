import classroom from '@app/api/classroom';

const TASKS_INIT = 'TASKS_INIT';
const TASKS_LOAD = 'TASKS_LOAD';
const TASKS_FAIL = 'TASKS_FAIL';
const TASKS_ACTING = 'TASKS_ACTING';
const TASKS_CREATE = 'TASKS_CREATE';
const TASKS_UPDATE = 'TASKS_UPDATE';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  isActing: false,
};

export const loadTasks = () => async (dispatch, getState) => {
  const {
    tasks: { isLoading },
    classroom: { data: { id: classroomId } },
  } = getState();
  if (isLoading) return;

  dispatch({ type: TASKS_INIT });
  try {
    const response = await classroom.tasks.index(classroomId);
    dispatch({ type: TASKS_LOAD, payload: response });
  } catch (err) {
    dispatch({ type: TASKS_FAIL, payload: err.message });
  }
};

export const newTask = () => async (dispatch, getState) => {
  const {
    tasks: { isLoading, isActing },
    classroom: { data: { id: classroomId } },
  } = getState();

  if (isLoading || isActing) return;

  dispatch({ type: TASKS_ACTING });
  try {
    const { id } = await classroom.tasks.create(classroomId);
    dispatch({ type: TASKS_CREATE, payload: id });
  } catch (err) {
    dispatch({ type: TASKS_FAIL, payload: err.message });
  }
};

export const updateTask = (taskId, payload) => async (dispatch, getState) => {
  const {
    tasks: { isLoading, isActing },
    classroom: { data: { id: classroomId } },
  } = getState();

  if (isLoading || isActing) return;

  dispatch({ type: TASKS_ACTING });
  try {
    await classroom.tasks.update(classroomId, taskId, payload);
    dispatch({ type: TASKS_UPDATE, payload: { data: payload, taskId } });
  } catch (err) {
    dispatch({ type: TASKS_FAIL, payload: err.message });
  }
};

function upsert(state, payload) {
  const newState = [...payload, ...state];

  return newState;
}

function update(state, payload) {
  const newState = [...state];
  const { taskId, data } = payload;
  const index = newState.findIndex((row) => row.id === taskId);
  newState[index] = { ...state[index], ...data };

  return newState;
}

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case TASKS_ACTING:
      return { ...state, isActing: true, error: null };
    case TASKS_CREATE:
      return { ...state, isActing: false, data: upsert(state.data, payload) };
    case TASKS_UPDATE:
      return { ...state, isActing: false, data: update(state.data, payload) };
    case TASKS_INIT:
      return { ...state, isLoading: true, error: null };
    case TASKS_LOAD:
      return { ...state, isLoading: false, data: payload };
    case TASKS_FAIL:
      return {
        ...state, isLoading: false, isActing: false, error: payload,
      };
    default:
      return { ...state };
  }
}
