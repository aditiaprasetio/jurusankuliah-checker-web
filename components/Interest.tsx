import Link from 'next/link';
import { IoIosSnow, IoIosHeart, IoIosApps } from 'react-icons/io';

export default function Interest() {
  return (
    <section className="bg-gray-100">
      <div className="relative w-full container mx-auto py-12 lg:px-6">
        <h1 className="text-lg font-bold text-center mb-3 text-blue-600">
          INTERESTS
        </h1>

        <div className="flex flex-row">
          <Link href="/blog">
            <a className="flex-auto text-center px-4 py-4 m-2 border rounded-md hover:bg-blue-100 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out">
              <div>
                <IoIosSnow
                  className="w-full self-center my-2 text-blue-500"
                  size={50}
                />
              </div>
              <span className="text-gray-900 font-bold">SHARING</span>
            </a>
          </Link>
          <Link href="/social">
            <a className="flex-auto text-center px-4 py-4 m-2 border rounded-md hover:bg-blue-100 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out">
              <div>
                <IoIosHeart
                  className="w-full self-center my-2 text-pink-500"
                  size={50}
                />
              </div>
              <span className="text-gray-900 font-bold">SOCIAL</span>
            </a>
          </Link>
          <Link href="/learning">
            <a className="flex-auto text-center px-4 py-4 m-2 border rounded-md hover:bg-blue-100 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out">
              <div>
                <IoIosApps
                  className="w-full self-center my-2 text-indigo-500"
                  size={50}
                />
              </div>
              <span className="text-gray-900 font-bold">LEARNING</span>
            </a>
          </Link>
        </div>

        <Link href="/contribution">
          <a className="text-center text-gray-500">
            <div className="p-2 mt-3">Show My Contributions</div>
          </a>
        </Link>
      </div>
    </section>
  );
}
