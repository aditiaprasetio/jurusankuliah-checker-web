import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { APP_AUTH_DATA } from '../common/constant/auth';
import { IAccountData } from '../interfaces/account.interface';
import {
  ECurrentProfileStatus,
  ICheckerProfileData,
} from '../interfaces/checkerProfile.interface';

type Props = {
  isLoggedIn: boolean;
  account: IAccountData;
  checkerProfile: ICheckerProfileData;
  isFetchingSurvey?: boolean;
};

export default function Nav(props: Props) {
  const router = useRouter();
  const [isShowMenu, setShowMenu] = useState(false);
  const [isShowMenuUser, setShowMenuUser] = useState(false);
  const [links, setLinks]: any[] = useState([]);

  const logout = () => {
    window.localStorage.removeItem(APP_AUTH_DATA);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const list: any[] = [];
    list.push({ href: '/dashboard', label: 'Dashboard' });
    if (
      props.checkerProfile.current_status === ECurrentProfileStatus.LULUS_KULIAH
    ) {
      list.push({ href: '/event', label: 'Event' });
    } else if (
      props.checkerProfile.current_status === ECurrentProfileStatus.MAHASISWA
    ) {
      list.push({ href: '/event', label: 'Event' });
    } else if (
      props.checkerProfile.current_status ===
      ECurrentProfileStatus.PEJUANG_KULIAH
    ) {
      list.push({ href: '/jurusan-checker', label: 'Hasil Analisa' });
    }
    setLinks(list);
  }, [props.isFetchingSurvey]);

  return (
    <section>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                  alt="Workflow logo"
                />
              </div>

              {props.isLoggedIn ? (
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {links.map((item: any, key: number) => {
                      return (
                        <Link key={'menu_' + key} href={item.href}>
                          <a
                            href="#"
                            className={
                              router.pathname === item.href
                                ? 'px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                                : 'px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                            }
                          >
                            {item.label}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="ml-10 flex items-baseline space-x-4">
                  <div className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">
                    Jurusan Checker
                  </div>
                </div>
              )}
            </div>
            {props.isLoggedIn && (
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* <button
                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button> */}

                  <div className="flex items-center px-5 space-x-3 text-right">
                    <div className="space-y-1">
                      <div className="text-base font-medium leading-none text-white">
                        <span className="text-gray-400">Hai, </span>
                        {props.account.first_name} {props.account.last_name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {props.account.email}
                      </div>
                    </div>
                  </div>

                  {/* <!-- Profile dropdown --> */}

                  <div className="ml-3 relative">
                    <div>
                      <button
                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        onClick={() => setShowMenuUser(!isShowMenuUser)}
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={props.account.photo_url}
                          alt=""
                        />
                      </button>
                    </div>

                    {/* <!--
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  --> */}
                    {isShowMenuUser && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                        <div
                          className="py-1 rounded-md bg-white shadow-xs"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          {/* <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Your Profile
                          </a> */}

                          {/* <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Settings
                          </a> */}

                          <a
                            href="#"
                            onClick={() => logout()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="-mr-2 flex md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                onClick={() => setShowMenu(!isShowMenu)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              >
                {isShowMenu ? (
                  <IoIosClose size={25} color="#ffffff" />
                ) : (
                  <svg
                    className="block h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* <!--
            Mobile menu, toggle classNamees based on menu state.

            Open: "block", closed: "hidden"
          --> */}
        <div className={isShowMenu ? 'block' : 'hidden md:hidden'}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((item: any, key: number) => (
              <Link href={item.href} key={'menu_' + key}>
                <a
                  className={
                    router.pathname === item.href
                      ? 'block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                      : 'block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
                  }
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5 space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={props.account.photo_url}
                  alt=""
                />
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium leading-none text-white">
                  {props.account.first_name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {props.account.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {/* <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Your Profile
              </a>

              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Settings
              </a> */}
              <a
                onClick={() => logout()}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
