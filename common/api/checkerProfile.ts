import axios from 'axios';

export function apiFetchOneCheckerProfile(id: string, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/profile/' + id,
    method: 'GET',
    headers,
  });
}

export function apiCreateOneCheckerProfile(data: any, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/profile',
    method: 'POST',
    data,
    headers,
  });
}

export function apiUpdateOneCheckerProfile(
  id: string,
  data: any,
  headers: any,
) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/profile/' + id,
    method: 'PATCH',
    data,
    headers,
  });
}
