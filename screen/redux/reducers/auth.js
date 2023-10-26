import {
  LOGIN,
  LOGGING_IN,
  LOGOUT,
  LOGIN_ERROR,
  RESTORE_TOKEN,
  SIGN_UP_LOADING,
  SET_PROFILE,
} from "../actions/types";

const initialState = {
  token: null,
  loggedIn: false,
  loggingIn: false,
  user: {},
  error: "",
  signupLoading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload.success,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGGING_IN:
      return {
        ...state,
        loggingIn: !state.loggingIn,
      };
    case RESTORE_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SIGN_UP_LOADING:
      return {
        ...state,
        signupLoading: !state.signupLoading,
      };
    case SET_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
}
