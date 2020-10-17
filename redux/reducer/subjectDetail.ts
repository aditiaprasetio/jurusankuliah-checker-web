import { ISubjectDetailData } from '../../interfaces/subjectDetail.interface';
import {
  CREATE_MANY_SUBJECT_DETAIL,
  CREATE_MANY_SUBJECT_DETAIL_FAILED,
  CREATE_MANY_SUBJECT_DETAIL_SUCCESS,
  FETCH_MY_SUBJECT_DETAIL,
  FETCH_MY_SUBJECT_DETAIL_FAILED,
  FETCH_MY_SUBJECT_DETAIL_SUCCESS,
} from '../saga/subjectDetail_types';

export interface ISubjectDetailState {
  my_list: ISubjectDetailData[];
  isFetching: boolean;
}

const initialState: ISubjectDetailState = {
  my_list: [],
  isFetching: false,
};

export default function subjectDetailReducer(
  state = initialState,
  action: any,
): ISubjectDetailState {
  switch (action.type) {
    case FETCH_MY_SUBJECT_DETAIL:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_MY_SUBJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        my_list: action.payload,
      };
    case FETCH_MY_SUBJECT_DETAIL_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case CREATE_MANY_SUBJECT_DETAIL:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_MANY_SUBJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        my_list: action.payload,
      };
    case CREATE_MANY_SUBJECT_DETAIL_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
