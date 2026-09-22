import { useState, useMemo } from 'react'; //1
import { createColumnHelper } from '@tanstack/react-table'; //2

import { useAircraftRegistration } from '../../Hooks/AircraftRegistrationHook/useAircraftRegistration';
import type { IAircraftRegistration } from '../../Interface/IAircraftRegistration';
import CrudBtn from '../../Components/Buttons/CrudBtn';
import PageTitle from '../../Components/Text/PageTitle';
import AircraftRegistrationModel from '../../Components/Popup/AircraftRegistrationModel';
import MultiDataTable from '../../Components/Tables/MultiDataTable'; //3

import { useDeleteAircraftRegistration } from '../../Hooks/AircraftRegistrationHook/useDeleteAircraftRegistration';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const columnHelper = createColumnHelper<IAircraftRegistration>(); //4

export default function AircraftRegistrationPage() {
  const { data: aircraftRegistrations = [], isLoading } =
    useAircraftRegistration();
  const { mutate: deleteAircraftRegistration /* isPending: isDeleting*/ } =
    useDeleteAircraftRegistration();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAircraftRegistration, setSelectedAircraftRegistration] =
    useState<IAircraftRegistration | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setSelectedAircraftRegistration(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (aircraftRegistration: IAircraftRegistration) => {
    setSelectedAircraftRegistration(aircraftRegistration); //5
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (aircraftregistration: IAircraftRegistration) => {
    Swal.fire({
      title: 'تأكيد الحذف',
      text: `هل تريد حذف "${aircraftregistration.registration}"؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAircraftRegistration(aircraftregistration.id, {
          onSuccess: () => toast.success('تم الحذف بنجاح'),
          onError: () => toast.error('حدث خطأ أثناء الحذف'),
        });
      }
    });
  };

  // تعريف الأعمدة      6
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('registration', {
        header: 'Registration',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('maxTakoffWieght', {
        header: 'Max Weight',
        cell: (info) => info.getValue(),
      }),
      // الوصول لنوع الطائرة من الكائن الفرعي مع إعطاء قيمة بديلة إن لم يتوفر
      columnHelper.accessor((row) => row.aircraftType?.type ?? 'غير محدد', {
        id: 'aircraftType',
        header: 'Type (النوع)',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,
        cell: (info) => {
          const aircraft = info.row.original;
          return (
            <div className="flex justify-center gap-x-2">
              <CrudBtn
                text="edit"
                btnType="edit"
                fun={() => handleEdit(aircraft)}
              />
              {/* زر الحذف الجديد */}
              <CrudBtn
                text="delete"
                btnType="delete"
                fun={() => handleDelete(aircraft)}
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
      <AircraftRegistrationModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAircraftRegistration(null);
        }}
        mode={modalMode}
        initialData={selectedAircraftRegistration ?? undefined}
      />

      <div className="flex justify-between items-center mb-4">
        <CrudBtn
          text="Add Aircraft Registration"
          btnType="create"
          fun={openAddModal}
        />
        <PageTitle text="Aircraft Registration" />
      </div>

      {/* تمرير البيانات والأعمدة ومؤشر التحميل مباشرة إلى MultiDataTable */}
      <MultiDataTable ///7
        data={aircraftRegistrations}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}
