import { useState, useMemo, useCallback } from 'react'; // 1. أضفنا useCallback هنا
import { createColumnHelper } from '@tanstack/react-table';

import { useAircraftSize } from '../../Hooks/AircraftSizeHook/useAircraftSize';
import type { IAircraftSize } from '../../Interface/IAircraftSize';
import CrudBtn from '../../Components/Buttons/CrudBtn';
import AircraftSizeModel from '../../Components/Popup/AircraftSizeModel';
import PageTitle from '../../Components/Text/PageTitle';
import MultiDataTable from '../../Components/Tables/MultiDataTable';
import { useDeleteAircraftSize } from '../../Hooks/AircraftSizeHook/useDeleteAircraftSize';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const columnHelper = createColumnHelper<IAircraftSize>();

export default function AircraftSizePage() {
  const { data: aircraftsizes = [], isLoading } = useAircraftSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAircraftSize, setSelectedAircraftSize] =
    useState<IAircraftSize | null>(null);

  const { mutate: deleteAircraftSize /* isPending: isDeleting*/ } =
    useDeleteAircraftSize();

  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setSelectedAircraftSize(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  // 2. تغليف handleEdit بـ useCallback
  const handleEdit = useCallback((aircraftsize: IAircraftSize) => {
    setSelectedAircraftSize(aircraftsize);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  // 3. تغليف handleDelete بـ useCallback مع تمرير deleteAircraftSize كاعتمادية
  const handleDelete = useCallback(
    (aircraftsize: IAircraftSize) => {
      Swal.fire({
        title: 'تأكيد الحذف',
        text: `هل تريد حذف "${aircraftsize.size}"؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'نعم، احذف',
        cancelButtonText: 'إلغاء',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAircraftSize(aircraftsize.id, {
            onSuccess: () => toast.success('تم الحذف بنجاح'),
            onError: () => toast.error('حدث خطأ أثناء الحذف'),
          });
        }
      });
    },
    [deleteAircraftSize],
  );

  // 4. إضافة handleEdit و handleDelete في مصفوفة الاعتماديات الخاصة بـ useMemo
  const columns = useMemo(
    () => [
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

              <CrudBtn
                text="delete"
                btnType="delete"
                fun={() => handleDelete(aircraftSize)}
              />
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [handleEdit, handleDelete], // <-- هنا تم حل تحذير ESLint
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

      <MultiDataTable
        data={aircraftsizes}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}