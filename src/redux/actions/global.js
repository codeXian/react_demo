import { TOGGLE_COLLAPSED } from '../actionTypes/global';

export const toggleCollapsed = collapsed => ({
  type: TOGGLE_COLLAPSED,
  payload: {
    collapsed,
  },
});
