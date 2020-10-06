import { FETCH_ACCOUNT } from '../saga/account_types';

export function fetchAccount(id: string) {
  return {
    type: FETCH_ACCOUNT,
    payload: {
      id,
    },
  };
}
