import { combineReducers } from 'redux';

import auth from './auth';
import jobList from './jobList';
import jobDetail from './jobDetail';


export default combineReducers({
  auth,
  jobList,
  jobDetail,
})
