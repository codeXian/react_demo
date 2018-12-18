import { delay, buffers } from 'redux-saga';
import {
  call,
  takeEvery,
  put,
  all,
  takeLatest,
  select,
  take,
  race,
  actionChannel,
  // throttle,
} from 'redux-saga/effects';
import { fetchUserData, fetchProducts } from '@/services/api';
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
    FETCH_PRODUCTS_ASYNC,
    QUENE_ASYNC,
    INPUT_THROTTLE,
  },
} = globalActionTypes;

export function* watchAndLog() {
  // 本质是监听
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
  try {
    // eslint-disable-next-line
    const { posts, timeout } = yield race({
      posts: call(fetchUserData),
      timeout: call(delay, 1000),
    });
    if (posts) {
      yield put({ type: POSTS_RECEIVED, payload: posts });
    } else {
      yield put({ type: TIMEOUT_ERROR });
    }
  } catch (error) {
    console.log(error);
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
  // 比较优秀
  yield takeLatest(FETCHUSER_REQUESTED_ASYNC, fetchUserDataAsync);
}

export function* watchFetchUserDataTimeoutAsync() {
  yield takeEvery(POSTS_RECEIVED_ASYNC, fetchUserDataTimeoutAsync);
}

function* fetchProductsAsync() {
  const products = yield call(fetchProducts);
  console.log(products);
}

function* watchFetchProducts() {
  while (yield take(FETCH_PRODUCTS_ASYNC)) {
    yield call(fetchProductsAsync);
  }
}

function* watchQueneRequests() {
  const requestChan = yield actionChannel(QUENE_ASYNC, buffers.sliding(0));
  while (true) {
    const { payload } = yield take(requestChan);
    yield call(handleRequest, payload);
  }
}

function* handleRequest(payload) {
  yield call(delay, 1000);
  console.log(payload);
}

// function* handleInput(input) {
//   yield call(delay, 1);
//   console.log(input);
// }

// function* watchInput() {
//   yield throttle(500, INPUT_THROTTLE, handleInput);
// }

function* handleInput(input) {
  yield call(delay, 500)
  console.log(input);
}

function* watchInput() {
  yield takeLatest(INPUT_THROTTLE, handleInput)
}

export default function* globalSagas() {
  yield all([
    // call(watchAndLog),
    call(watchIncrementAsync),
    call(watchFetchUserDataAsync),
    call(watchFetchUserDataTimeoutAsync),
    call(watchFetchProducts),
    call(watchQueneRequests),
    call(watchInput),
  ]);
}
