import Interest from '../components/Interest';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="This is my story">
    <section className="bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600">
      <div className="relative w-full container mx-auto py-12 lg:px-6 text-center">
        <p className="text-base leading-6 text-blue-600 font-semibold tracking-wide uppercase">
          Motto
        </p>
        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          "Berbagi Untuk Belajar, Belajar Untuk Berbagi."
        </h3>
        <p className="mt-4 max-w-2xl text-xl leading-7 text-white lg:mx-auto">
          "Learn to Share, Share to Learn."
        </p>
      </div>
    </section>

    <Interest />
  </Layout>
);

export default IndexPage;
