import {
  TOGGLE_COLLAPSED,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  FETCHUSER_SUCCESS,
  FETCHUSER_ERROR,
} from '../actionTypes/global';

const initialState = {
  collapsed: false,
  counter: 0,
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COLLAPSED:
      const { collapsed } = action.payload;
      return {
        ...state,
        collapsed,
      };
    case INCREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case FETCHUSER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        user: { ...data },
      };
    }
    case FETCHUSER_ERROR: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}
