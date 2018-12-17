import { take, call, all, put } from 'redux-saga/effects';
import { fetchLoginData } from '@/services/api';
import { setTokenStorage, removeTokenStorage } from '@/utils/utils';
import loginActionTypes from '../actionTypes/login';

const {
  reducers: { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_OUT },
} = loginActionTypes;

function* authorize(params) {
  try {
    const token = yield call(fetchLoginData, params);
    yield put({ type: LOGIN_SUCCESS, payload: token });
    return token;
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_ERROR, error });
  }
}

function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST);
    const token = yield call(authorize, payload);
    if (token) {
      setTokenStorage(token.data.data.token);
      yield take(LOGIN_OUT);
      removeTokenStorage();
    }
  }
}

export default function* loginSagas() {
  yield all([call(loginFlow)]);
}
