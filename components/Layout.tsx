import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Nav from './Nav';
import { connect } from 'react-redux';
import { IAccountData } from '../interfaces/account.interface';
import { checkLogin } from '../redux/action/auth';
import { useRouter } from 'next/router';
import { ICheckerProfileData } from '../interfaces/checkerProfile.interface';

type Props = {
  children?: ReactNode;
  title?: string;
  isLoggedIn: boolean;
  account: IAccountData;
  checkerProfile: ICheckerProfileData;
  isFetchingSurvey: boolean;
  checkLogin: () => void;
};

const Layout = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      props.checkLogin();
    }, 2000);
  }, []);

  useEffect(() => {
    if (router.pathname === '/login') {
      if (props.isLoggedIn) {
        router.replace('/dashboard');
      }
    } else {
      if (props.isLoggedIn === false) {
        router.replace('/login');
      }
    }
  }, [props.isLoggedIn]);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/assets/favicon.png" />
      </Head>

      <Nav
        isLoggedIn={props.isLoggedIn}
        account={props.account}
        checkerProfile={props.checkerProfile}
        isFetchingSurvey={props.isFetchingSurvey}
      />

      <header className="bg-white shadow container mx-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {props.title}
          </h1>
        </div>
      </header>

      <main className="container mx-auto shadow-md">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {props.children}

          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>

      <footer className="w-full text-center text-gray-500 text-sm p-3">
        <span>Copyright @ 2020 - Created by Pengen Kuliah</span>
      </footer>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    account: state.accountReducer.data,
    checkerProfile: state.checkerProfileReducer.data,
    isFetchingSurvey: state.surveyReducer.isFetching,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkLogin: () => dispatch(checkLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
