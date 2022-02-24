import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import home from './home';
import user from './user';
import toast from './toast';
import puzzles from './puzzles';

const reducers = combineReducers({
  home, user, toast, puzzles,
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
