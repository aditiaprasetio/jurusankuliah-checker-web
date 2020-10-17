import { put, takeLatest } from 'redux-saga/effects';
import {
  apiCreateBulkDeptFamilySubject,
  apiFetchListDeptFamilySubject,
} from '../../common/api/deptFamilySubject';
import { getAccountId, getHeaders } from '../../common/function/function';
import {
  CREATE_MANY_DEPT_FAMILY_SUBJECT,
  CREATE_MANY_DEPT_FAMILY_SUBJECT_FAILED,
  FETCH_MY_DEPT_FAMILY_SUBJECT,
  FETCH_MY_DEPT_FAMILY_SUBJECT_FAILED,
  FETCH_MY_DEPT_FAMILY_SUBJECT_SUCCESS,
} from './deptFamilySubject_types';

function* createManyDeptFamilySubject(action: any) {
  let headers = yield getHeaders();

  try {
    console.info('createManyDeptFamilySubject');

    let res;
    res = yield apiCreateBulkDeptFamilySubject(action.payload, headers);

    if (res && res.data) {
      yield put({ type: FETCH_MY_DEPT_FAMILY_SUBJECT });
    } else {
      yield put({
        type: CREATE_MANY_DEPT_FAMILY_SUBJECT_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    yield put({
      type: CREATE_MANY_DEPT_FAMILY_SUBJECT_FAILED,
      message: e.message,
    });
  }
}

function* fetchMyListDeptFamilySubject(action: any) {
  let headers = yield getHeaders();
  let id = yield getAccountId();

  try {
    console.info('fetchMyListDeptFamilySubject');

    let res;
    res = yield apiFetchListDeptFamilySubject(
      `filter[]=created_by_id||eq||${id}`,
      headers,
    );

    if (res && res.data) {
      yield put({
        type: FETCH_MY_DEPT_FAMILY_SUBJECT_SUCCESS,
        payload: res.data,
      });
    } else {
      yield put({
        type: FETCH_MY_DEPT_FAMILY_SUBJECT_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    yield put({
      type: FETCH_MY_DEPT_FAMILY_SUBJECT_FAILED,
      message: e.message,
    });
  }
}

function* deptFamilySubjectSaga() {
  yield takeLatest(
    CREATE_MANY_DEPT_FAMILY_SUBJECT,
    createManyDeptFamilySubject,
  );
  yield takeLatest(FETCH_MY_DEPT_FAMILY_SUBJECT, fetchMyListDeptFamilySubject);
}

export default deptFamilySubjectSaga;
