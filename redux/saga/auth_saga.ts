import { call, put, takeLatest } from 'redux-saga/effects';
import { apiLoginByGoogle } from '../../common/api/auth';
import { APP_AUTH_DATA } from '../../common/constant/auth';
import {
  CHECK_GOOGLE_TOKEN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from './auth_constant';

function* checkGoogleToken(action: any) {
  try {
    const token = action.payload.token;
    let res = yield call(apiLoginByGoogle, token);
    let data: any;

    if (res && res.data) {
      data = {
        ...res.data,
        google_token: token,
      };
    } else {
      yield put({ type: LOGIN_FAILED, message: 'Login Failed' });
    }

    yield window.localStorage.setItem(APP_AUTH_DATA, JSON.stringify(data));

    yield put({ type: LOGIN_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: LOGIN_FAILED, message: e.message });
  }
}

function* authSaga() {
  yield takeLatest(CHECK_GOOGLE_TOKEN, checkGoogleToken);
}

export default authSaga;
