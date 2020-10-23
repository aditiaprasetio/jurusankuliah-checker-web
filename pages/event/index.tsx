import { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchSurveyCompletion } from '../../redux/action/survey';
import { IAccountState } from '../../redux/reducer/account';
import { IAuthState } from '../../redux/reducer/auth';
import { ICheckerProfileState } from '../../redux/reducer/checkerProfile';
import { ISubjectDetailState } from '../../redux/reducer/subjectDetail';
import { ISurveyState } from '../../redux/reducer/survey';
import { IDeptFamilySubjectState } from '../../redux/reducer/deptFamilySubject';
import { ISubjectLikeState } from '../../redux/reducer/subjectLike';

const JurusanChecker = (props: IJurusanCheckerProps) => {
  useEffect(() => {
    props.fetchSurveyCompletion();
  }, []);

  return (
    <Layout title="Ini Rekomendasi Buat Kamu">
      {props.survey.isFetching ? (
        <div className="text-center">
          Bentar ya... <br />
          Lagi nyiapin data penting buat kamu...
        </div>
      ) : (
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col w-full lg:w-1/3 md:w-1/3 p-3 bg-gray-200">
            Info Event, Submit Event, Info Lowongan Kerjaan
          </div>
          <div className="flex flex-col w-full lg:w-2/3 md:w-2/3 p-3 p-3">
            <div>
              <h2 className="font-bold">Jurusan Yang Mungkin Cocok</h2>
              <div>Test</div>
            </div>

            <div>
              <h2 className="font-bold">Artikel Terkait Jurusan</h2>
              <div></div>
            </div>

            <div>
              <h2 className="font-bold">Lagi Hangat</h2>
              <div></div>
            </div>

            <div>
              <h2 className="font-bold">Persiapan</h2>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

interface IJurusanCheckerProps {
  auth: IAuthState;
  survey: ISurveyState;
  account: IAccountState;
  deptFamilySubject: IDeptFamilySubjectState;
  checkerProfile: ICheckerProfileState;
  subjectDetail: ISubjectDetailState;
  subjectLike: ISubjectLikeState;
  fetchSurveyCompletion: () => void;
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.authReducer,
    account: state.accountReducer,
    checkerProfile: state.checkerProfileReducer,
    subjectDetail: state.subjectDetailReducer,
    subjectLike: state.subjectLikeReducer,
    survey: state.surveyReducer,
    deptFamilySubject: state.deptFamilySubjectReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSurveyCompletion: () => dispatch(fetchSurveyCompletion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JurusanChecker);
