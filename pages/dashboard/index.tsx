import Link from 'next/link';
import {
  IoIosCheckmarkCircleOutline,
  IoIosRemoveCircleOutline,
} from 'react-icons/io';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import IntroductionForm from '../../components/surveyForm/Introduction';
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
