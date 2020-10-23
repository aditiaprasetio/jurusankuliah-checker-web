import { put, takeLatest } from 'redux-saga/effects';
import {
  apiCreateBulkSubjectDetail,
  apiFetchListSubjectDetail,
} from '../../common/api/subjectDetail';
import { getAccountId, getHeaders } from '../../common/function/function';
import { handleError } from '../../common/function/handleError';
import {
  CREATE_MANY_SUBJECT_DETAIL,
  CREATE_MANY_SUBJECT_DETAIL_FAILED,
  FETCH_MY_SUBJECT_DETAIL,
  FETCH_MY_SUBJECT_DETAIL_FAILED,
  FETCH_MY_SUBJECT_DETAIL_SUCCESS,
} from './subjectDetail_types';
import { toast } from 'react-toastify';

function* createManySubjectDetail(action: any) {
  let headers = yield getHeaders();

  try {
    console.info('createManySubjectDetail');

    let res;
    res = yield apiCreateBulkSubjectDetail(action.payload, headers);

    if (res && res.data) {
      yield put({ type: FETCH_MY_SUBJECT_DETAIL });
    } else {
      yield put({
        type: CREATE_MANY_SUBJECT_DETAIL_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    toast.error('Gagal menyimpan! ' + handleError(e));
    yield put({ type: CREATE_MANY_SUBJECT_DETAIL_FAILED, message: e.message });
  }
}

function* fetchMyListSubjectDetail(action: any) {
  let headers = yield getHeaders();
  let id = yield getAccountId();

  try {
    console.info('fetchMyListSubjectDetail');

    let res;
    res = yield apiFetchListSubjectDetail(
      `filter[]=created_by_id||eq||${id}`,
      headers,
    );

    if (res && res.data) {
      yield put({
        type: FETCH_MY_SUBJECT_DETAIL_SUCCESS,
        payload: res.data,
      });
    } else {
      yield put({
        type: FETCH_MY_SUBJECT_DETAIL_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    toast.error('Gagal mengambil data mapel! ' + handleError(e));
    yield put({ type: FETCH_MY_SUBJECT_DETAIL_FAILED, message: e.message });
  }
}

function* subjectDetailSaga() {
  yield takeLatest(CREATE_MANY_SUBJECT_DETAIL, createManySubjectDetail);
  yield takeLatest(FETCH_MY_SUBJECT_DETAIL, fetchMyListSubjectDetail);
}

export default subjectDetailSaga;
