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


// helper function which composes headers
// by default it adds "'Content-Type': 'application/json'" to the header
// if second argument is false it doesn't
export const composeHeaders = (getState, json=true) => {
  // get token from state
  // getState() returns the current state tree of your application.
  // It is equal to the last value returned by the store's reducer
  // It's a redux function
  const headers = {};
  const token = getState().auth.token;
  if (json) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) {
    headers['Authorization'] = `Token ${token}`
  }
  return headers
};


// check token and get user
export const loadUser = () => (dispatch, getState) => {
  // user loading
  dispatch({ type: USER_LOADING });
  fetch('api/accounts/user/', { headers: composeHeaders(getState) })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(data => dispatch({ type: USER_LOADED, payload: data }))
    .catch(error => {
      dispatch({ type: USER_ERROR });
      console.log(error)
    })
};


// register user
// pass in an object as single parameter to register function
// which then gets destructured
export const register = ({ username, password, email }) => dispatch => {
  const body = JSON.stringify({ username, password, email }); // Object Property Value Shorthand
  const headers = { 'Content-Type': 'application/json' };
  fetch('api/accounts/register/', { method: 'POST', body: body, headers: headers })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response
      }
    })
    .then(data => dispatch({ type: REGISTER_SUCCESS, payload: data }))
    .catch(error => {
      dispatch({ type: REGISTER_FAIL });
      console.log(error)
    })
};


// login user
export const login = (username, password) => dispatch => {
  const body = JSON.stringify({ username, password }); // Object Property Value Shorthand
  const headers = { 'Content-Type': 'application/json' };
  fetch('api/accounts/login/', { method: 'POST', body: body, headers: headers })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response
      }
    })
    .then(data => dispatch({ type: LOGIN_SUCCESS, payload: data }))
    .catch(error => {
      dispatch({ type: LOGIN_FAIL });
      console.log(error)
  })
};


// logout user
export const logout = history => (dispatch, getState) => {
  fetch('api/accounts/logout/', { method: 'POST', body: null, headers: composeHeaders(getState) })
    .then(() => {
      dispatch({ type: LOGOUT_SUCCESS });
      history.push('/');
    })
    .catch(error => console.log(error))
};
