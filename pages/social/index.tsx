import { GetStaticProps } from 'next';
import Link from 'next/link';

import { User } from '../../interfaces';
import { sampleUserData } from '../../utils/sample-data';
import Layout from '../../components/Layout';

const SocialIndex = () => (
  <Layout title="Social Projects">
    <h1>Pengen Kuliah</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return { props: { items } };
};

export default SocialIndex;
