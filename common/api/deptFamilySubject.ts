import axios from 'axios';
import { IDeptFamilySubjectData } from '../../interfaces/deptFamilySubject.interface';

export function apiFetchListDeptFamilySubject(
  queryString: string | null = null,
  headers: any,
) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/deptfamilysubject' +
      (queryString ? '?' + queryString : ''),
    method: 'GET',
    headers,
  });
}

export function apiCreateOneDeptFamilySubject(
  data: IDeptFamilySubjectData,
  headers: any,
) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/deptfamilysubject',
    method: 'POST',
    data,
    headers,
  });
}

export function apiCreateBulkDeptFamilySubject(
  data: IDeptFamilySubjectData[],
  headers: any,
) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/deptfamilysubject/bulk',
    method: 'POST',
    data: {
      bulk: data,
    },
    headers,
  });
}
