import { ISubjectDetailData } from '../../interfaces/subjectDetail.interface';
import {
  CREATE_MANY_SUBJECT_DETAIL,
  FETCH_MY_SUBJECT_DETAIL,
} from '../saga/subjectDetail_types';

export function createManySubjectDetail(data: ISubjectDetailData[]) {
  return {
    type: CREATE_MANY_SUBJECT_DETAIL,
    payload: data,
  };
}

export function fetchMySubjectDetail() {
  return {
    type: FETCH_MY_SUBJECT_DETAIL,
  };
}
