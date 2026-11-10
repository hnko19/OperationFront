import { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

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
  const [globalFilter, setGlobalFilter] = useState("");

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

  return (
    <div className="w-full space-y-4">
      {/* حقل البحث الشامل - على جهة اليمين */}
      <div className="w-full flex" dir="rtl">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="بحث سريع..."
          disabled={isLoading}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-[#2050a3] focus:ring-1 focus:ring-[#31213F] w-full sm:w-64 text-right disabled:bg-gray-100 disabled:cursor-not-allowed bg-white shadow-xs"
        />
      </div>

      {/* الجدول الرئيسي المتجاوب */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full block md:table md:divide-y md:divide-gray-500">
          {/* ترويسة الجدول (تم تصغير الحجم والـ Padding هنا) */}
          <thead className="hidden md:table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-center">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();
                  const isActions = header.column.id === "actions";

                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-2.5 py-1.5 sm:px-4 sm:py-2 bg-[#2050a3] leading-4 font-medium text-xs sm:text-sm text-white uppercase tracking-wider whitespace-nowrap select-none ${
                        canSort
                          ? "cursor-pointer hover:bg-[#432d56] transition"
                          : ""
                      }`}
                    >
                      <div
                        className={`flex items-center gap-1.5 ${
                          isActions ? "justify-end" : "justify-center"
                        }`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {isSorted === "asc" && (
                          <span className="text-[10px]">▲</span>
                        )}
                        {isSorted === "desc" && (
                          <span className="text-[10px]">▼</span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* جسم الجدول: بطاقات في الموبايل وصفوف عادية في الكمبيوتر */}
          <tbody className="block md:table-row-group space-y-3 md:space-y-0 md:divide-y md:divide-gray-200 bg-transparent md:bg-white">
            {/* 1. حالة التحميل */}
            {isLoading ? (
              <tr className="block md:table-row bg-white rounded-lg md:rounded-none shadow-xs md:shadow-none">
                <td
                  colSpan={columns.length}
                  className="block md:table-cell px-4 py-8 sm:px-6 sm:py-12 text-center text-gray-600 border md:border-0 md:border-b border-gray-300 md:border-gray-500 rounded-lg md:rounded-none"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-[#31213F] rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Loading ...</span>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              /* 2. حالة عدم وجود بيانات */
              <tr className="block md:table-row bg-white rounded-lg md:rounded-none shadow-xs md:shadow-none">
                <td
                  colSpan={columns.length}
                  className="block md:table-cell px-4 py-6 sm:px-6 sm:py-8 text-center text-gray-500 text-sm border md:border-0 md:border-b border-gray-300 md:border-gray-500 rounded-lg md:rounded-none"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              /* 3. عرض صفوف البيانات */
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="block md:table-row bg-white rounded-lg md:rounded-none border border-gray-300 md:border-0 shadow-xs md:shadow-none overflow-hidden hover:bg-[#c9c9c9] hover:text-black text-[#100f0fc7] transition"
                >
                  {row.getVisibleCells().map((cell) => {
                    const headerDef = cell.column.columnDef.header;
                    const isActions = cell.column.id === "actions";

                    return (
                      <td
                        key={cell.id}
                        className={`flex md:table-cell items-center justify-between gap-4 px-4 py-2 md:px-4 md:py-1.5 border-b border-gray-100 last:border-b-0 md:border-b md:border-gray-500 text-xs sm:text-sm leading-5 text-right md: whitespace-nowrap ${
                          isActions ? "md:text-right md:w-1" : "md:text-center"
                        }`}
                      >
                        {/* اسم العمود في الموبايل */}
                        <span className="md:hidden font-bold text-[#31213F] shrink-0">
                          {typeof headerDef === "string" ? headerDef : ""}
                        </span>

                        {/* قيمة الخلية (تمت محاذاة عمود actions لأقصى اليمين تلقائياً) */}
                        <div
                          className={`md:block font-medium break-words w-full ${
                            isActions
                              ? "text-right [&>div]:justify-end"
                              : "text-left md:text-center"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* شريط التحكم بالصفحات (Pagination) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-3 bg-gray-50 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700">
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <span>عرض</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            disabled={isLoading}
            className="p-1.5 border border-gray-300 rounded bg-white disabled:opacity-50"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>سجلات لكل صفحة</span>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200">
          <span>
            الصفحة{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} من{" "}
              {table.getPageCount() || 1}
            </strong>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isLoading}
              className="px-3 py-1.5 bg-[#31213F] text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
            >
              السابق
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isLoading}
              className="px-3 py-1.5 bg-[#31213F] text-white rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#432d56] transition"
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
