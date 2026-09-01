// النوع الأساسي T حيكون object بحت
type MainTableProps<T extends object> = {
  tblHeader: (string | JSX.Element)[];
  tblBody: T[];
};

export default function MainTable<T extends object>({
  tblHeader,
  tblBody,
}: MainTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-500">
        <thead>
          <tr  className="text-center">
            {tblHeader.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-[#31213F]  leading-4 font-medium text-xl text-white uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tblBody.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-[#FFF8CC] hover:text-[#5A4A00] text-blue-900 transition">
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className=" px-6 py-2 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center "
                >
                  {typeof cell === "string" || typeof cell === "number"
                    ? cell
                    : (cell as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
