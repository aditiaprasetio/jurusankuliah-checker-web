import { useEffect, useState } from 'react';
import {
  IoIosCheckmarkCircleOutline,
  IoIosRemoveCircleOutline,
  IoIosThumbsUp,
} from 'react-icons/io';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import DepartmentFamily from '../../components/surveyForm/DepartmentFamily';
import RelationDepartmentFamilyAndSubject from '../../components/surveyForm/RelationDepartmentFamilyAndSubject';
import IntroductionForm from '../../components/surveyForm/Introduction';
import SubjectSurvey from '../../components/surveyForm/SubjectSurvey';
import { fetchSurveyCompletion } from '../../redux/action/survey';
import { IAccountState } from '../../redux/reducer/account';
import { IAuthState } from '../../redux/reducer/auth';
import { ICheckerProfileState } from '../../redux/reducer/checkerProfile';
import { ISubjectDetailState } from '../../redux/reducer/subjectDetail';
import { ISurveyState } from '../../redux/reducer/survey';
import { IDeptFamilySubjectState } from '../../redux/reducer/deptFamilySubject';
import SubjectLike from '../../components/surveyForm/SubjectLike';
import { ISubjectLikeState } from '../../redux/reducer/subjectLike';

const Dashboard = (props: IDashboardProps) => {
  const [selected, setSelected] = useState(1);

  const isDone = (menuId: number) => {
    if (props.survey.isPejuang === true) {
      if (menuId === 1) {
        if (
          props.checkerProfile.data.current_status &&
          props.checkerProfile.data.current_status != '' &&
          props.checkerProfile.data.want_department_id
        ) {
          return true;
        }
      } else if (menuId === 2) {
        if (props.subjectLike.my_list.length > 0) {
          return true;
        }
      }
    } else if (props.survey.isPejuang === false) {
      if (menuId === 1) {
        if (
          props.checkerProfile.data.current_status &&
          props.checkerProfile.data.current_status != '' &&
          props.checkerProfile.data.department_id
        ) {
          return true;
        }
      } else if (menuId === 2) {
        if (props.subjectDetail.my_list.length > 0) {
          return true;
        }
      } else if (menuId === 3) {
        if (
          props.checkerProfile.data.department &&
          props.checkerProfile.data.department.department_family
        ) {
          return true;
        }
      } else if (menuId === 4) {
        if (props.deptFamilySubject.my_list.length > 0) {
          return true;
        }
      }
    }
    return false;
  };

  const isDoneAll = () => {
    let isDoneAllMenu = true;
    for (const menu of props.survey.listSidebar) {
      if (!isDone(menu.id)) {
        isDoneAllMenu = false;
      }
    }
    return isDoneAllMenu;
  };

  useEffect(() => {
    props.fetchSurveyCompletion();
  }, []);

  const renderSidebarContent = () => {
    if (props.survey.isPejuang === true) {
      if (selected === 1) {
        return <IntroductionForm goToNext={() => setSelected(2)} />;
      } else if (selected === 2) {
        return <SubjectLike goToNext={() => setSelected(1)} />;
      }
    } else if (props.survey.isPejuang === false) {
      if (selected === 1) {
        return <IntroductionForm goToNext={() => setSelected(2)} />;
      } else if (selected === 2) {
        return <SubjectSurvey goToNext={() => setSelected(3)} />;
      } else if (selected === 3) {
        return <DepartmentFamily goToNext={() => setSelected(4)} />;
      } else if (selected === 4) {
        return (
          <RelationDepartmentFamilyAndSubject goToNext={() => setSelected(1)} />
        );
      }
    }
  };

  return (
    <Layout
      title={
        props.account.data.id
          ? 'Welcome, ' +
            props.account.data.first_name +
            ' ' +
            props.account.data.last_name
          : 'Welcome to Jurusan Checker (JUKER)'
      }
    >
      {isDoneAll() && (
        <div className="mb-5">
          <div
            className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1 mr-3">
                <IoIosThumbsUp size={40} className="text-blue-500" />
              </div>
              <div>
                <p className="font-bold">Wah keren...</p>
                <p className="text-sm">
                  Kamu sudah melengkapi semua data. Terimakasih ya... Ajak juga
                  teman/saudaramu untuk ikut berpartisipasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.survey.isFetching ? (
        <div className="text-center">
          Bentar ya... <br />
          Lagi nyiapin data penting buat kamu...
        </div>
      ) : (
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col w-full lg:w-1/3 md:w-1/3 p-3 bg-gray-200">
            {props.survey.listSidebar.map((item: any) => {
              return (
                <div
                  onClick={() => setSelected(item.id)}
                  className={
                    'flex flex-row p-3 hover:bg-gray-400 cursor-pointer ' +
                    (item.id === selected ? 'bg-gray-400' : '')
                  }
                  style={
                    item.id === selected
                      ? {
                          borderLeftColor: 'blue',
                          borderLeftWidth: 3,
                        }
                      : {}
                  }
                >
                  <div className="w-12">
                    <div className="rounded-lg">
                      {isDone(item.id) ? (
                        <IoIosCheckmarkCircleOutline size={40} color="blue" />
                      ) : (
                        <IoIosRemoveCircleOutline size={40} color="grey" />
                      )}
                    </div>
                  </div>
                  <div className="flex-auto">
                    <h2 className="font-bold">{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {renderSidebarContent()}
        </div>
      )}
    </Layout>
  );
};

interface IDashboardProps {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
