import { ICheckerProfileData } from '../../interfaces/checkerProfile.interface';
import {
  CREATE_ONE_CHECKER_PROFILE,
  FETCH_ONE_CHECKER_PROFILE,
  UPDATE_ONE_CHECKER_PROFILE,
} from '../saga/checkerProfile_types';

export function fetchOneCheckerProfile() {
  return {
    type: FETCH_ONE_CHECKER_PROFILE,
  };
}

export function createOneCheckerProfile(data: ICheckerProfileData) {
  return {
    type: CREATE_ONE_CHECKER_PROFILE,
    payload: data,
  };
}

export function updateOneCheckerProfile(data: ICheckerProfileData) {
  return {
    type: UPDATE_ONE_CHECKER_PROFILE,
    payload: data,
  };
}
