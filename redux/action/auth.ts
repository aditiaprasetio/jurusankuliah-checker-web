import { CHECK_GOOGLE_TOKEN, CHECK_LOGIN } from '../saga/auth_types';

export function checkGoogleToken(token: string) {
  return {
    type: CHECK_GOOGLE_TOKEN,
    payload: {
      token,
    },
  };
}

export function checkLogin() {
  return {
    type: CHECK_LOGIN,
  };
}
