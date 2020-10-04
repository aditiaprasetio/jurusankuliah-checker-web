import Link from 'next/link';
import Nav from '../components/Nav';
import { withRouter } from 'next/router';
import { IoLogoWhatsapp, IoLogoInstagram } from 'react-icons/io';

const listPage = [
  {
    pathname: '/contribution',
    title: 'My Contributions',
  },
];

function SectionBanner({ router }: any) {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div
          className={
            router.pathname === '/'
              ? 'relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'
              : 'relative z-10 pb-4 bg-white sm:pb-6 md:pb-8 lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-10'
          }
        >
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Nav></Nav>

          <main
            className={
              router.pathname === '/'
                ? 'mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'
                : 'mt-5 mx-auto max-w-screen-xl px-4 sm:mt-6 sm:px-6 md:mt-8 lg:mt-10 lg:px-8 xl:mt-14'
            }
          >
            <div className="sm:text-center lg:text-left">
              {router.pathname === '/' ? (
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                  Hi guys, my name is
                  <br className="xl:hidden" />
                  <span className="text-blue-600"> Aditia Prasetio</span>
                </h2>
              ) : (
                <h2 className="text-3xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-4xl sm:leading-none md:text-5xl">
                  {/* <Link href="/">
                    <a className="inline-block">
                      <IoMdArrowBack size={40} />
                    </a>
                  </Link>{' '} */}
                  All
                  <br className="xl:hidden" />
                  <span className="text-blue-600">
                    {' '}
                    {
                      listPage.find((item) => item.pathname === router.pathname)
                        ?.title
                    }
                  </span>
                </h2>
              )}

              {router.pathname === '/' ? (
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  You can call me <b>Adit</b>. I write all interested thing
                  here. Because i love to sharing. If you like to share
                  something together, you can chat me.
                </p>
              ) : (
                false
              )}

              {router.pathname === '/' ? (
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="https://instagram.com/aditiaprasetio95">
                      <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        <IoLogoInstagram size={25} />
                        &nbsp;&nbsp;Follow Me
                      </a>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="https://api.whatsapp.com/send?phone=6285645991577">
                      <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-700 bg-blue-100 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                        <IoLogoWhatsapp size={23} />
                        &nbsp;&nbsp;Chat Me
                      </a>
                    </Link>
                  </div>
                </div>
              ) : (
                false
              )}
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        {/* <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        /> */}
        {router.pathname === '/' ? (
          <img
            className="h-0 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/assets/img/me-1.jpg"
            alt=""
          />
        ) : (
          <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 h-0 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"></div>
          // // <div className="bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 h-0 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"></div>
        )}
      </div>
    </div>
  );
}

export default withRouter(SectionBanner);
