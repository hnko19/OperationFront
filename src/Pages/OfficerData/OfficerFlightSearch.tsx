import { useMemo, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import CrudBtn from '../../Components/Buttons/CrudBtn';
import PageTitle from '../../Components/Text/PageTitle';
import FlightFilterForm from '../../Components/Form/FlightFilterForm';
import { useFlightFilter } from '../../Hooks/OfficerDataHook/useFlightFilter';
import type { ITowerDataViewDomain } from '../../Interface/IOfficerData';
import MultiDataTable from '../../Components/Tables/MultiDataTableSm';
import { getOfficerDataById } from '../../Api/OfficerData';
import OfficerModelFullValidation from '../../Components/Popup/OfficerModel/OfficerModelFullValidation';
const columnHelper = createColumnHelper<ITowerDataViewDomain>();
import type { IOfficerData } from '../../Interface/IOfficerData';
import { useState } from 'react';
export default function OfficerFlightSearch() {
  const {
    mutate: searchFlights,
    data: flights = [],
    isPending: isLoading,
    reset: resetSearchResults,
  } = useFlightFilter();

  // const handleEdit = useCallback((flight: ITowerDataViewDomain) => {
  //   console.log('Edit flight:', flight);
  //   // منطق فتح نافذة التعديل العادية هنا
  // }, []);

  // Modal Full فقط
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [selectedFullOfficerData, setSelectedFullOfficerData] =
    useState<IOfficerData | null>(null);

  const handleEditFull = useCallback(async (towerDataId: number) => {
    try {
      const fullData = await getOfficerDataById(towerDataId);
      setSelectedFullOfficerData(fullData);
      setIsFullModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch officer data:', error);
    }
  }, []);

  // const handleConfirm = useCallback((flight: ITowerDataViewDomain) => {
  //   console.log('Confirm flight:', flight);
  //   // منطق تأكيد الرحلة هنا
  // }, []);

  // تعريف الأعمدة باستخدام useMemo مع columnHelper
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('flightNoName', {
        header: 'Flight No',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('airLineNameEn', {
        header: 'Airline',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('registration', {
        header: 'Registration',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('ata', {
        header: 'ATA',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('atd', {
        header: 'ATD',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('airportFromNameAr', {
        header: 'From',
        cell: (info) =>
          info.getValue() || info.row.original.airportFromNameEn || '—',
      }),

      columnHelper.accessor('airportToNameAr', {
        header: 'To',
        cell: (info) =>
          info.getValue() || info.row.original.airportToNameEn || '—',
      }),

      columnHelper.accessor('status', {
        id: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();

          // تم الهبوط والإقلاع معاً
          if (status === 5) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/takeOffAndLanding.png"
                  alt="Takeoff Success"
                  className="w-7 h-7 object-contain"
                  title="Landed & Taken off successfully"
                />
              </div>
            );
          }

          // انتظار
          if (status === 1) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/waiting.png"
                  alt="Waiting"
                  className="w-7 h-7 object-contain"
                  title="Waiting"
                />
              </div>
            );
          }

          // هبوط فقط
          if (status === 4) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/landingSuccess.png"
                  alt="Landing"
                  className="w-7 h-7 object-contain"
                  title="Landed Only"
                />
              </div>
            );
          }

          // إقلاع فقط (حالات 2 أو 3)
          if (status && [2, 3].includes(status)) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/takeOffSuccess.png"
                  alt="Plane Waiting"
                  className="w-7 h-7 object-contain"
                  title="Waiting"
                />
              </div>
            );
          }

          return <span className="flex justify-center text-gray-400">—</span>;
        },
      }),

      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,
        cell: (info) => {
          const rowData = info.row.original;

          return (
            <div className="flex justify-center">
              <CrudBtn
                text="edit"
                btnType="edit"
                fun={() => handleEditFull(rowData.id)}
              />
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [handleEditFull],
  );

  return (
    <>
      <PageTitle text="بحث في رحلات المراقب الجوي" />

      <OfficerModelFullValidation
        isOpen={isFullModalOpen}
        onClose={() => {
          setIsFullModalOpen(false);
          setSelectedFullOfficerData(null);
        }}
        initialData={selectedFullOfficerData}
      />

      {/* نموذج البحث مع دعم التفريغ الفوري للجدول */}
      <FlightFilterForm
        onSearch={searchFlights}
        onReset={resetSearchResults}
        isLoading={isLoading}
      />

      {/* جدول TanStack Table */}
      <div className="mt-4">
        {/* <MainTable columns={columns} data={flights} /> */}
        <MultiDataTable
          data={flights}
          columns={columns}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
