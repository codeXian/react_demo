import globalActionTypes from '../actionTypes/global';

const {
  reducers: { TOGGLE_COLLAPSED, INCREMENT_COUNTER, DECREMENT_COUNTER },
  effects: {
    INCREMENT_COUNTER_ASYNC,
    FETCHUSER_REQUESTED_ASYNC,
    POSTS_RECEIVED_ASYNC,
    FETCH_PRODUCTS_ASYNC,
    QUENE_ASYNC,
    INPUT_THROTTLE,
  },
} = globalActionTypes;

export default {
  namespace: 'global',
  reducers: {
    toggleCollapsed(collapsed) {
      return {
        type: TOGGLE_COLLAPSED,
        payload: { collapsed },
      };
    },
    incrementCounter() {
      return { type: INCREMENT_COUNTER };
    },
    decrementCounter() {
      return { type: DECREMENT_COUNTER };
    }
  },
  effects: {
    incrementCounterAsync() {
      return { type: INCREMENT_COUNTER_ASYNC };
    },
    fetchUserDataAsync() {
      return { type: FETCHUSER_REQUESTED_ASYNC };
    },
    fetchUserDataTimeoutAsync() {
      return { type: POSTS_RECEIVED_ASYNC };
    },
    fetchProductsAsync() {
      return { type: FETCH_PRODUCTS_ASYNC };
    },
    queneAsync(value) {
      return { type: QUENE_ASYNC, payload: { value } };
    },
    handleChangeInputThrottle(value) {
      return { type: INPUT_THROTTLE, payload: { value } }
    }
  },
};
