import { useEffect, useState } from 'react';
import Interest from '../components/Interest';
import Layout from '../components/Layout';

const randomFacts = [
  { id: 1, fact: 'Aku membangun Pengen Kuliah sebelum kuliah' },
  { id: 2, fact: 'Aku suka makan bakso' },
  { id: 3, fact: 'Aku suka mencoba hal-hal baru' },
  { id: 4, fact: 'Aku suka warna biru' },
  { id: 5, fact: 'Sedang belajar membuat podcast. Cek di ig ya...' },
  { id: 6, fact: 'Pernah membuat Simulasi SNMPTN dan digunakan 5000 orang' },
  { id: 7, fact: 'Suka sharing tentang pengalaman' },
  {
    id: 8,
    fact: 'Mulai tertarik dunia IT hanya karena ada lomba blog ketika SMP',
  },
];

const IndexPage = () => {
  const [selectedFact, setSelectedFact] = useState('');

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * randomFacts.length);
    console.info('randomNumber', randomNumber);
    const item = randomFacts[randomNumber];
    setSelectedFact(item.fact);

    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * randomFacts.length);
      console.info('randomNumber', randomNumber);
      const item = randomFacts[randomNumber];
      setSelectedFact(item.fact);
    }, 5000);
  }, []);

  return (
    <Layout title="Let's do something with me">
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

      <section className="bg-gray-100">
        <div className="relative w-full container mx-auto text-center">***</div>
      </section>

      <section className="bg-gray-100 pb-6">
        <div className="relative w-full container mx-auto py-12 lg:px-6 text-center">
          <p className="text-base leading-6 text-blue-600 font-semibold tracking-wide uppercase">
            RANDOM FACT ABOUT ME
          </p>
          <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            "{selectedFact}"
          </h3>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
