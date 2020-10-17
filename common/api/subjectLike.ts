import axios from 'axios';
import { ISubjectLikeData } from '../../interfaces/subjectLike.interface';

export function apiFetchListSubjectLike(
  queryString: string | null = null,
  headers: any,
) {
  return axios({
    url:
      process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE +
      '/subjectlike' +
      (queryString ? '?' + queryString : ''),
    method: 'GET',
    headers,
  });
}

export function apiCreateOneSubjectLike(data: ISubjectLikeData, headers: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subjectlike',
    method: 'POST',
    data,
    headers,
  });
}

export function apiCreateBulkSubjectLike(
  data: ISubjectLikeData[],
  headers: any,
) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/subjectlike/bulk',
    method: 'POST',
    data: {
      bulk: data,
    },
    headers,
  });
}
