import axios from 'axios';

export function apiFetchMyAccount(headers: any) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_AUTH_SERVICE + '/account/custom/getMyProfile',
    method: 'GET',
    headers,
  });
}

export function apiFetchAccount(id: string, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_AUTH_SERVICE + '/account/' + id,
    method: 'GET',
    headers,
  });
}
