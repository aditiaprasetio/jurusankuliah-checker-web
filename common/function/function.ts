import { APP_AUTH_DATA } from '../constant/auth';
import * as jwt from 'jsonwebtoken';

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

export function getAccountId() {
  let appAuthData: any = window.localStorage.getItem(APP_AUTH_DATA);
  if (appAuthData) {
    appAuthData = JSON.parse(appAuthData);
    const authorization = 'Bearer ' + appAuthData.access_token;

    if (!authorization) return null;
    let token;
    const exp = authorization.split(' ');
    if (exp && exp.length > 0) {
      token = exp[1];
    } else {
      return null;
    }

    const account: any = jwt.decode(token);
    console.info('account', account);

    return account.sub;
  } else {
    return null;
  }
}
