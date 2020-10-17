import { FETCH_SURVEY_COMPLETION } from '../saga/survey_types';

export function fetchSurveyCompletion() {
  return {
    type: FETCH_SURVEY_COMPLETION,
  };
}
