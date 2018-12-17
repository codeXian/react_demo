import loginActionTypes from '../actionTypes/login';

const {
  reducers: { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_OUT },
} = loginActionTypes;

const initialState = {
  token: '',
  login: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const {
        data: {
          data: { token },
        },
      } = action.payload;
      return {
        ...state,
        token,
        login: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        token: null,
        login: false,
      };
    case LOGIN_OUT:
      return {
        ...state,
        token: '',
        login: '',
      };
    default:
      return state;
  }
}
