import axios from 'axios';
import { ISubjectDetailData } from '../../interfaces/subjectDetail.interface';

export function apiFetchListSubjectDetail(query: string = '', headers: any) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/subject_detail' +
      (query ? '?' + query : ''),
    method: 'GET',
    headers,
  });
}

export function apiCreateOneSubjectDetail(
  data: ISubjectDetailData,
  headers: any,
) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subject_detail',
    method: 'POST',
    data,
    headers,
  });
}

export function apiCreateBulkSubjectDetail(
  data: ISubjectDetailData[],
  headers: any,
) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subject_detail/bulk',
    method: 'POST',
    data: {
      bulk: data,
    },
    headers,
  });
}

export function apiFetchOneSubjectDetail(id: string, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subject_detail/' + id,
    method: 'GET',
    headers,
  });
}

export function apiFetchSubjectDetailAverage() {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/subject_detail/custom/getAverage',
    method: 'GET',
  });
}
