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
  isLoading?: boolean;
};

export default function MultiDataTable<TData>({
  data,
  columns,
  isLoading = false,
}: MultiDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // eslint-disable-next-line react-hooks/incompatible-library
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

  const rows = table.getRowModel().rows;
  const totalFilteredRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="w-full space-y-4" dir="ltr">
      {/* 1. شريط الأدوات والبحث */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        {/* عداد النتائج */}
        <div className="text-xs sm:text-sm text-gray-500 font-medium">
          إجمالي السجلات:{' '}
          <span className="font-bold text-[#31213F]">{totalFilteredRows}</span>
        </div>

        {/* حقل البحث الشامل (معدّل ليتناسب مع LTR) */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="بحث سريع في جميع الحقول..."
            disabled={isLoading}
            className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none transition focus:bg-white focus:border-[#31213F] focus:ring-2 focus:ring-[#31213F]/15 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter('')}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600"
              title="مسح البحث"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. عرض الشاشات الكبيرة والمتوسطة (Table View) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-[#31213F] text-white">
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const isSorted = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-4 py-3.5 text-center font-bold text-xs uppercase tracking-wider whitespace-nowrap select-none ${
                          canSort
                            ? 'cursor-pointer hover:bg-[#432d56] transition-colors'
                            : ''
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}

                          {canSort && (
                            <span className="inline-flex flex-col text-[10px] leading-none opacity-80">
                              {isSorted === 'asc'
                                ? '▲'
                                : isSorted === 'desc'
                                  ? '▼'
                                  : '↕'}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-3 border-gray-200 border-t-[#31213F] rounded-full animate-spin"></div>
                      <span className="text-sm font-medium text-gray-500">
                        جاري تحميل البيانات...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <svg
                        className="w-10 h-10 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        لا توجد بيانات مطابقة للعرض
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="even:bg-gray-50/60 hover:bg-[#FFF8CC]/80 hover:text-[#5A4A00] text-slate-800 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 whitespace-nowrap text-sm font-medium text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. عرض شاشات الجوال (Responsive Cards View) */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-7 h-7 border-2 border-gray-200 border-t-[#31213F] rounded-full animate-spin"></div>
              <span className="text-sm font-medium text-gray-500">
                جاري تحميل البيانات...
              </span>
            </div>
          </div>
        ) : rows.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm text-gray-500 text-sm">
            لا توجد بيانات متاحة
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:border-[#31213F]/40 transition"
            >
              <div className="divide-y divide-gray-100">
                {row.getVisibleCells().map((cell) => {
                  const headerDef = cell.column.columnDef.header;
                  return (
                    <div
                      key={cell.id}
                      className="flex items-center justify-between px-4 py-2.5 text-sm gap-4"
                    >
                      <span className="font-bold text-[#31213F] text-xs shrink-0">
                        {typeof headerDef === 'string'
                          ? headerDef
                          : cell.column.id}
                      </span>
                      <div className="text-slate-800 font-medium text-right break-words">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. شريط التحكم بالصفحات (Pagination) المتجاوب */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm text-xs text-gray-700">
        {/* اختيار عدد الصفوف */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <span className="text-gray-500">عرض</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            disabled={isLoading}
            className="px-2 py-1.5 border border-gray-300 rounded-lg bg-gray-50 font-semibold text-[#31213F] outline-none focus:border-[#31213F] disabled:opacity-50"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-gray-500">سجلات لكل صفحة</span>
        </div>

        {/* أزرار التنقل */}
        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <span className="text-gray-600 mr-2">
            صفحة{' '}
            <strong className="text-[#31213F]">
              {table.getState().pagination.pageIndex + 1}
            </strong>{' '}
            من{' '}
            <strong className="text-[#31213F]">
              {table.getPageCount() || 1}
            </strong>
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage() || isLoading}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="الصفحة الأولى"
            >
              «
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isLoading}
              className="px-3 py-1.5 bg-[#31213F] text-white font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
            >
              السابق
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isLoading}
              className="px-3 py-1.5 bg-[#31213F] text-white font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
            >
              التالي
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage() || isLoading}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="الصفحة الأخيرة"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
