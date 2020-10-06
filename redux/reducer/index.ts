import { combineReducers } from 'redux';
import authReducer from './auth';
import accountReducer from './account';

const rootReducer = combineReducers({
  authReducer,
  accountReducer,
});

export default rootReducer;
