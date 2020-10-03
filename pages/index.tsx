import Interest from '../components/Interest';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="This is my story">
    <Interest />

    <div className="lg:text-center">
      <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
        Motto
      </p>
      <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        Berbagi Untuk Belajar, Belajar Untuk Berbagi.
      </h3>
      <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
        Learn to Share, Share to Learn.
      </p>
    </div>
  </Layout>
);

export default IndexPage;
