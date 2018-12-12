import { delay } from 'redux-saga';
import {
  call,
  takeEvery,
  put,
  all,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';
import { fetchUserData } from '@/services/api';
import globalActionTypes from '../actionTypes/global';

const {
  reducers: { INCREMENT_COUNTER, FETCHUSER_SUCCESS, FETCHUSER_ERROR },
  effects: { INCREMENT_COUNTER_ASYNC, FETCHUSER_REQUESTED_ASYNC },
} = globalActionTypes;

export function* watchAndLog() {
  while (true) {
    const action = yield take('*');
    const state = yield select();
    console.log('action', action);
    console.log('state after', state);
  }
}

export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: INCREMENT_COUNTER });
}

export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_COUNTER_ASYNC, incrementAsync);
}

export function* fetchUserDataAsync() {
  try {
    const data = yield call(fetchUserData);
    yield put({ type: FETCHUSER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCHUSER_ERROR, error });
  }
}

export function* watchFetchUserDataAsync() {
  yield takeLatest(FETCHUSER_REQUESTED_ASYNC, fetchUserDataAsync);
}

export default function* rootSaga() {
  yield all([
    call(watchAndLog),
    call(watchIncrementAsync),
    call(watchFetchUserDataAsync),
  ]);
}
