import axios from 'axios';

export function apiLoginByGoogle(id_token: string) {
  // https://oauth2.googleapis.com/tokeninfo?id_token=XYZ123
  return axios({
    url: process.env.NEXT_PUBLIC_URL_AUTH_SERVICE + '/auth/login-via-google',
    method: 'POST',
    data: {
      id_token,
    },
  });
}
