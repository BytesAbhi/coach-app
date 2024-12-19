// /src/reducers/rootReducer.js

import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import coachReducer from '../slices/coachSlice';
import studentReducer from '../slices/studentSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  coach: coachReducer,
  student: studentReducer,  // Add studentReducer here
});

export default rootReducer;
