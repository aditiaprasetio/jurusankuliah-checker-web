import { put, takeLatest } from 'redux-saga/effects';
import {
  apiCreateBulkSubjectLike,
  apiFetchListSubjectLike,
} from '../../common/api/subjectLike';
import { getAccountId, getHeaders } from '../../common/function/function';
import { handleError } from '../../common/function/handleError';
import {
  CREATE_MANY_SUBJECT_LIKE,
  CREATE_MANY_SUBJECT_LIKE_FAILED,
  FETCH_MY_SUBJECT_LIKE,
  FETCH_MY_SUBJECT_LIKE_FAILED,
  FETCH_MY_SUBJECT_LIKE_SUCCESS,
} from './subjectLike_types';
import { toast } from 'react-toastify';

function* createManySubjectLike(action: any) {
  let headers = yield getHeaders();

  try {
    console.info('createManySubjectLike');

    let res;
    res = yield apiCreateBulkSubjectLike(action.payload, headers);

    if (res && res.data) {
      yield put({ type: FETCH_MY_SUBJECT_LIKE });
    } else {
      yield put({
        type: CREATE_MANY_SUBJECT_LIKE_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    toast.error('Gagal menyimpan! ' + handleError(e));
    yield put({
      type: CREATE_MANY_SUBJECT_LIKE_FAILED,
      message: e.message,
    });
  }
}

function* fetchMyListSubjectLike() {
  let headers = yield getHeaders();
  let id = yield getAccountId();

  try {
    console.info('fetchMyListSubjectLike');

    let res;
    res = yield apiFetchListSubjectLike(
      `filter[]=created_by_id||eq||${id}`,
      headers,
    );

    if (res && res.data) {
      yield put({
        type: FETCH_MY_SUBJECT_LIKE_SUCCESS,
        payload: res.data,
      });
    } else {
      yield put({
        type: FETCH_MY_SUBJECT_LIKE_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    toast.error('Gagal mengambil data! ' + handleError(e));
    yield put({
      type: FETCH_MY_SUBJECT_LIKE_FAILED,
      message: e.message,
    });
  }
}

function* subjectLikeSaga() {
  yield takeLatest(CREATE_MANY_SUBJECT_LIKE, createManySubjectLike);
  yield takeLatest(FETCH_MY_SUBJECT_LIKE, fetchMyListSubjectLike);
}

export default subjectLikeSaga;
