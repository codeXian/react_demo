import { delay } from 'redux-saga';
import { call, takeEvery, put, all } from 'redux-saga/effects';
import { fetchUserData } from '@/services/api';
import {
  INCREMENT_COUNTER_ASYNC,
  INCREMENT_COUNTER,
  FETCHUSER_SUCCESS,
  FETCHUSER_ERROR,
  FETCHUSER_REQUESTED,
} from '../actionTypes/global';

export function helloSaga() {
  console.log('Hello Saga');
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
    console.log(error);
    yield put({ type: FETCHUSER_ERROR, error });
  }
}

export function* watchFetchUserDataAsync() {
  yield takeEvery(FETCHUSER_REQUESTED, fetchUserDataAsync);
}

export default function* rootSaga() {
  yield all([
    call(helloSaga),
    call(watchIncrementAsync),
    call(watchFetchUserDataAsync),
  ]);
}
