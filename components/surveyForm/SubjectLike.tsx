import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getHeaders } from '../../common/function/function';
import { apiFetchListSubject } from '../../common/api/subject';
import '../../styles/slider.module.css';
import { ISubjectLikeData } from '../../interfaces/subjectLike.interface';
import {
  createManySubjectLike,
  fetchMySubjectLike,
} from '../../redux/action/subjectLike';
import { ISubjectLikeState } from '../../redux/reducer/subjectLike';
import {
  IoIosArrowDropright,
  IoIosCheckmarkCircle,
  IoMdRefresh,
} from 'react-icons/io';
import { DragAndDrop } from '../DragAndDrop';
import { ICheckerProfileState } from '../../redux/reducer/checkerProfile';

const SubjectLike = (props: ISubjectLikeProps) => {
  const [listSubject, setListSubject]: any[] = useState([]);
  const [listSubjectSelected, setListSubjectSelected]: any[] = useState([]);

  const getListSubject = async () => {
    const headers = await getHeaders();

    const res = await apiFetchListSubject('sort=type,ASC', headers);

    if (res && res.data) {
      res.data = res.data.map((item: any) => {
        return {
          ...item,
          content: item.name,
          important_value: 0,
        };
      });
      setListSubject(res.data);
    }
  };

  const save = () => {
    const data: ISubjectLikeData[] = listSubjectSelected.map(
      (item: any, key: number) => {
        return {
          subject_id: item.id,
          order: key,
        };
      },
    );
    props.createManySubjectLike(data);

    props.goToNext();
  };

  const isDisabled = () => {
    if (props.subjectLike.isFetching) {
      return true;
    } else if (listSubjectSelected.length === 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getListSubject();
  }, []);

  if (props.subjectLike.my_list.length > 0) {
    return (
      <div className="lg:w-2/3 md:w-2/3 w-full p-3">
        <div
          className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1 mr-3">
              <IoIosCheckmarkCircle size={40} className="text-green-500" />
            </div>
            <div>
              <p className="font-bold">Makasih ya...</p>
              <p className="text-sm">Kamu sudah mengisi survey ini.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-2/3 md:w-2/3 w-full p-3">
      <div className="w-full">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="font-bold">
            Pilih dan urutkan mapel yang paling kamu suka!
          </h2>
          <p className="text-base text-gray-500">
            Geser ke kanan mata pelajaran yang paling kamu suka. Urutkan juga
            dari yang paling kamu suka (paling atas adalah yang paling disukai).
          </p>

          {props.checkerProfile.data.department &&
            props.checkerProfile.data.department.department_family && (
              <div
                className="mr-5 my-5"
                style={{
                  borderLeftColor: '#333',
                  borderLeftWidth: 5,
                  padding: 5,
                }}
              >
                <span>Jurusanmu:</span>
                <h2 className="font-bold">
                  {props.checkerProfile.data.department.department_family.name}
                </h2>
              </div>
            )}

          <div className="flex flex-row my-5">
            <DragAndDrop
              titleItems="Daftar Mata Pelajaran"
              titleSelected="Mapel Yang Disukai"
              items={listSubject}
              selected={listSubjectSelected}
              setItems={(data: any[]) => setListSubject(data)}
              setSelected={(data: any[]) => setListSubjectSelected(data)}
            />
          </div>

          <div className="text-center">
            <button
              disabled={isDisabled()}
              onClick={() => {
                isDisabled() ? console.info('disabled') : save();
              }}
              className={
                'w-full align-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ' +
                (isDisabled() ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700')
              }
              type="button"
            >
              {props.subjectLike.isFetching ? (
                <IoMdRefresh className="inline animate-spin" size={28} />
              ) : (
                <IoIosArrowDropright
                  className="inline"
                  size={28}
                ></IoIosArrowDropright>
              )}
              <span> Simpan dan Lanjut</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ISubjectLikeProps {
  subjectLike: ISubjectLikeState;
  checkerProfile: ICheckerProfileState;
  createManySubjectLike: (data: ISubjectLikeData[]) => void;
  goToNext: () => void;
}

const mapStateToProps = (state: any) => {
  return {
    subjectLike: state.subjectLikeReducer,
    checkerProfile: state.checkerProfileReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createManySubjectLike: (data: any[]) =>
      dispatch(createManySubjectLike(data)),
    fetchMySubjectLike: () => dispatch(fetchMySubjectLike()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectLike);
