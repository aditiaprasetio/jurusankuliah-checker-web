import { useEffect, useState } from 'react';
import { apiCreateOneDepartment } from '../../common/api/department';
import {
  apiCreateOneUniversity,
  apiFetchListUniversity,
} from '../../common/api/university';
import { getHeaders } from '../../common/function/function';
import { IoMdRefresh } from 'react-icons/io';
import { debounce } from 'ts-debounce';

type IProps = {
  setShowModal: (data: boolean) => void;
  selectDepartment: (data: string) => void;
  refreshList: () => void;
};

export function ModalCreateUniversityAndDepartment({
  setShowModal,
  selectDepartment,
  refreshList,
}: IProps) {
  const [university, setUniversity] = useState(null);
  const [universityId, setUniversityId] = useState(null);
  const [department, setDepartment] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [listUniv, setListUniv] = useState([]);

  const createData = async () => {
    setLoading(true);
    let resUniv: any;
    let resDept: any;
    const headers = await getHeaders();
    try {
      if (universityId) {
        //
      } else {
        // create university
        resUniv = await apiCreateOneUniversity(
          {
            name: university,
          },
          headers,
        );
      }

      // create department
      resDept = await apiCreateOneDepartment(
        {
          name: department,
          university_id: universityId
            ? universityId
            : resUniv && resUniv.data
            ? resUniv.data.id
            : null,
        },
        headers,
      );

      if (resDept && resDept.data) {
        selectDepartment(resDept.data.id);
        refreshList();
      }
      setLoading(false);
      setShowModal(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    const deb = debounce(() => getListUniv(), 500);
    deb();
  }, [university]);

  const getListUniv = async () => {
    console.info('ooooo');
    if (!university) {
      setUniversityId(null);
      setListUniv([]);
      return;
    }
    const headers = getHeaders();
    const res = await apiFetchListUniversity(
      'filter[]=name||cont||' + university,
      headers,
    );
    if (res && res.data) {
      setListUniv(res.data);
    }
  };

  return (
    <div className="fixed z-15 inset-0 overflow-y-auto">
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
            {universityId ? (
              <div className="flex border rounded-md p-2 mb-3">
                <span className="w-2/3 font-bold">{university}</span>

                <span
                  className="w-1/3 text-right text-red-500 text-sm p-2 cursor-pointer"
                  onClick={() => {
                    setUniversityId(null);
                    setListUniv([]);
                  }}
                >
                  Ganti
                </span>
              </div>
            ) : (
              <input
                className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="university_name"
                type="text"
                placeholder="Contoh: Universitas Indonesia"
                onChange={(event: any) => setUniversity(event.target.value)}
              />
            )}

            {/** TABLE */}
            {!universityId && listUniv.length > 0 && (
              <div className="flex flex-col mb-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="text-sm text-blue-600 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    Kami menemukan {listUniv.length} data serupa. Pilih saja
                    jika ada di dalam daftar.
                  </div>
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-64 overflow-scroll">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50"></th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Universitas
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {listUniv.map((item: any, key: number) => {
                            return (
                              <tr key={key} className="hover:bg-gray-200">
                                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                  <a
                                    href="#"
                                    onClick={() => {
                                      setUniversityId(item.id);
                                      setUniversity(item.name);
                                      setListUniv([]);
                                    }}
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    Pilih
                                  </a>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                  <div className="text-sm leading-5 text-gray-900">
                                    {item.name}
                                  </div>
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
            )}
            {/** END TABLE */}

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="department_name"
              type="text"
              placeholder="Contoh: Teknik Informatika"
              onChange={(event: any) => setDepartment(event.target.value)}
            />
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto mb-3">
              <button
                onClick={() => createData()}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {isLoading && (
                  <IoMdRefresh className="inline animate-spin" size={28} />
                )}{' '}
                Simpan
              </button>
            </span>
            <span className="flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto mb-3">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-orange-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
