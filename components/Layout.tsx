import React, { ReactNode } from 'react';
import Head from 'next/head';
import Nav from './Nav';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="/assets/favicon.png" />
    </Head>

    <Nav />

    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {title}
        </h1>
      </div>
    </header>

    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}

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

export default Layout;
