import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import GoogleLogin from 'react-google-login';
import { checkGoogleToken } from '../../redux/action/auth';
import { IAuthState } from '../../redux/reducer/auth';

const Auth = (props: IAuthProps) => {
  const router = useRouter();

  const responseGoogle = (response: any) => {
    if (response.error) {
      //
    } else {
      console.info('RESPONSE', response);
      console.info('tokenId', response.tokenId);

      const profile = response.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

      props.checkGoogleToken(response.tokenId);
    }
  };

  useEffect(() => {
    if (props.auth.isLoggedIn) {
      router.replace('/dashboard');
    }
  }, [props.auth.isLoggedIn]);

  return (
    <Layout title="Login">
      <div className="flex flex-row">
        <div className="w-1/2 p-3">
          <h2 className="font-bold bg-pink-500 p-3 rounded-md">
            Bingung Menentukan Jurusan?
          </h2>
          <p className="py-2">
            Semoga ini bisa membantu para pejuang kuliah menemukan jurusan yang
            cocok.
          </p>

          <p className="py-2">
            Tidak ada jaminan keakuratan hasil. Kami akan selalu mencari dan
            mengembangkan metode yang paling mendekati. Untuk itu, kami
            membutuhkan bantuan dari semua pihak.
          </p>

          <h2 className="font-bold bg-blue-500 p-3 rounded-md">
            Behind The Scene
          </h2>
          <p className="py-2">
            Kami mengumpulkan data dari mahasiswa seluruh Indonesia terkait
            jurusan mereka dan beberapa data pendukung. Data tersebut akan di
            validasi oleh tim <b>Pengen Kuliah</b> dan akan digunakan sebagai
            dasar.
          </p>
          <p className="py-2">
            Jadi, <b>kalau kamu sudah mahasiswa</b>, kami butuh bantuanmu untuk
            mengisi survey singkat. Apa yang akan kamu dapatkan sebagai{' '}
            <b>imbalan</b>? Kami akan menanyakan juga ke kamu apa yang kamu
            butuhkan. Siapa tau ke depan kita bisa memberikanmu fasilitas atau
            layanan tersebut. Sebagai gambaran, kami punya akses ke event-event
            dari berbagai kampus, mungkin itu menarik untukmu.
          </p>
        </div>
        <div className="w-1/2 p-3">
          <h2 className="font-bold">
            Untuk memulai, silakan login terlebih dahulu
          </h2>
          <div className="py-3">
            <GoogleLogin
              clientId="790140887499-jhtk4t91c5l76ihbc5et76adua1hro20.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface IAuthProps {
  auth: IAuthState;
  checkGoogleToken: (token: string) => void;
}

const mapStateToProps = (state: any) => {
  console.info(state);
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkGoogleToken: (token: string) => dispatch(checkGoogleToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
