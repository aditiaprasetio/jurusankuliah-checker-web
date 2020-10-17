import { IDeptFamilySubjectData } from '../../interfaces/deptFamilySubject.interface';
import {
  CREATE_MANY_DEPT_FAMILY_SUBJECT,
  FETCH_MY_DEPT_FAMILY_SUBJECT,
} from '../saga/deptFamilySubject_types';

export function createManyDeptFamilySubject(data: IDeptFamilySubjectData[]) {
  return {
    type: CREATE_MANY_DEPT_FAMILY_SUBJECT,
    payload: data,
  };
}

export function fetchMyDeptFamilySubject() {
  return {
    type: FETCH_MY_DEPT_FAMILY_SUBJECT,
  };
}
