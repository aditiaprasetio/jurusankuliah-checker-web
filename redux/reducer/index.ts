import { combineReducers } from 'redux';
import authReducer from './auth';
import accountReducer from './account';
import checkerProfileReducer from './checkerProfile';

const rootReducer = combineReducers({
  authReducer,
  accountReducer,
  checkerProfileReducer,
});

export default rootReducer;
