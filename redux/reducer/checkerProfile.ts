import { ICheckerProfileData } from '../../interfaces/checkerProfile.interface';
import {
  CREATE_ONE_CHECKER_PROFILE,
  CREATE_ONE_CHECKER_PROFILE_FAILED,
  CREATE_ONE_CHECKER_PROFILE_SUCCESS,
  FETCH_ONE_CHECKER_PROFILE,
  FETCH_ONE_CHECKER_PROFILE_FAILED,
  FETCH_ONE_CHECKER_PROFILE_SUCCESS,
  UPDATE_ONE_CHECKER_PROFILE,
  UPDATE_ONE_CHECKER_PROFILE_FAILED,
  UPDATE_ONE_CHECKER_PROFILE_SUCCESS,
} from '../saga/checkerProfile_types';

export interface ICheckerProfileState {
  data: ICheckerProfileData;
  isFetching: boolean;
}

const initialState: ICheckerProfileState = {
  data: {} as any,
  isFetching: false,
};

export default function checkerProfileReducer(
  state = initialState,
  action: any,
): ICheckerProfileState {
  switch (action.type) {
    case FETCH_ONE_CHECKER_PROFILE:
      return {
        ...state,
        isFetching: true,
        data: {} as any,
      };
    case FETCH_ONE_CHECKER_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case FETCH_ONE_CHECKER_PROFILE_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case CREATE_ONE_CHECKER_PROFILE:
      return {
        ...state,
        isFetching: true,
        data: {} as any,
      };
    case CREATE_ONE_CHECKER_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case CREATE_ONE_CHECKER_PROFILE_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case UPDATE_ONE_CHECKER_PROFILE:
      return {
        ...state,
        isFetching: true,
        data: {} as any,
      };
    case UPDATE_ONE_CHECKER_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case UPDATE_ONE_CHECKER_PROFILE_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
