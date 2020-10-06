import { APP_AUTH_DATA } from './constant/auth';

export function getHeaders() {
  let appAuthData: any = window.localStorage.getItem(APP_AUTH_DATA);
  if (appAuthData) {
    appAuthData = JSON.parse(appAuthData);
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + appAuthData.access_token,
    };
  } else {
    return null;
  }
}
