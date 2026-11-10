import { useState, useMemo, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { useFilghtNotComplate } from '../../Hooks/OfficerDataHook/useFilghtNotComplate';
import type { IOfficerData } from '../../Interface/IOfficerData';
import type { IFilghtNotComplateView } from '../../Interface/IOfficerData';

import CrudBtn from '../../Components/Buttons/CrudBtn';
import PageTitle from '../../Components/Text/PageTitle';
import OfficerDataModelFull from '../../Components/Popup/OfficerModel/OfficerDataModelFull';
import MultiDataTable from '../../Components/Tables/MultiDataTableSm';
import { getOfficerDataById } from '../../Api/OfficerData';

const columnHelper = createColumnHelper<IFilghtNotComplateView>();

export default function FilghtNotComplate() {
  const { data: officerDatas = [], isLoading } = useFilghtNotComplate();

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

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('flightNoName', {
        header: 'رقم الرحلة',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('airLineNameEn', {
        header: 'شركة الطيران',
        cell: (info) => info.getValue() ?? '—',
      }),

      columnHelper.accessor('date', {
        header: 'التاريخ',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('ata', {
        header: 'وقت الهبوط (ATA)',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('atd', {
        header: 'وقت المغادرة (ATD)',
        cell: (info) => info.getValue() || '—',
      }),

      columnHelper.accessor('airportFromNameAr', {
        header: 'من',
        cell: (info) =>
          info.getValue() || info.row.original.airportFromNameEn || '—',
      }),

      columnHelper.accessor('airportToNameAr', {
        header: 'إلى',
        cell: (info) =>
          info.getValue() || info.row.original.airportToNameEn || '—',
      }),

      columnHelper.accessor('status', {
        id: 'status',
        header: 'الحالة',
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
                  title="تم الهبوط والإقلاع بنجاح"
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
                  title="انتظار"
                />
              </div>
            );
          }

          // تم الهبوط فقط
          if (status === 4) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/landingSuccess.png"
                  alt="Landing"
                  className="w-7 h-7 object-contain"
                  title="تم الهبوط فقط"
                />
              </div>
            );
          }

          if (status === null) {
            return <div className="flex justify-center items-center">—</div>;
          }

          // قيد الانتظار أو الإقلاع
          if (status && [2, 3].includes(status)) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/takeOffSuccess.png"
                  alt="Plane Waiting"
                  className="w-7 h-7 object-contain"
                  title="قيد الانتظار"
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
      <OfficerDataModelFull
        isOpen={isFullModalOpen}
        onClose={() => {
          setIsFullModalOpen(false);
          setSelectedFullOfficerData(null);
        }}
        initialData={selectedFullOfficerData}
      />

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <PageTitle text="الرحلات غير المكتملة (Incomplete Flight)" />
      </div>

      <MultiDataTable
        data={officerDatas}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}
