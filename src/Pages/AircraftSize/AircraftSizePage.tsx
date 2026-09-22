import { useState, useMemo } from 'react'; //
import { createColumnHelper } from '@tanstack/react-table'; //2

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
    setSelectedAircraftSize(null); // خزن البيانات
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (aircraftsize: IAircraftSize) => {
    setSelectedAircraftSize(aircraftsize);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (aircraftsize: IAircraftSize) => {
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

              {/* زر الحذف الجديد */}
              <CrudBtn
                text="delete"
                btnType="delete"
                fun={() => handleDelete(aircraftSize)}
                // disabled={isDeleting}
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
