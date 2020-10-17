import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  IoIosArrowDropright,
  IoIosCheckmarkCircle,
  IoIosPerson,
  IoIosRocket,
  IoIosSchool,
  IoMdRefresh,
} from 'react-icons/io';
import { ECurrentProfileStatus } from '../../interfaces/checkerProfile.interface';
import { ICheckerProfileState } from '../../redux/reducer/checkerProfile';
import {
  createOneCheckerProfile,
  updateOneCheckerProfile,
} from '../../redux/action/checkerProfile';
import { ModalCreateUniversityAndDepartment } from './ModalCreateUniversityAndDepartment';
import { apiFetchListDepartment } from '../../common/api/department';
import { getHeaders } from '../../common/function/function';
import { search } from '../../common/function/search';
import {
  APP_LATEST_GET_LIST_UNIV_DEPT,
  APP_LIST_UNIV_DEPT,
} from '../../common/constant/univdept';

const IntroductionForm = (props: IIntroductionFormProps) => {
  const [currentStatus, setCurrentStatus]: any = useState(null);
  const [isShowModal, setShowModal]: any = useState(false);
  const [
    isShowModalAddUniversityAndDepartment,
    setShowModalAddUniversityAndDepartment,
  ]: any = useState(false);
  const [listDept, setListDept]: any = useState([]);
  const [listDeptTable, setListDeptTable]: any = useState([]);
  const [
    isShowModalConfirmSetCurrentStatus,
    setIsShowModalConfirmSetCurrentStatus,
  ] = useState(false);

  const isDisabled = () => {
    return (
      !(
        (props.checkerProfile.data.current_status &&
          props.checkerProfile.data.department_id) ||
        (props.checkerProfile.data.current_status &&
          props.checkerProfile.data.want_department_id)
      ) || props.checkerProfile.isFetching
    );
  };

  const saveCurrentStatus = () => {
    if (props.checkerProfile.data.id) {
      console.info('update');
      props.updateOneCheckerProfile({
        id: props.checkerProfile.data.id,
        current_status: currentStatus,
      });
    } else {
      console.info('create');
      props.createOneCheckerProfile({ current_status: currentStatus });
    }
  };

  const setDepartmentId = (data: any) => {
    if (
      props.checkerProfile.data.current_status ===
        ECurrentProfileStatus.LULUS_KULIAH ||
      props.checkerProfile.data.current_status ===
        ECurrentProfileStatus.MAHASISWA
    ) {
      props.updateOneCheckerProfile({
        id: props.checkerProfile.data.id,
        department_id: data,
      });
    } else if (
      props.checkerProfile.data.current_status ===
      ECurrentProfileStatus.PEJUANG_KULIAH
    ) {
      props.updateOneCheckerProfile({
        id: props.checkerProfile.data.id,
        want_department_id: data,
      });
    }
    setShowModal(false);
  };

  const getListDepartment = async (forceFetchFromApi: boolean = false) => {
    const headers = await getHeaders();

    let dataFromStorage: any = await window.localStorage.getItem(
      APP_LIST_UNIV_DEPT,
    );
    const latestGet: any = await window.localStorage.getItem(
      APP_LATEST_GET_LIST_UNIV_DEPT,
    );

    const diffInSecond = latestGet
      ? (new Date(latestGet).getTime() - new Date().getTime()) / 1000
      : 0;

    if (dataFromStorage && diffInSecond <= 10 * 3600 && !forceFetchFromApi) {
      dataFromStorage = JSON.parse(dataFromStorage);

      setListDept(dataFromStorage);
      setListDeptTable(dataFromStorage);
    } else {
      apiFetchListDepartment(headers).then((res) => {
        if (res && res.data) {
          console.info(res.data);

          res.data = res.data.map((item: any) => {
            return {
              ...item,
              university_name: item.university.name,
            };
          });

          console.info('after', res.data);
          setListDept(res.data);
          setListDeptTable(res.data);
          window.localStorage.setItem(
            APP_LIST_UNIV_DEPT,
            JSON.stringify(res.data),
          );
          window.localStorage.setItem(
            APP_LATEST_GET_LIST_UNIV_DEPT,
            new Date().toISOString(),
          );
          // window.localStorage.setItem();
        }
      });
    }
  };

  const searchByKeyword = (keyword: string) => {
    if (keyword) {
      let list: any[] = search(keyword, listDept, ['university_name', 'name']);
      list = list.filter((item) => item.poin > 0);
      setListDeptTable(list);
    } else {
      setListDeptTable(listDept);
    }
  };

  useEffect(() => {
    getListDepartment();
  }, []);

  return (
    <div className="lg:w-2/3 md:w-2/3 w-full p-3">
      <div className="w-full">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <h2 className="font-bold">1. Kamu Termasuk Yang Mana?</h2>

            {props.checkerProfile.data.current_status ? (
              <div className="mb-5 mt-2">
                <div
                  className="bg-green-100 border-l-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1 mr-3">
                      {props.checkerProfile.data.current_status ===
                      ECurrentProfileStatus.PEJUANG_KULIAH ? (
                        <IoIosPerson size={40} className="text-green-500" />
                      ) : props.checkerProfile.data.current_status ===
                        ECurrentProfileStatus.MAHASISWA ? (
                        <IoIosSchool size={40} className="text-green-500" />
                      ) : props.checkerProfile.data.current_status ===
                        ECurrentProfileStatus.LULUS_KULIAH ? (
                        <IoIosRocket size={40} className="text-green-500" />
                      ) : (
                        false
                      )}
                    </div>
                    <div>
                      <p className="text-sm">
                        {props.checkerProfile.data.current_status ===
                        ECurrentProfileStatus.PEJUANG_KULIAH
                          ? 'Hai, pejuang kuliah. Semangat berjuang ya... Pengen Kuliah akan bantuin kamu nih biar kamu semakin siap dan yakin dalam berjuang masuk ke jenjang perkuliahan.'
                          : props.checkerProfile.data.current_status ===
                            ECurrentProfileStatus.MAHASISWA
                          ? 'Hidup Mahasiswa. Tetap semangat kuliahnya ya... Biar bisa segera lulus. Makasih ya udah meluangkan waktumu untuk berkontribusi di sini.'
                          : props.checkerProfile.data.current_status ===
                            ECurrentProfileStatus.LULUS_KULIAH
                          ? 'Wah, Halo alumni. Sudah melewati masa-masa kuliah, belajar banyak hal, udah siap kerja atau udah kerja malah ya. Makasih ya sudah mau berkontribusi di sini.'
                          : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 flex flex-row flex-wrap">
                <div
                  className="lg:w-1/3 w-full p-2 text-center cursor-pointer"
                  onClick={() => {
                    setCurrentStatus(ECurrentProfileStatus.PEJUANG_KULIAH);
                    setIsShowModalConfirmSetCurrentStatus(true);
                  }}
                >
                  <div
                    className={
                      'flex flex-col w-full p-2 hover:bg-blue-500 ' +
                      (props.checkerProfile.data.current_status ===
                      ECurrentProfileStatus.PEJUANG_KULIAH
                        ? 'bg-blue-500'
                        : 'bg-gray-200')
                    }
                  >
                    <IoIosPerson size={40} className="w-full" />
                    <div>Pejuang Kuliah</div>
                  </div>
                </div>
                <div
                  className="lg:w-1/3 w-full p-2 text-center cursor-pointer"
                  onClick={() => {
                    setCurrentStatus(ECurrentProfileStatus.MAHASISWA);
                    setIsShowModalConfirmSetCurrentStatus(true);
                  }}
                >
                  <div
                    className={
                      'flex flex-col w-full p-2 hover:bg-blue-500 ' +
                      (props.checkerProfile.data.current_status ===
                      ECurrentProfileStatus.MAHASISWA
                        ? 'bg-blue-500'
                        : 'bg-gray-200')
                    }
                  >
                    <IoIosSchool size={40} className="w-full" />
                    <div>Masih Kuliah (Mahasiswa)</div>
                  </div>
                </div>
                <div
                  className="lg:w-1/3 w-full p-2 text-center cursor-pointer"
                  onClick={() => {
                    setCurrentStatus(ECurrentProfileStatus.LULUS_KULIAH);
                    setIsShowModalConfirmSetCurrentStatus(true);
                  }}
                >
                  <div
                    className={
                      'flex flex-col w-full p-2 hover:bg-blue-500 ' +
                      (props.checkerProfile.data.current_status ===
                      ECurrentProfileStatus.LULUS_KULIAH
                        ? 'bg-blue-500'
                        : 'bg-gray-200')
                    }
                  >
                    <IoIosRocket size={40} className="w-full" />
                    <div>Sudah Lulus Kuliah</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {(props.checkerProfile.data.current_status ===
            ECurrentProfileStatus.LULUS_KULIAH ||
            props.checkerProfile.data.current_status ===
              ECurrentProfileStatus.MAHASISWA) && (
            <div>
              <h2 className="font-bold">2. Kuliah Dimana?</h2>
              <div className="mb-6 p-2 flex flex-wrap items-center">
                {props.checkerProfile.data.department && (
                  <div
                    className="mr-5"
                    style={{
                      borderLeftColor: '#333',
                      borderLeftWidth: 5,
                      padding: 5,
                    }}
                  >
                    <h2 className="font-bold">
                      {props.checkerProfile.data.department.name}
                    </h2>
                    <p className="text-base">
                      {props.checkerProfile.data.department.university.name}
                    </p>
                  </div>
                )}
                <div>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded btn-small"
                    type="button"
                  >
                    {props.checkerProfile.data.department_id
                      ? 'Ganti Jurusan'
                      : 'Pilih Jurusan'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {props.checkerProfile.data.current_status ===
            ECurrentProfileStatus.PEJUANG_KULIAH && (
            <div>
              <h2 className="font-bold">2. Kamu Pengen Kuliah Dimana?</h2>
              <div className="mb-6 p-2 flex flex-wrap items-center">
                {props.checkerProfile.data.want_department && (
                  <div
                    className="mr-5"
                    style={{
                      borderLeftColor: '#333',
                      borderLeftWidth: 5,
                      padding: 5,
                    }}
                  >
                    <h2 className="font-bold">
                      {props.checkerProfile.data.want_department.name}
                    </h2>
                    <p className="text-base">
                      {
                        props.checkerProfile.data.want_department.university
                          .name
                      }
                    </p>
                  </div>
                )}
                <div>
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded btn-small"
                    type="button"
                  >
                    {props.checkerProfile.data.want_department_id
                      ? 'Ganti Jurusan'
                      : 'Pilih Jurusan'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <button
              disabled={isDisabled()}
              onClick={() => {
                isDisabled() ? console.info('disabled') : props.goToNext();
              }}
              className={
                'w-full align-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ' +
                (isDisabled() ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700')
              }
              type="button"
            >
              {props.checkerProfile.isFetching ? (
                <IoMdRefresh className="inline animate-spin" size={28} />
              ) : (
                <IoIosArrowDropright
                  className="inline"
                  size={28}
                ></IoIosArrowDropright>
              )}
              <span> Lanjut</span>
            </button>
          </div>
        </form>
      </div>

      {/** MODAL */}
      {isShowModal && (
        <div className="fixed z-5 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div
                  onClick={() => setShowModal(false)}
                  className="text-right text-sm text-gray-600 p-2 mb-3 cursor-pointer"
                >
                  Tutup
                </div>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="keyword"
                  type="text"
                  placeholder="Ketik nama universitas atau jurusan"
                  onChange={(event) => searchByKeyword(event.target.value)}
                />

                {/** TABLE */}
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-64 overflow-scroll">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50"></th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Universitas - Jurusan
                              </th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Jurusan
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {listDeptTable.map((item: any, key: number) => {
                              return (
                                <tr key={key} className="hover:bg-gray-200">
                                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                    <a
                                      href="#"
                                      onClick={() => {
                                        setDepartmentId(item.id);
                                        setShowModal(false);
                                      }}
                                      className="text-indigo-600 hover:text-indigo-900"
                                    >
                                      Pilih
                                    </a>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {item.university_name}
                                    </div>
                                    <div className="text-sm leading-5 text-gray-500">
                                      {item.name}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      SAINS
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto mb-3">
                  <button
                    onClick={() => {
                      setShowModalAddUniversityAndDepartment(true);
                      // setShowModal(false);
                    }}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Universitas atau Jurusan Yang Saya Cari Belum Ada
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/** MODAL */}
      {isShowModalAddUniversityAndDepartment && (
        <ModalCreateUniversityAndDepartment
          setShowModal={(data: boolean) =>
            setShowModalAddUniversityAndDepartment(data)
          }
          selectDepartment={(data: any) => setDepartmentId(data)}
          refreshList={() => getListDepartment(true)}
        />
      )}

      {/** MODAL */}
      {isShowModalConfirmSetCurrentStatus && (
        <div className="fixed z-5 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span className="sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full w-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                Apakah kamu benar-benar{' '}
                <b>
                  {currentStatus === ECurrentProfileStatus.PEJUANG_KULIAH
                    ? 'SEDANG atau AKAN BERJUANG MASUK KULIAH'
                    : currentStatus === ECurrentProfileStatus.LULUS_KULIAH
                    ? 'SUDAH LULUS KULIAH'
                    : currentStatus === ECurrentProfileStatus.MAHASISWA
                    ? 'SEORANG MAHASISWA'
                    : null}
                </b>
                ? Data ini nggak bisa kamu ubah lagi nantinya.
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto mb-3">
                  <button
                    onClick={() => {
                      saveCurrentStatus();
                      setIsShowModalConfirmSetCurrentStatus(false);
                    }}
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Universitas atau Jurusan Yang Saya Cari Belum Ada
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface IIntroductionFormProps {
  checkerProfile: ICheckerProfileState;
  createOneCheckerProfile: (data: any) => void;
  updateOneCheckerProfile: (data: any) => void;
  goToNext: () => void;
}

const mapStateToProps = (state: any) => {
  return {
    checkerProfile: state.checkerProfileReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createOneCheckerProfile: (data: any) =>
      dispatch(createOneCheckerProfile(data)),
    updateOneCheckerProfile: (data: any) =>
      dispatch(updateOneCheckerProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionForm);
