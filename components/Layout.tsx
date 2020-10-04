import React, { ReactNode } from 'react';
import Head from 'next/head';
import SectionBanner from './SectionBanner';

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
    <header>
      <SectionBanner />
    </header>

    {children}

    <footer className="w-full text-center text-gray-500 text-sm p-3">
      <span>Copyright @ 2020 - Created by Me</span>
    </footer>
  </div>
);

export default Layout;
