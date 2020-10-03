import { GetStaticProps } from 'next';
import Link from 'next/link';
import { User } from '../../interfaces';
import { sampleUserData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import { IoMdCheckmarkCircleOutline, IoMdStopwatch } from 'react-icons/io';

const runningContributions = [
  {
    id: 1,
    title: 'Pengen Kuliah',
    description: `Pengen Kuliah adalah wadah bagi para pejuang kuliah yang bimbang tentang jurusan, informasi, kelulusan, latihan, dan masih banyak yang lain.`,
    picture: '/assets/project/pengenkuliah.png',
    url: 'https://pengenkuliah.com',
  },
  {
    id: 2,
    title: 'Melogika',
    description: `Melogika akan ngobrolin banyak hal seputar dunia IT, seperti persiapan karir, tips trik, keseharian di dunia IT, dan masih banyak lagi.`,
    picture: '/assets/project/melogika.jpg',
    url: 'https://linktr.ee/melogika',
  },
];

const doneContributions = [
  {
    id: 1,
    title: 'Agora Enterprise - ATR BPN',
    description: `This is my first project in PT Mavila Solusi Indonesia and also my first project in Real Professional World. I started to develop this project using Vue & Laravel (i haven't experience in vue and laravel before this project), and together with 2 person we can deliver this project on time. This is unforgettable experience. Because, from this project I can learn many think and start my real career in Software Development.`,
    picture: '/assets/project/agora-atr.jpeg',
    url: '#',
  },
  {
    id: 2,
    title: 'Point of Sales (POS) App',
    description: `This application is used by the owners of "Warung" (grocery stores) in the rural area to record transactions and monitor their cash flow. This is a collaboration program between Mavila and Bank BKK Purwodadi. My job is create Mobile App and engage to end user.`,
    picture: '/assets/project/warung-dzakat.jpeg',
    url: '#',
  },
  {
    id: 3,
    title: 'My Food Diary',
    description: `My Food Diary will help you manage your daily diet for health. Download App: https://play.google.com/store/apps/details?id=com.myfooddiary. My job is design architecture (microservices), develop backend using NestJS, develop mobile app (React Native) and manage team.`,
    picture: '/assets/project/myfooddiary.jpeg',
    url: 'https://play.google.com/store/apps/details?id=com.myfooddiary',
  },
  {
    id: 4,
    title: 'OMNIA v1.0 - Employee Performance Management',
    description: `OMNIA is an application that Integrate corporate culture/value with business performance. While putting attention in employee wellbeing. My job is design architecture (microservices), develop backend using NestJS, develop mobile app (React Native) and manage team.`,
    picture: '/assets/project/omnia.jpeg',
    url: '#',
  },
  {
    id: 5,
    title: 'POLAPIKIR E-Learning Platform',
    description: `Polapikir is a lifelong learning ecosystem that builds learning communities through personalized online learning and live learning events. https://play.google.com/store/apps/details?id=com.polapikir. My job is design architecture (microservices), develop backend using NestJS, mobile app (React Native) and create content.`,
    picture: '/assets/project/polapikir.png',
    url: 'https://play.google.com/store/apps/details?id=com.polapikir',
  },
];

const ContributionIndex = () => (
  <Layout title="All My Contributions">
    <div className="mt-10"></div>
    {/** RUNNING PROJECT */}
    <section className="container mx-auto my-5">
      <div className="px-3 flex flex-row">
        <IoMdStopwatch size={20} />
        <h2 className="font-bold">&nbsp;STILL CONTRIBUTE</h2>
      </div>
      <div className="flex flex-row flex-wrap">
        {runningContributions.map((project: any, index: number) => (
          <Link key={'running-' + index} href={project.url}>
            <div key={index} className="lg:w-1/2 md:w-1/2 sm:w-full my-3 p-3">
              <div className="p-3 flex flex-row flex-wrap border rounded-md">
                <img
                  className="lg:w-1/4 md:w-1/2 sm:w-full"
                  src={project.picture}
                />
                <div className="lg:w-3/4 md:w-1/2 sm:w-full p-4">
                  <h2 className="font-bold">{project.title}</h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/** DONE PROJECT */}
    <section className="container mx-auto my-5">
      <div className="px-3 flex flex-row">
        <IoMdCheckmarkCircleOutline size={20} />
        <h2 className="font-bold">&nbsp;DONE</h2>
      </div>
      <div className="flex flex-col">
        {doneContributions.map((project: any, index: number) => (
          <Link key={'done-' + index} href={project.url}>
            <div className="my-3 p-3">
              <div className="p-3 flex flex-row flex-wrap border rounded-md">
                <img
                  className="lg:w-1/4 md:w-1/2 sm:w-full"
                  src={project.picture}
                />
                <div className="lg:w-3/4 md:w-1/2 sm:w-full p-4">
                  <h2 className="font-bold py-2">
                    <span className="bg-blue-600 px-3 py-2 rounded-md text-white mr-2 text-center">
                      {index + 1}
                    </span>

                    {project.title}
                  </h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return { props: { items } };
};

export default ContributionIndex;
