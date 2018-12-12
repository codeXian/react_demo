import {
  TOGGLE_COLLAPSED,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER_ASYNC,
  FETCHUSER_REQUESTED,
} from '../actionTypes/global';

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
    },
  },
  effects: {
    incrementCounterAsync() {
      return { type: INCREMENT_COUNTER_ASYNC };
    },
    fetchUserDataAsync() {
      return { type: FETCHUSER_REQUESTED };
    },
  },
};
