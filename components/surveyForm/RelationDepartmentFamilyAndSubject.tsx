import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getHeaders } from '../../common/function/function';
import { apiFetchListSubject } from '../../common/api/subject';
import '../../styles/slider.module.css';
import { IDeptFamilySubjectData } from '../../interfaces/deptFamilySubject.interface';
import {
  createManyDeptFamilySubject,
  fetchMyDeptFamilySubject,
} from '../../redux/action/deptFamilySubject';
import { IDeptFamilySubjectState } from '../../redux/reducer/deptFamilySubject';
import {
  IoIosArrowDropright,
  IoIosCheckmarkCircle,
  IoIosWarning,
  IoMdRefresh,
} from 'react-icons/io';
import { DragAndDrop } from '../DragAndDrop';
import { ICheckerProfileState } from '../../redux/reducer/checkerProfile';

const RelationDepartmentFamilyAndSubject = (
  props: IRelationDepartmentFamilyAndSubjectProps,
) => {
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

  const setFormSubject = (id: string, value: any) => {
    let list: any[] = listSubjectSelected;
    list = list.map((item: any) => {
      if (item.id === id) {
        item.important_value = value;
      }
      return item;
    });
    setListSubjectSelected(list);
  };

  const save = () => {
    const data: IDeptFamilySubjectData[] = listSubjectSelected.map(
      (item: any) => {
        return {
          subject_id: item.id,
          departmentfamily_id:
            props.checkerProfile.data.department.department_family_id,
          important_value: item.important_value,
        };
      },
    );
    props.createManyDeptFamilySubject(data);

    props.goToNext();
  };

  const isDisabled = () => {
    if (props.deptFamilySubject.isFetching) {
      return true;
    } else if (listSubjectSelected.length === 0) {
      return true;
    } else if (
      listSubjectSelected.find((item: any) => item.important_value <= 0)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getListSubject();
  }, []);

  if (
    !props.checkerProfile.data.department ||
    (props.checkerProfile.data.department &&
      !props.checkerProfile.data.department.department_family_id)
  ) {
    return (
      <div className="lg:w-2/3 md:w-2/3 w-full p-3">
        <div
          className="bg-blue-100 border-t-4 border-pink-500 rounded-b text-pink-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1 mr-3">
              <IoIosWarning size={40} className="text-pink-500" />
            </div>
            <div>
              <p className="font-bold">Eh bentar...</p>
              <p className="text-sm">
                Kamu belum menentukan jurusan. Isi dulu form di halaman
                sebelumnya.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.deptFamilySubject.my_list.length > 0) {
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
            Pilih dan urutkan mapel yang paling berkaitan dengan jurusanmu!
          </h2>
          <p className="text-base text-gray-500">
            Geser ke kanan mata pelajaran yang paling berkaitan dengan
            jurusanmu. Urutkan juga dari yang paling berkaitan (atas).
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
              titleSelected="Mapel Yang Berkaitan"
              items={listSubject}
              selected={listSubjectSelected}
              setItems={(data: any[]) => setListSubject(data)}
              setSelected={(data: any[]) => setListSubjectSelected(data)}
            />
          </div>

          {listSubjectSelected.length > 0 && (
            <div>
              <h2 className="font-bold">
                Berdasarkan mata pelajaran yang kamu anggap berkaitan dengan
                jurusanmu, seberapa berkaitan/penting/dibutuhkan mata pelajaran
                itu?
              </h2>
              {listSubjectSelected.map((item: any, key: number) => (
                <div className="mt-3" key={key}>
                  <h2 className="font-bold">
                    {key + 1}. {item.name}
                  </h2>
                  <div className="mt-4 flex flex-row flex-wrap flex-between-space px-3">
                    <div className="flex-1 text-blue-500">
                      Tingkat Pengaruh: {item.important_value}%
                    </div>
                  </div>
                  <div className="mb-4 flex flex-row flex-wrap px-3">
                    <div className="slidecontainer flex-grow">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={item.important_value}
                        className="slider bg-pink-500"
                        onChange={(event) =>
                          setFormSubject(item.id, event.target.value)
                        }
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
              {props.deptFamilySubject.isFetching ? (
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

interface IRelationDepartmentFamilyAndSubjectProps {
  deptFamilySubject: IDeptFamilySubjectState;
  checkerProfile: ICheckerProfileState;
  createManyDeptFamilySubject: (data: IDeptFamilySubjectData[]) => void;
  goToNext: () => void;
}

const mapStateToProps = (state: any) => {
  return {
    deptFamilySubject: state.deptFamilySubjectReducer,
    checkerProfile: state.checkerProfileReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createManyDeptFamilySubject: (data: any[]) =>
      dispatch(createManyDeptFamilySubject(data)),
    fetchMyDeptFamilySubject: () => dispatch(fetchMyDeptFamilySubject()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelationDepartmentFamilyAndSubject);
