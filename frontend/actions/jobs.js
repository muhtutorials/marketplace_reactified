import {
  JOB_LIST_LOADING,
  JOB_LIST_LOADED,
  JOB_LIST_ERROR,
  JOB_ADDED,
  JOB_DETAIL_LOADING,
  JOB_DETAIL_LOADED,
  JOB_DETAIL_ERROR
} from './types';
import { composeHeaders } from './auth';


export const loadJobList = () => dispatch => {
  dispatch({ type: JOB_LIST_LOADING });
  fetch('/api/jobs/')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
       throw response;
      }
    })
    .then(data => dispatch({ type: JOB_LIST_LOADED, payload: data }))
    .catch(error => {
        dispatch({ type: JOB_LIST_ERROR });
        console.log(error)
      });
};


export const loadJobDetail = id => dispatch => {
  dispatch({ type: JOB_DETAIL_LOADING });
  fetch(`/api/jobs/${id}/`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
       throw response;
      }
    })
    .then(data => dispatch({ type: JOB_DETAIL_LOADED, payload: data }))
    .catch(error => {
        dispatch({ type: JOB_DETAIL_ERROR });
        console.log(error)
      });
};


export const addJob = (job, history) => (dispatch, getState) => {
  fetch('api/jobs/', { method: 'POST', body: JSON.stringify(job), headers: composeHeaders(getState) })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
       throw response;
      }
    })
    .then(data => {
      dispatch({ type: JOB_ADDED, payload: data });
      // redirect to home page after successful job submission
      history.push('/');
    }).catch(error => console.log(error))
};


export const acceptJob = id => (dispatch, getState) => {
  fetch(`/api/jobs/${id}/accept/`, { headers: composeHeaders(getState) })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
       throw response;
      }
    })
    .then(data => dispatch({ type: JOB_DETAIL_LOADED, payload: data }))
    .catch(error => console.log(error));
};


export const declineJob = id => (dispatch, getState) => {
  fetch(`/api/jobs/${id}/decline/`, { headers: composeHeaders(getState) })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
       throw response;
      }
    })
    .then(data => dispatch({ type: JOB_DETAIL_LOADED, payload: data }))
    .catch(error => console.log(error));
};


export const doneJob = id => (dispatch, getState) => {
  fetch(`/api/jobs/${id}/done/`, { headers: composeHeaders(getState) })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
       throw response;
      }
    })
    .then(data => dispatch({ type: JOB_DETAIL_LOADED, payload: data }))
    .catch(error => console.log(error));
};
