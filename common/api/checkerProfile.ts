import axios from 'axios';

export function fetchCheckerProfile(id: string) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/profile/' + id,
    method: 'GET',
  });
}

export function updateCheckerProfile(data: any) {
  return axios({
    url: process.env.NEXT_PUBLIC_URL_CHECKER_SERVICE + '/profile',
    method: 'POST',
    data,
  });
}
