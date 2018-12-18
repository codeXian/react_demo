import {
  take,
  call,
  all,
  put,
  fork,
  cancel,
  cancelled,
} from 'redux-saga/effects';
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
    setTokenStorage(token.data.data.token);
  } catch (error) {
    console.log(error);
    yield put({ type: LOGIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      console.log('我这个请求接口被提前终止了');
    }
  }
}

function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN_REQUEST);
    const task = yield fork(authorize, payload);
    const action = yield take([LOGIN_OUT, LOGIN_ERROR]);
    if (action.type === LOGIN_OUT) {
      yield cancel(task);
    }
    removeTokenStorage();
  }
}

export default function* loginSagas() {
  yield all([call(loginFlow)]);
}
