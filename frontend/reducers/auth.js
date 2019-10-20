import {
  USER_LOADING,
  USER_LOADED,
  USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  // set isLoading to true by default so on page reload user while being logged in
  // isn't redirected by PrivateRoute to login page and then immediately to home page
  // explained here:
  // https://stackoverflow.com/questions/49091416/refresh-on-protected-routes-react-router-with-firebase-auth
  isLoading: true,
  isAuthenticated: false,
  user: {}
};


export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, isLoading: true };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    // resets state to default
    case USER_ERROR:
    // do the same thing as above
    case LOGIN_FAIL:
    // again in this case everything is set to default (cleared out)
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state
  }
}
