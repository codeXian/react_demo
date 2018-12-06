import {
  TOGGLE_COLLAPSED
} from './actionTypes';

export const toggleCollapsed = collapsed => ({
  type: TOGGLE_COLLAPSED,
  payload: {
    collapsed
  }
})