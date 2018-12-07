import { TOGGLE_COLLAPSED } from '../actionTypes/global';

const initialState = {
  collapsed: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_COLLAPSED:
      const { collapsed } = action.payload;
      return {
        ...state,
        collapsed,
      };

    default:
      return state;
  }
}
