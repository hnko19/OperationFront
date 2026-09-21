import { useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';

type MultiDataTableProps<TData> = {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean; // خاصية التحميل
};

export default function MultiDataTable<TData>({
  data,
  columns,
  isLoading = false,
}: MultiDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* حقل البحث الشامل */}
      <div className="flex justify-end items-center">
        <input
          type="text"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="بحث سريع..."
          disabled={isLoading}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm outline-none focus:border-[#31213F] w-64 text-right disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* الجدول الرئيسي */}
      <div className="overflow-x-auto">
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
                              header.getContext()
                            )}
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
            {/* 1. حالة التحميل */}
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-600 border-b border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    {/* Spinner متحرك */}
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-[#31213F] rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">جاري تحميل البيانات...</span>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              /* 2. حالة عدم وجود بيانات بعد انتهاء التحميل */
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500 text-sm border-b border-gray-500"
                >
                  لا توجد بيانات متاحة
                </td>
              </tr>
            ) : (
              /* 3. عرض صفوف البيانات */
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* شريط التحكم بالصفحات (Pagination) */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>عرض</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            disabled={isLoading}
            className="p-1 border border-gray-300 rounded bg-white disabled:opacity-50"
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
            disabled={!table.getCanPreviousPage() || isLoading}
            className="px-3 py-1 bg-[#31213F] text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
          >
            السابق
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
            className="px-3 py-1 bg-[#31213F] text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}