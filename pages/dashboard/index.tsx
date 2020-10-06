import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { IAuthState } from '../../redux/reducer/auth';

const Dashboard = (props: IDashboardProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.auth.isLoggedIn) {
      router.replace('/login');
    }
  }, [props.auth.isLoggedIn]);

  return (
    <Layout title="Welcome">
      <h1>Welcome</h1>

      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

interface IDashboardProps {
  auth: IAuthState;
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
