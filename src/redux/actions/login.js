import loginActionTypes from '../actionTypes/login';

const {
  reducers: { LOGIN_REQUEST, LOGIN_OUT },
} = loginActionTypes;

export default {
  namespace: 'login',
  reducers: {
    loginRequested(params) {
      return {
        type: LOGIN_REQUEST,
        payload: params,
      };
    },
    loginOut() {
      return {
        type: LOGIN_OUT,
      };
    },
  },
};
