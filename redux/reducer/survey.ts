import {
  FETCH_SURVEY_COMPLETION,
  FETCH_SURVEY_COMPLETION_FAILED,
  FETCH_SURVEY_COMPLETION_SUCCESS,
} from '../saga/survey_types';

export interface ISurveyState {
  listSidebar: any[];
  isFetching: boolean;
  isPejuang: boolean | null;
}

const initialState: ISurveyState = {
  listSidebar: [],
  isFetching: false,
  isPejuang: null,
};

export default function surveyReducer(
  state = initialState,
  action: any,
): ISurveyState {
  switch (action.type) {
    case FETCH_SURVEY_COMPLETION:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SURVEY_COMPLETION_SUCCESS:
      return {
        ...state,
        listSidebar: action.payload.listSidebar,
        isFetching: false,
        isPejuang: action.payload.isPejuang,
      };
    case FETCH_SURVEY_COMPLETION_FAILED:
      return {
        ...state,
        isFetching: false,
        isPejuang: null,
      };
    default:
      return state;
  }
}
