import { ISubjectLikeData } from '../../interfaces/subjectLike.interface';
import {
  CREATE_MANY_SUBJECT_LIKE,
  FETCH_MY_SUBJECT_LIKE,
} from '../saga/subjectLike_types';

export function createManySubjectLike(data: ISubjectLikeData[]) {
  return {
    type: CREATE_MANY_SUBJECT_LIKE,
    payload: data,
  };
}

export function fetchMySubjectLike() {
  return {
    type: FETCH_MY_SUBJECT_LIKE,
  };
}
