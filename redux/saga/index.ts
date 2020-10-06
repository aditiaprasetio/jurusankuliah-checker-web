import { all } from 'redux-saga/effects';
import authSaga from './auth_saga';
import accountSaga from './account_saga';

export default function* rootSaga() {
  yield all([authSaga(), accountSaga()]);
}
