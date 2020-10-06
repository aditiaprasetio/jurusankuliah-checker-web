import { IAccountData } from '../../interfaces/account.interface';
import {
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_FAILED,
  FETCH_ACCOUNT_SUCCESS,
} from '../saga/account_types';

export interface IAccountState {
  data: IAccountData;
  isFetching: boolean;
}

const initialState: IAccountState = {
  data: {} as any,
  isFetching: false,
};

export default function accountReducer(
  state = initialState,
  action: any,
): IAccountState {
  switch (action.type) {
    case FETCH_ACCOUNT:
      return {
        ...state,
        isFetching: true,
        data: {} as any,
      };
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case FETCH_ACCOUNT_FAILED:
      return {
        ...state,
        isFetching: false,
        data: {} as any,
      };
    default:
      return state;
  }
}
