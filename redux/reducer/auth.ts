import {
  CHECK_GOOGLE_TOKEN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from '../saga/auth_constant';

export interface IAuthState {
  data: {
    access_token: string;
    refresh_token: string;
    google_token: string;
  };
  isFetchingLogin: boolean;
  isLoggedIn: boolean | null;
}

const initialState: IAuthState = {
  data: {} as any,
  isFetchingLogin: false,
  isLoggedIn: false,
};

export default function authReducer(
  state = initialState,
  action: any,
): IAuthState {
  switch (action.type) {
    case CHECK_GOOGLE_TOKEN:
      return {
        ...state,
        isFetchingLogin: true,
        isLoggedIn: null,
        data: {} as any,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetchingLogin: false,
        isLoggedIn: true,
        data: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isFetchingLogin: false,
        isLoggedIn: false,
        data: {} as any,
      };
    default:
      return state;
  }
}
