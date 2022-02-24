import { importStoreFromWindow } from '@app/constants/store';

const CLASSROOM_INIT = 'CLASSROOM_INIT';
const CLASSROOM_LOAD = 'CLASSROOM_LOAD';
const CLASSROOM_FAIL = 'CLASSROOM_FAIL';

const initialState = {
  data: importStoreFromWindow('classroom', {}),
  isLoading: false,
  error: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CLASSROOM_INIT:
      return { ...state, isLoading: true, error: null };
    case CLASSROOM_LOAD:
      return { ...state, isLoading: false, data: payload };
    case CLASSROOM_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return { ...state };
  }
}
