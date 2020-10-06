import { all } from 'redux-saga/effects';
import authSaga from './auth_saga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
