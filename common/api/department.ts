import axios from 'axios';

export function apiFetchListDepartment(headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/department',
    method: 'GET',
    headers,
  });
}

export function apiCreateOneDepartment(data: any, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/department',
    method: 'POST',
    data,
    headers,
  });
}
