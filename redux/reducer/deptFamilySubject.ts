import { IDeptFamilySubjectData } from '../../interfaces/deptFamilySubject.interface';
import {
  CREATE_MANY_DEPT_FAMILY_SUBJECT,
  CREATE_MANY_DEPT_FAMILY_SUBJECT_FAILED,
  CREATE_MANY_DEPT_FAMILY_SUBJECT_SUCCESS,
  FETCH_MY_DEPT_FAMILY_SUBJECT,
  FETCH_MY_DEPT_FAMILY_SUBJECT_FAILED,
  FETCH_MY_DEPT_FAMILY_SUBJECT_SUCCESS,
} from '../saga/deptFamilySubject_types';

export interface IDeptFamilySubjectState {
  my_list: IDeptFamilySubjectData[];
  isFetching: boolean;
}

const initialState: IDeptFamilySubjectState = {
  my_list: [],
  isFetching: false,
};

export default function deptFamilySubjectReducer(
  state = initialState,
  action: any,
): IDeptFamilySubjectState {
  switch (action.type) {
    case FETCH_MY_DEPT_FAMILY_SUBJECT:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_MY_DEPT_FAMILY_SUBJECT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        my_list: action.payload,
      };
    case FETCH_MY_DEPT_FAMILY_SUBJECT_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case CREATE_MANY_DEPT_FAMILY_SUBJECT:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_MANY_DEPT_FAMILY_SUBJECT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        my_list: action.payload,
      };
    case CREATE_MANY_DEPT_FAMILY_SUBJECT_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
