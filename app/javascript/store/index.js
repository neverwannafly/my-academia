import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import user from './user';
import toast from './toast';
import classroom from './classroom';
import resources from './resources';
import quote from './quote';

const reducers = combineReducers({
  user, toast, classroom, resources, quote,
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
