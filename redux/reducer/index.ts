import { combineReducers } from 'redux';
import authReducer from './auth';
import accountReducer from './account';
import checkerProfileReducer from './checkerProfile';
import subjectDetailReducer from './subjectDetail';
import surveyReducer from './survey';
import deptFamilySubjectReducer from './deptFamilySubject';
import subjectLikeReducer from './subjectLike';

const rootReducer = combineReducers({
  authReducer,
  accountReducer,
  checkerProfileReducer,
  subjectDetailReducer,
  surveyReducer,
  deptFamilySubjectReducer,
  subjectLikeReducer,
});

export default rootReducer;
