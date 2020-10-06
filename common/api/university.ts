import axios from 'axios';

export function apiFetchListUniversity(query: string = '', headers: any) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/university' +
      (query ? '?' + query : ''),
    method: 'GET',
    headers,
  });
}

export function apiCreateOneUniversity(data: any, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/university',
    method: 'POST',
    data,
    headers,
  });
}

export function apiFetchOneUniversity(id: string, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/university/' + id,
    method: 'GET',
    headers,
  });
}
