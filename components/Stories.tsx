import { IoIosSnow, IoIosHeart, IoIosApps } from 'react-icons/io';

const stories = [
  {
    id: 1,
    title: 'Create "Pengen Kuliah"',
    picture: '',
    description: `2020 adalah awal cerita`,
  },
  {
    id: 1,
    title: 'Start to Work in PT Mavila Solusi Indonesia',
    picture: '',
  },
];

export default function Stories() {
  return (
    <section className="bg-gray-100">
      <div className="relative w-full container mx-auto p-10">
        <h1 className="text-lg font-bold text-center mb-3">INTERESTS</h1>

        <div className="flex flex-row">
          <div className="flex-auto text-center px-4 py-4 m-2 border rounded-md">
            <div>
              <IoIosSnow
                className="w-full self-center my-2 text-blue-500"
                size={50}
              />
            </div>
            <span className="text-gray-900 font-bold">SHARING</span>
          </div>
          <div className="flex-auto text-center px-4 py-4 m-2 border rounded-md">
            <div>
              <IoIosHeart
                className="w-full self-center my-2 text-pink-500"
                size={50}
              />
            </div>
            <span className="text-gray-900 font-bold">SOCIAL</span>
          </div>
          <div className="flex-auto text-center px-4 py-4 m-2 border rounded-md">
            <div>
              <IoIosApps
                className="w-full self-center my-2 text-indigo-500"
                size={50}
              />
            </div>
            <span className="text-gray-900 font-bold">LEARNING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
