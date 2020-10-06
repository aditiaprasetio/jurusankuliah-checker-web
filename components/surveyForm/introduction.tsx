import { useState } from 'react';
import {
  IoIosPeople,
  IoIosPerson,
  IoIosRocket,
  IoIosSchool,
} from 'react-icons/io';
import { ECurrentProfileStatus } from '../../interfaces/checkerProfile.interface';

const IntroductionForm = () => {
  const [currentStatus, setCurrentStatus]: any = useState(null);
  const [universityId, setUniversityId]: any = useState(null);
  const [wantUniversityId, setWantUniversityId]: any = useState(null);
  const [departmentId, setDepartmentId]: any = useState(null);
  const [wantDepartmentId, setWantDepartmentId]: any = useState(null);
  const [univDeptId, setUnivDeptId]: any = useState(null);
  const [wantUnivDeptId, setWantUnivDeptId]: any = useState(null);

  return (
    <div className="lg:w-2/3 md:w-2/3 w-full p-3">
      <div className="w-full">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <h2 className="font-bold">1. Kamu Termasuk Yang Mana?</h2>
            <div className="mb-4 flex flex-row flex-wrap">
              <div
                className="w-1/3 p-2 text-center cursor-pointer"
                onClick={() =>
                  setCurrentStatus(ECurrentProfileStatus.PEJUANG_KULIAH)
                }
              >
                <div
                  className={
                    'flex flex-col w-full p-2 hover:bg-blue-500 ' +
                    (currentStatus === ECurrentProfileStatus.PEJUANG_KULIAH
                      ? 'bg-blue-500'
                      : 'bg-gray-200')
                  }
                >
                  <IoIosPerson size={40} className="w-full" />
                  <div>Pejuang Kuliah</div>
                </div>
              </div>
              <div
                className="w-1/3 p-2 text-center cursor-pointer"
                onClick={() =>
                  setCurrentStatus(ECurrentProfileStatus.MAHASISWA)
                }
              >
                <div
                  className={
                    'flex flex-col w-full p-2 hover:bg-blue-500 ' +
                    (currentStatus === ECurrentProfileStatus.MAHASISWA
                      ? 'bg-blue-500'
                      : 'bg-gray-200')
                  }
                >
                  <IoIosSchool size={40} className="w-full" />
                  <div>Masih Kuliah (Mahasiswa)</div>
                </div>
              </div>
              <div
                className="w-1/3 p-2 text-center cursor-pointer"
                onClick={() =>
                  setCurrentStatus(ECurrentProfileStatus.LULUS_KULIAH)
                }
              >
                <div
                  className={
                    'flex flex-col w-full p-2 hover:bg-blue-500 ' +
                    (currentStatus === ECurrentProfileStatus.LULUS_KULIAH
                      ? 'bg-blue-500'
                      : 'bg-gray-200')
                  }
                >
                  <IoIosRocket size={40} className="w-full" />
                  <div>Sudah Lulus Kuliah</div>
                </div>
              </div>
            </div>
          </div>

          {(currentStatus === ECurrentProfileStatus.LULUS_KULIAH ||
            currentStatus === ECurrentProfileStatus.MAHASISWA) && (
            <div>
              <h2 className="font-bold">2. Kuliah Dimana?</h2>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="university_id"
                >
                  Universitas
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="university_id"
                  type="text"
                />
                <p className="text-red-500 text-xs italic">
                  Please choose a text.
                </p>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="department_id"
                >
                  Jurusan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="department_id"
                  type="text"
                />
              </div>
            </div>
          )}

          {currentStatus === ECurrentProfileStatus.PEJUANG_KULIAH && (
            <div>
              <h2 className="font-bold">2. Pengen Kuliah Dimana?</h2>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="want_university_id"
                >
                  Universitas
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="want_university_id"
                  type="text"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="want_department_id"
                >
                  Jurusan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="want_department_id"
                  type="text"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntroductionForm;
