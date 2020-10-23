import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiLoginByGoogle } from '../../common/api/auth';
import { APP_AUTH_DATA } from '../../common/constant/auth';
import { fetchAccount } from '../action/account';
import { handleError } from '../../common/function/handleError';
import {
  CHECK_GOOGLE_TOKEN,
  CHECK_LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from './auth_types';

function* checkLogin() {
  try {
    let appAuthData = yield window.localStorage.getItem(APP_AUTH_DATA);
    if (appAuthData) {
      appAuthData = JSON.parse(appAuthData);

      yield put(fetchAccount('my'));

      yield put({ type: LOGIN_SUCCESS, payload: appAuthData });
    } else {
      yield put({ type: LOGIN_FAILED, message: 'Login Failed' });
    }
  } catch (e) {
    toast.error('Login gagal! ' + handleError(e));
    yield put({ type: LOGIN_FAILED, message: e.message });
  }
}

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

      yield window.localStorage.setItem(APP_AUTH_DATA, JSON.stringify(data));

      setTimeout(() => {
        yield put(fetchAccount('my'));
        yield put({ type: LOGIN_SUCCESS, payload: data });
      }, 1000);

    } else {
      toast.error('Login gagal!');
      console.error('error login gagal');
      yield put({ type: LOGIN_FAILED, message: 'Login Failed' });
    }
  } catch (e) {
    toast.error('Login Gagal! ' + handleError(e));
    yield put({ type: LOGIN_FAILED, message: e.message });
  }
}

function* authSaga() {
  yield takeLatest(CHECK_LOGIN, checkLogin);
  yield takeLatest(CHECK_GOOGLE_TOKEN, checkGoogleToken);
}

export default authSaga;
