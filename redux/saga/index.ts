import { all } from 'redux-saga/effects';
import authSaga from './auth_saga';
import accountSaga from './account_saga';
import checkerProfileSaga from './checkerProfile_saga';
import subjectDetailSaga from './subjectDetail_saga';
import surveySaga from './survey_saga';
import deptFamilySubjectSaga from './deptFamilySubject_saga';
import subjectLikeSaga from './subjectLike_saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    accountSaga(),
    checkerProfileSaga(),
    subjectDetailSaga(),
    surveySaga(),
    deptFamilySubjectSaga(),
    subjectLikeSaga(),
  ]);
}
