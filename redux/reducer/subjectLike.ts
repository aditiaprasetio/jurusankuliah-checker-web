import { ISubjectLikeData } from '../../interfaces/subjectLike.interface';
import {
  CREATE_MANY_SUBJECT_LIKE,
  CREATE_MANY_SUBJECT_LIKE_FAILED,
  CREATE_MANY_SUBJECT_LIKE_SUCCESS,
  FETCH_MY_SUBJECT_LIKE,
  FETCH_MY_SUBJECT_LIKE_FAILED,
  FETCH_MY_SUBJECT_LIKE_SUCCESS,
} from '../saga/subjectLike_types';

export interface ISubjectLikeState {
  my_list: ISubjectLikeData[];
  isFetching: boolean;
}

const initialState: ISubjectLikeState = {
  my_list: [],
  isFetching: false,
};

export default function subjectLikeReducer(
  state = initialState,
  action: any,
): ISubjectLikeState {
  switch (action.type) {
    case FETCH_MY_SUBJECT_LIKE:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_MY_SUBJECT_LIKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        my_list: action.payload,
      };
    case FETCH_MY_SUBJECT_LIKE_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case CREATE_MANY_SUBJECT_LIKE:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_MANY_SUBJECT_LIKE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        my_list: action.payload,
      };
    case CREATE_MANY_SUBJECT_LIKE_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
