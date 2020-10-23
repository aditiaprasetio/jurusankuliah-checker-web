import { put, takeLatest } from 'redux-saga/effects';
import { apiFetchOneCheckerProfile } from '../../common/api/checkerProfile';
import { apiFetchListDeptFamilySubject } from '../../common/api/deptFamilySubject';
import { apiFetchListSubjectDetail } from '../../common/api/subjectDetail';
import { apiFetchListSubjectLike } from '../../common/api/subjectLike';
import { getAccountId, getHeaders } from '../../common/function/function';
import { handleError } from '../../common/function/handleError';
import { ECurrentProfileStatus } from '../../interfaces/checkerProfile.interface';
import { FETCH_ONE_CHECKER_PROFILE } from './checkerProfile_types';
import { FETCH_MY_DEPT_FAMILY_SUBJECT } from './deptFamilySubject_types';
import { FETCH_MY_SUBJECT_DETAIL_SUCCESS } from './subjectDetail_types';
import { FETCH_MY_SUBJECT_LIKE_SUCCESS } from './subjectLike_types';
import {
  FETCH_SURVEY_COMPLETION,
  FETCH_SURVEY_COMPLETION_FAILED,
  FETCH_SURVEY_COMPLETION_SUCCESS,
} from './survey_types';
import { toast } from 'react-toastify';

function* fetchSurveyCompletion() {
  try {
    const headers = yield getHeaders();
    const id = yield getAccountId();

    const listSidebar = [
      {
        id: 1,
        title: 'KENALAN YUK',
        description: 'Tak kenal maka tak sayang',
      },
    ];

    let isPejuang;
    // CHECKER PROFILE
    let resCheckerProfile = yield apiFetchOneCheckerProfile(id, headers);
    if (resCheckerProfile && resCheckerProfile.data) {
      yield put({
        type: FETCH_ONE_CHECKER_PROFILE,
        payload: resCheckerProfile.data,
      });

      if (resCheckerProfile.data.current_status) {
        if (
          resCheckerProfile.data.current_status ===
            ECurrentProfileStatus.LULUS_KULIAH ||
          resCheckerProfile.data.current_status ===
            ECurrentProfileStatus.MAHASISWA
        ) {
          isPejuang = false;
          listSidebar.push({
            id: 2,
            title: 'MATA PELAJARAN',
            description: 'survey singkat tentang mapel',
          });

          // MY SUBJECT DETAIL
          let resMySubjectDetail = yield apiFetchListSubjectDetail(
            `filter[]=created_by_id||eq||${id}`,
            headers,
          );

          if (resMySubjectDetail && resMySubjectDetail.data) {
            yield put({
              type: FETCH_MY_SUBJECT_DETAIL_SUCCESS,
              payload: resMySubjectDetail.data,
            });

            listSidebar.push({
              id: 3,
              title: 'PENGELOMPOKAN JURUSAN',
              description: 'termasuk kelompok yang mana?',
            });
            listSidebar.push({
              id: 4,
              title: 'MAPEL x JURUSAN',
              description: 'pentingkah mapel ini di jurusanmu?',
            });

            // MY DEPT FAMILY SUBJECT
            let resMyDeptFamilySubject = yield apiFetchListDeptFamilySubject(
              `filter[]=created_by_id||eq||${id}`,
              headers,
            );

            if (resMyDeptFamilySubject && resMyDeptFamilySubject.data) {
              yield put({
                type: FETCH_MY_DEPT_FAMILY_SUBJECT,
                payload: resMyDeptFamilySubject.data,
              });
            }
          }
        } else if (
          resCheckerProfile.data.current_status ===
          ECurrentProfileStatus.PEJUANG_KULIAH
        ) {
          isPejuang = true;
          listSidebar.push({
            id: 2,
            title: 'KAMU SUKA YANG MANA?',
            description: 'mapel yang disukai',
          });

          // SUBJECT LIKE
          let resSubjectLike = yield apiFetchListSubjectLike(
            `filter[]=created_by_id||eq||${id}`,
            headers,
          );

          if (resSubjectLike && resSubjectLike.data) {
            yield put({
              type: FETCH_MY_SUBJECT_LIKE_SUCCESS,
              payload: resSubjectLike.data,
            });
          }
        }
      } else {
        // nothing
      }
    }

    yield put({
      type: FETCH_SURVEY_COMPLETION_SUCCESS,
      payload: { listSidebar, isPejuang },
    });
  } catch (e) {
    toast.error('Gagal menyiapkan data! ' + handleError(e));
    yield put({ type: FETCH_SURVEY_COMPLETION_FAILED, message: e.message });
  }
}

function* surveySaga() {
  yield takeLatest(FETCH_SURVEY_COMPLETION, fetchSurveyCompletion);
}

export default surveySaga;
