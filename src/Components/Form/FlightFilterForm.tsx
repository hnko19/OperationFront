import { useFormik } from 'formik';
import type { IFlightSearchRequestModel } from '../../Interface/IOfficerData';
import { useAirlineFids } from '../../Hooks/AirlineHook/useAirline';
import SelectSingle from '../DropdownList/SelectSingle';
import type { IAirlineFids } from '../../Interface/IAirline';

interface Props {
  onSearch: (values: IFlightSearchRequestModel) => void;
  onReset?: () => void; // إضافة خاصية تفريغ البيانات
  isLoading: boolean;
}

export default function FlightFilterForm({
  onSearch,
  onReset,
  isLoading,
}: Props) {
  const { data: airlines } = useAirlineFids();

  const airlineOptions = (airlines ?? [])
    .filter((a: IAirlineFids) => a.Id != null)
    .map((a: IAirlineFids) => ({
      value: a.Id,
      label: a.NameAr ?? '',
    }));

  const inputClass =
    'w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100';

  const formik = useFormik<IFlightSearchRequestModel>({
    initialValues: {
      flightNo: '',
      airlineId: null,
      dateFrom: null,
      dateTo: null,
    },

    onSubmit: (values) => {
      onSearch({
        flightNo: values.flightNo?.trim() || null,
        airlineId: values.airlineId ? Number(values.airlineId) : null,
        dateFrom: values.dateFrom || null,
        dateTo: values.dateTo || null,
      });
    },
  });

  const handleReset = () => {
    // 1. تصفير حقول النموذج
    formik.resetForm();

    // 2. تصفير الجدول وإلغاء البيانات السابقة دون إرسال أي طلب
    if (onReset) {
      onReset();
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mt-4 bg-white p-4 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Flight No */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">رقم الرحلة</label>
          <input
            name="flightNo"
            value={formik.values.flightNo || ''}
            onChange={formik.handleChange}
            disabled={isLoading}
            className={inputClass}
            placeholder="ادخل رقم الرحلة (مثال: BDR-245)"
          />
        </div>

        {/* Airline */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">الخطوط الجوية</label>
          <SelectSingle
            name="airlineId"
            options={airlineOptions}
            value={formik.values.airlineId ?? 0}
            onChange={(val) =>
              formik.setFieldValue('airlineId', val ? Number(val) : null)
            }
          />
        </div>

        {/* Date From */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">من تاريخ</label>
          <input
            type="date"
            name="dateFrom"
            value={formik.values.dateFrom || ''}
            onChange={formik.handleChange}
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">إلى تاريخ</label>
          <input
            type="date"
            name="dateTo"
            value={formik.values.dateTo || ''}
            onChange={formik.handleChange}
            disabled={isLoading}
            className={inputClass}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isLoading ? 'جاري البحث...' : 'بحث'}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
        >
          إعادة تعيين
        </button>
      </div>
    </form>
  );
}
