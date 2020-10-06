import { CHECK_GOOGLE_TOKEN } from '../saga/auth_constant';

export function checkGoogleToken(token: string) {
  return {
    type: CHECK_GOOGLE_TOKEN,
    payload: {
      token,
    },
  };
}
