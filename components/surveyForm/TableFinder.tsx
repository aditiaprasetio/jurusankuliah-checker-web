export default function TableFinder({ keyword, list, onSelect }: any) {
  return (
    <div className="flex flex-col mb-5">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <h2
          className="px-8 py-2 font-bold bg-gray-200"
          style={{ borderLeftWidth: 3, borderLeftColor: 'blue' }}
        >
          #{keyword}
        </h2>
        <div className="text-sm text-blue-600 py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          Kami menemukan {list.length} data yang memuat kata kunci "{keyword}".
          Pilih dari daftar yang tersedia.
        </div>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg h-64 overflow-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50"></th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Jurusan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((item: any, key: number) => {
                  return (
                    <tr key={key} className="hover:bg-gray-200">
                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <a
                          href="#"
                          onClick={() => {
                            onSelect(item);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Pilih
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {item.name}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
