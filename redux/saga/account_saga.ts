import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';
import { apiFetchAccount } from '../../common/api/account';
import { getHeaders } from '../../common/function/function';
import { handleError } from '../../common/function/handleError';
import {
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_FAILED,
  FETCH_ACCOUNT_SUCCESS,
} from './account_types';

function* fetchMyAccount(action: any) {
  try {
    const id = action.payload.id;
    let headers = yield getHeaders();

    let res;
    res = yield apiFetchAccount(id, headers);

    if (res && res.data) {
      yield put({ type: FETCH_ACCOUNT_SUCCESS, payload: res.data });
    } else {
      yield put({ type: FETCH_ACCOUNT_FAILED, message: 'No Data' });
    }
  } catch (e) {
    toast.error('Failed to fetch account' + handleError(e));
    yield put({ type: FETCH_ACCOUNT_FAILED, message: e.message });
  }
}

function* accountSaga() {
  yield takeLatest(FETCH_ACCOUNT, fetchMyAccount);
}

export default accountSaga;
