import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import globalSagas from './sagas/global';
import loginSagas from './sagas/login';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer /* preloadedState */,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(globalSagas);
sagaMiddleware.run(loginSagas);
