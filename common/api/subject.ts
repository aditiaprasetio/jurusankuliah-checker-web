import axios from 'axios';

export function apiFetchListSubject(query: string = '', headers: any) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/subject' +
      (query ? '?' + query : ''),
    method: 'GET',
    headers,
  });
}

export function apiCreateOneSubject(data: any, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subject',
    method: 'POST',
    data,
    headers,
  });
}

export function apiFetchOneSubject(id: string, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subject/' + id,
    method: 'GET',
    headers,
  });
}
