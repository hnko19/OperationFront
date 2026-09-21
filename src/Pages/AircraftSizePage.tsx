import { useState, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { useAircraftSize } from '../Hooks/AircraftSizeHook/useAircraftSize';
import type { IAircraftSize } from '../Interface/IAircraftSize';
import CrudBtn from '../Components/Buttons/CrudBtn';
import AircraftSizeModel from '../Components/Popup/AircraftSizeModel';
import PageTitle from '../Components/Text/PageTitle';
import MultiDataTable from '../Components/Tables/MultiDataTable';
const columnHelper = createColumnHelper<IAircraftSize>();

export default function AircraftSizePage() {
  const { data: aircraftsizes = [], isLoading } = useAircraftSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAircraftSize, setSelectedAircraftSize] =
    useState<IAircraftSize | null>(null);

  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setSelectedAircraftSize(null); // خزن البيانات
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (aircraftsize: IAircraftSize) => {
    setSelectedAircraftSize(aircraftsize);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // تعريف الأعمدة فقط
  const columns = useMemo(
    () => [
      // columnHelper.display({
      //   id: 'index',
      //   header: '#',
      //   cell: (info) => info.row.index + 1,
      //   enableSorting: false,
      // }),
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('size', {
        header: 'size',
        cell: (info) => info.getValue(),
      }),

      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,
        cell: (info) => {
          const aircraftSize = info.row.original;
          return (
            <div className="flex justify-center gap-x-2">
              <CrudBtn
                text="edit"
                btnType="edit"
                fun={() => handleEdit(aircraftSize)}
              />
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [],
  );

  return (
    <>
      <AircraftSizeModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAircraftSize(null);
        }}
        mode={modalMode}
        initialData={selectedAircraftSize ?? undefined}
      />

      <div className="flex justify-between items-center">
        <CrudBtn
          text="Add Aircraft sizes"
          btnType="create"
          fun={() => openAddModal()}
        />
        <PageTitle text="Aircraft sizes" />
      </div>
      {/* هنا يتم استخدام المتغير لحل خطأ ESLint وتشغيل التحميل */}
      <MultiDataTable
        data={aircraftsizes}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}
