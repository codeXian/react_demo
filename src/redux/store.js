import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import rootReducer from './reducers';

const middleware = []

export default createStore(
  rootReducer, /* preloadedState */
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);