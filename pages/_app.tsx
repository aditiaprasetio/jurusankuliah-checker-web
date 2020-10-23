import '../styles/index.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// toast.configure();
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
