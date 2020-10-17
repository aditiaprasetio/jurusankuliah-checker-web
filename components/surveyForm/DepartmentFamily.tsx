import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../styles/slider.module.css';
import { ISubjectDetailState } from '../../redux/reducer/subjectDetail';
import { debounce } from 'ts-debounce';
import { getHeaders } from '../../common/function/function';
import { apiFetchListDepartmentFamily } from '../../common/api/departmentFamily';
import TableFinder from './TableFinder';
import { ICheckerProfileState } from '../../redux/reducer/checkerProfile';
import { apiUpdateDepartment } from '../../common/api/department';
import { fetchSurveyCompletion } from '../../redux/action/survey';
import { IoIosArrowDropright, IoLogoWhatsapp } from 'react-icons/io';

const DepartmentFamily = (props: IDepartmentFamilyProps) => {
  const [keyword0, setKeyword0] = useState(null);
  const [keyword1, setKeyword1] = useState(null);
  const [keyword2, setKeyword2] = useState(null);
  const [keyword3, setKeyword3] = useState(null);
  const [list0, setList0] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);

  useEffect(() => {
    if (
      props.checkerProfile.data.department &&
      !props.checkerProfile.data.department.department_family
    ) {
      setKeyword0(props.checkerProfile.data.department.name);
    }
  }, [props.checkerProfile.data.department]);

  useEffect(() => {
    const deb = debounce(() => getListDepartment(), 500);
    deb();
  }, [keyword0]);

  const getListDepartment = async () => {
    if (keyword0) {
      let headers = getHeaders();

      const res = await apiFetchListDepartmentFamily(
        'filter[]=name||cont||' + keyword0,
        headers,
      );
      if (res && res.data) {
        if (res.data.length === 1) {
          save(res.data[0].id);
          props.fetchSurveyCompletion();
        } else {
          setList0(res.data);
        }
      }

      let mainKeyword: string = (keyword0 as any).trim();
      mainKeyword = mainKeyword.replace(/[/]/g, ' ').replace('-', ' ');
      mainKeyword = mainKeyword.replace('   ', ' ');
      mainKeyword = mainKeyword.replace('  ', ' ');
      console.info('mainKeyword', mainKeyword);

      let exp = (mainKeyword as any).split(' ');
      if (exp.length > 0) {
        exp = exp.filter((item: any) => item && item != '' && item != ' ');
      }
      console.info('exp', exp);
      if (exp.length > 0) {
        setKeyword1(exp[0]);
        apiFetchListDepartmentFamily(
          'filter[]=name||cont||' + exp[0],
          headers,
        ).then((res) => {
          if (res && res.data) {
            setList1(res.data);
          }
        });
      }

      if (exp.length > 1) {
        setKeyword2(exp[1]);
        apiFetchListDepartmentFamily(
          'filter[]=name||cont||' + exp[1],
          headers,
        ).then((res) => {
          if (res && res.data) {
            setList2(res.data);
          }
        });
      }
      if (exp.length > 2) {
        setKeyword3(exp[2]);
        apiFetchListDepartmentFamily(
          'filter[]=name||cont||' + exp[2],
          headers,
        ).then((res) => {
          if (res && res.data) {
            setList3(res.data);
          }
        });
      }
    } else {
    }
  };

  const save = (department_family_id: string) => {
    const headers = getHeaders();
    apiUpdateDepartment(
      props.checkerProfile.data.department_id,
      {
        department_family_id,
      },
      headers,
    );
  };

  return (
    <div className="lg:w-2/3 md:w-2/3 w-full p-3">
      <div className="w-full px-8 pt-6 pb-8">
        {props.checkerProfile.data.department.department_family ? (
          <div>
            <div>
              Jurusanmu <b>{props.checkerProfile.data.department.name}</b>,{' '}
              termasuk kelompok jurusan{' '}
              <b>
                {props.checkerProfile.data.department.department_family.name}
              </b>
              . <br />
              Merasa informasi ini kurang tepat?
            </div>
            <div className="text-center mt-5">
              <button
                onClick={() => {
                  window.open(
                    `https://api.whatsapp.com/send?phone=085645991577&text=Halo admin. Saya ingin menyarankan perubahan untuk jurusan *${props.checkerProfile.data.department.name}* menjadi kelompok *............* (ketik disini saran anda)`,
                    '_blank',
                  );
                }}
                className={
                  'w-full align-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-green-500 hover:bg-green-700'
                }
                type="button"
              >
                <IoLogoWhatsapp className="inline" size={28}></IoLogoWhatsapp>
                <span> Beritahu Admin Biar Dibenerin!</span>
              </button>
            </div>
            <div className="text-center mt-5">
              <button
                onClick={() => {
                  props.goToNext();
                }}
                className={
                  'w-full align-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700'
                }
                type="button"
              >
                <IoIosArrowDropright
                  className="inline"
                  size={28}
                ></IoIosArrowDropright>
                <span> Lanjut</span>
              </button>
            </div>
          </div>
        ) : (
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="font-bold">
              Pilih kelompok jurusan yang paling mendekati jurusanmu.
            </h2>
            <p className="text-gray-600 text-base mb-5">
              Misal: Jurusan Informatika <i>termasuk kelompok jurusan</i> Ilmu
              Komputer/ Informatika
            </p>

            {/* <input
            className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="keyword0_name"
            type="text"
            // placeholder=""
            onChange={(event: any) => setKeyword0(event.target.value)}
          /> */}

            {keyword0 && keyword0 != '' && list0.length > 0 && (
              <TableFinder
                onSelect={(data: any) => save(data.id)}
                list={list0}
                keyword={keyword0}
              />
            )}

            {keyword1 && keyword1 != '' && list1.length > 0 && (
              <TableFinder
                onSelect={(data: any) => save(data.id)}
                list={list1}
                keyword={keyword1}
              />
            )}

            {keyword2 && keyword2 != '' && list2.length > 0 && (
              <TableFinder
                onSelect={(data: any) => save(data.id)}
                list={list2}
                keyword={keyword2}
              />
            )}

            {keyword3 && keyword3 != '' && list3.length > 0 && (
              <TableFinder
                onSelect={(data: any) => save(data.id)}
                list={list3}
                keyword={keyword3}
              />
            )}

            {list0.length === 0 &&
              list1.length === 0 &&
              list2.length === 0 &&
              list3.length === 0 && (
                <div>
                  Kami tidak menemukan kelompok yang serupa dengan jurusanmu.
                  Bisa kasih tahu kami, termasuk kelompok apa jurusanmu?
                  {/* <input /> */}
                </div>
              )}
          </form>
        )}
      </div>
    </div>
  );
};

interface IDepartmentFamilyProps {
  checkerProfile: ICheckerProfileState;
  subjectDetail: ISubjectDetailState;
  goToNext: () => void;
  fetchSurveyCompletion: () => void;
}

const mapStateToProps = (state: any) => {
  return {
    checkerProfile: state.checkerProfileReducer,
    subjectDetail: state.subjectDetailReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSurveyCompletion: () => dispatch(fetchSurveyCompletion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentFamily);
