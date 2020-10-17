import axios from 'axios';

export function apiFetchListDepartmentFamily(
  queryString: string | null = null,
  headers: any,
) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/departmentfamily' +
      (queryString ? '?' + queryString : ''),
    method: 'GET',
    headers,
  });
}

export function apiCreateOneDepartmentFamily(data: any, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/departmentfamily',
    method: 'POST',
    data,
    headers,
  });
}
