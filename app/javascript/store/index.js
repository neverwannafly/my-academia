import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import activities from './activities';
import user from './user';
import toast from './toast';
import classroom from './classroom';
import resources from './resources';
import quote from './quote';
import comments from './comments';
import fab from './fab';
import stats from './stats';
import tasks from './tasks';

const reducers = combineReducers({
  user,
  toast,
  classroom,
  fab,
  resources,
  quote,
  comments,
  activities,
  stats,
  tasks,
});

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];

const composeEnhancers = typeof window === 'object'
  && ['development', 'staging'].includes(window?.ENV_VARS?.mode)
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

const enhancer = composeEnhancers(...enhancers);

const store = createStore(reducers, enhancer);

export default store;
