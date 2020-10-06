import Link from 'next/link';
import {
  IoIosCheckmarkCircleOutline,
  IoIosRemoveCircleOutline,
} from 'react-icons/io';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import IntroductionForm from '../../components/surveyForm/introduction';
import { IAccountState } from '../../redux/reducer/account';
import { IAuthState } from '../../redux/reducer/auth';

const listSidebar = [
  {
    id: 1,
    title: 'KENALAN YUK',
    description: 'Tak kenal maka tak sayang',
    href: '/checker-profile',
  },
  {
    id: 2,
    title: 'MASIH RAHASIA',
    description: 'Tak kenal maka tak sayang',
    href: '/',
  },
];
const Dashboard = (props: IDashboardProps) => {
  return (
    <Layout
      title={
        'Welcome, ' +
        props.account.data.first_name +
        ' ' +
        props.account.data.last_name
      }
    >
      <div className="flex flex-row flex-wrap">
        <div className="flex flex-col w-full lg:w-1/3 md:w-1/3 p-3 bg-gray-200">
          {listSidebar.map((item: any) => {
            return (
              <Link href={item.href}>
                <a className="flex flex-row p-3 hover:bg-gray-400">
                  <div className="w-12">
                    <div className="rounded-lg">
                      <IoIosCheckmarkCircleOutline size={40} />
                      <IoIosRemoveCircleOutline size={40} />
                    </div>
                  </div>
                  <div className="flex-auto">
                    <h2 className="font-bold">{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        {/** FORM INPUT */}
        <IntroductionForm />
      </div>

      {/** MODAL */}
      <div className="hidden fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/** FORM */}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Deactivate
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center">
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

interface IDashboardProps {
  auth: IAuthState;
  account: IAccountState;
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.authReducer,
    account: state.accountReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
