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

export function apiUpdateDepartment(id: string, data: any, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/department/' + id,
    method: 'PATCH',
    data,
    headers,
  });
}
