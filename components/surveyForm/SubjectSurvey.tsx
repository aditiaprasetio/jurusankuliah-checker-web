import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getHeaders } from '../../common/function/function';
import { apiFetchListSubject } from '../../common/api/subject';
import '../../styles/slider.module.css';
import { ISubjectDetailData } from '../../interfaces/subjectDetail.interface';
import {
  createManySubjectDetail,
  fetchMySubjectDetail,
} from '../../redux/action/subjectDetail';
import { ISubjectDetailState } from '../../redux/reducer/subjectDetail';
import {
  IoIosArrowDropright,
  IoIosInformationCircle,
  IoMdRefresh,
} from 'react-icons/io';
import { apiFetchSubjectDetailAverage } from '../../common/api/subjectDetail';

const SubjectSurvey = (props: ISubjectSurveyProps) => {
  const [listSubject, setListSubject]: any[] = useState([]);

  const getListSubject = async () => {
    const headers = await getHeaders();

    const resAverage = await apiFetchSubjectDetailAverage();

    if (resAverage && resAverage.data) {
      const res = await apiFetchListSubject('', headers);

      if (res && res.data) {
        res.data = res.data.map((item: any) => {
          console.info(item);
          const findAverage: any = resAverage.data.find(
            (avg: any) => item.id === avg.id,
          );

          return {
            ...item,
            analisis: findAverage ? findAverage.avg_analisis : 50,
            hafalan: findAverage ? findAverage.avg_hafalan : 50,
          };
        });
        setListSubject(res.data);
      }
    }
  };

  const setFormSubject = (id: string, value: any) => {
    let list: any[] = listSubject;
    list = list.map((item: any) => {
      if (item.id === id) {
        item.analisis = value;
        item.hafalan = 100 - value;
      }
      return item;
    });
    setListSubject(list);
  };

  const save = () => {
    const data: ISubjectDetailData[] = listSubject.map((item: any) => {
      return {
        subject_id: item.id,
        hafalan: item.hafalan,
        analisis: item.analisis,
      };
    });
    props.createManySubjectDetail(data);

    props.goToNext();
  };

  const isDisabled = () => {
    return props.subjectDetail.isFetching;
  };

  useEffect(() => {
    getListSubject();
  }, []);

  return (
    <div className="lg:w-2/3 md:w-2/3 w-full p-3">
      <div className="w-full">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="font-bold">
            Menurutmu, berapa persen (%) porsi <u>HAFALAN</u> dan{' '}
            <u>ANALISIS/PERHITUNGAN</u> di masing-masing mata pelajaran berikut
            ini?
          </h2>

          {props.subjectDetail.my_list.length === 0 ? (
            <div
              className="bg-green-100 border-l-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex items-center">
                <div className="py-1 mr-3">
                  <IoIosInformationCircle
                    size={40}
                    className="text-green-500"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    Form ini hanya bisa kamu isi 1x saja. Jadi, pastikan datanya
                    udah benar ya.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="bg-green-100 border-l-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex items-center">
                <div className="py-1 mr-3">
                  <IoIosInformationCircle
                    size={40}
                    className="text-green-500"
                  />
                </div>
                <div>
                  <p className="text-sm">
                    Kamu sudah mengisi form ini. Kamu udah nggak bisa ubah
                    datanya.
                  </p>
                </div>
              </div>
            </div>
          )}

          {listSubject.map((item: any, key: number) => (
            <div className="mt-3" key={key}>
              <h2 className="font-bold">
                {key + 1}. {item.name}
              </h2>
              <div className="mt-4 flex flex-row flex-wrap flex-between-space px-3">
                <div className="flex-1 text-blue-500">
                  {item.analisis}% Analisis/Perhitungan
                </div>
                <div className="flex-1 text-right">{item.hafalan}% Hafalan</div>
              </div>
              <div className="mb-4 flex flex-row flex-wrap px-3">
                <div className="slidecontainer flex-grow">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={item.analisis}
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
              {props.subjectDetail.isFetching ? (
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

interface ISubjectSurveyProps {
  subjectDetail: ISubjectDetailState;
  createManySubjectDetail: (data: ISubjectDetailData[]) => void;
  goToNext: () => void;
}

const mapStateToProps = (state: any) => {
  return {
    subjectDetail: state.subjectDetailReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createManySubjectDetail: (data: any[]) =>
      dispatch(createManySubjectDetail(data)),
    fetchMySubjectDetail: () => dispatch(fetchMySubjectDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSurvey);
