import { put, takeLatest } from 'redux-saga/effects';
import {
  apiCreateOneCheckerProfile,
  apiFetchOneCheckerProfile,
  apiUpdateOneCheckerProfile,
} from '../../common/api/checkerProfile';
import { getAccountId, getHeaders } from '../../common/function/function';
import {
  CREATE_ONE_CHECKER_PROFILE,
  CREATE_ONE_CHECKER_PROFILE_FAILED,
  FETCH_ONE_CHECKER_PROFILE,
  FETCH_ONE_CHECKER_PROFILE_FAILED,
  FETCH_ONE_CHECKER_PROFILE_SUCCESS,
  UPDATE_ONE_CHECKER_PROFILE,
  UPDATE_ONE_CHECKER_PROFILE_FAILED,
} from './checkerProfile_types';

function* fetchOneCheckerProfile() {
  try {
    const id = yield getAccountId();

    console.info('account_id', id);
    let headers = yield getHeaders();

    let res;
    res = yield apiFetchOneCheckerProfile(id, headers);

    if (res && res.data) {
      yield put({ type: FETCH_ONE_CHECKER_PROFILE_SUCCESS, payload: res.data });
    } else {
      yield put({ type: FETCH_ONE_CHECKER_PROFILE_FAILED, message: 'No Data' });
    }
  } catch (e) {
    yield put({ type: FETCH_ONE_CHECKER_PROFILE_FAILED, message: e.message });
  }
}

function* createOneCheckerProfile(action: any) {
  let headers = yield getHeaders();
  let id = yield getAccountId();

  try {
    console.info('createOneCheckerProfile');

    let res;
    res = yield apiCreateOneCheckerProfile(
      { ...action.payload, account_id: id },
      headers,
    );

    if (res && res.data) {
      yield put({ type: FETCH_ONE_CHECKER_PROFILE });
    } else {
      yield put({
        type: CREATE_ONE_CHECKER_PROFILE_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    yield put({ type: CREATE_ONE_CHECKER_PROFILE_FAILED, message: e.message });
    yield put({ type: FETCH_ONE_CHECKER_PROFILE });
  }
}

function* updateOneCheckerProfile(action: any) {
  try {
    console.info('updateOneCheckerProfile');
    let headers = yield getHeaders();

    let res;
    const id = action.payload.id;
    const data = action.payload;
    delete data.id;

    res = yield apiUpdateOneCheckerProfile(id, data, headers);

    if (res && res.data) {
      yield put({ type: FETCH_ONE_CHECKER_PROFILE });
    } else {
      yield put({
        type: UPDATE_ONE_CHECKER_PROFILE_FAILED,
        message: 'No Data',
      });
    }
  } catch (e) {
    yield put({ type: UPDATE_ONE_CHECKER_PROFILE_FAILED, message: e.message });
  }
}

function* checkerProfileSaga() {
  yield takeLatest(FETCH_ONE_CHECKER_PROFILE, fetchOneCheckerProfile);
  yield takeLatest(CREATE_ONE_CHECKER_PROFILE, createOneCheckerProfile);
  yield takeLatest(UPDATE_ONE_CHECKER_PROFILE, updateOneCheckerProfile);
}

export default checkerProfileSaga;
