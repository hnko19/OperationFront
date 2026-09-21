import { flexRender, type Table } from '@tanstack/react-table';

type DataTableProps<TData> = {
  table: Table<TData>;
};

export default function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <div className="overflow-x-auto space-y-4">
      <table className="min-w-full divide-y divide-gray-500">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-center">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`px-6 py-3 bg-[#31213F] leading-4 font-medium text-xl text-white uppercase tracking-wider select-none ${
                      canSort
                        ? 'cursor-pointer hover:bg-[#432d56] transition'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                      {/* أسهم الترتيب */}
                      {isSorted === 'asc' && <span>▲</span>}
                      {isSorted === 'desc' && <span>▼</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="px-6 py-6 text-center text-gray-500 text-sm border-b border-gray-500"
              >
                لا توجد بيانات متاحة
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-[#FFF8CC] hover:text-[#5A4A00] text-blue-900 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-2 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* شريط التحكم بالصفحات (Pagination) */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>عرض</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded bg-white"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>سجلات لكل صفحة</span>
        </div>

        <div className="flex items-center gap-2">
          <span>
            الصفحة{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} من{' '}
              {table.getPageCount() || 1}
            </strong>
          </span>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-[#31213F] text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
          >
            السابق
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-[#31213F] text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}
