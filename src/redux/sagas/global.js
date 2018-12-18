import { delay } from 'redux-saga';
import {
  call,
  takeEvery,
  put,
  all,
  takeLatest,
  select,
  take,
  race,
} from 'redux-saga/effects';
import { fetchUserData } from '@/services/api';
import globalActionTypes from '../actionTypes/global';

const {
  reducers: {
    INCREMENT_COUNTER,
    FETCHUSER_SUCCESS,
    FETCHUSER_ERROR,
    TIMEOUT_ERROR,
    POSTS_RECEIVED,
  },
  effects: {
    INCREMENT_COUNTER_ASYNC,
    FETCHUSER_REQUESTED_ASYNC,
    POSTS_RECEIVED_ASYNC,
  },
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

export function* fetchUserDataTimeoutAsync() {
  // eslint-disable-next-line
  const { posts, timeout } = yield race({
    posts: call(fetchUserData),
    timeout: call(delay, 20),
  });

  if (posts) {
    yield put({ type: POSTS_RECEIVED, payload: posts });
  } else {
    yield put({ type: TIMEOUT_ERROR });
  }
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

export function* watchFetchUserDataTimeoutAsync() {
  yield takeEvery(POSTS_RECEIVED_ASYNC, fetchUserDataTimeoutAsync);
}

export default function* globalSagas() {
  yield all([
    call(watchIncrementAsync),
    call(watchFetchUserDataAsync),
    call(watchFetchUserDataTimeoutAsync),
  ]);
}
