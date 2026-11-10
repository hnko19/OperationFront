import { useState, useMemo, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { useFuelCompany } from '../../Hooks/FuelCompanyHook/useFuelCompany';
import { useDeleteFuelCompany } from '../../Hooks/FuelCompanyHook/useDeleteFuelCompany';
import type { IFuelCompany } from '../../Interface/IFuelCompany';
import CrudBtn from '../../Components/Buttons/CrudBtn';
import PageTitle from '../../Components/Text/PageTitle';
import FuelCompanyModal from '../../Components/Popup/FuelCompanyModel';
import MultiDataTable from '../../Components/Tables/MultiDataTable';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const columnHelper = createColumnHelper<IFuelCompany>();

export default function FuelCompanyPage() {
  const { mutate: deleteFuelCompany } = useDeleteFuelCompany();
  const { data: fuelCompanies = [], isLoading } = useFuelCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<IFuelCompany | null>(
    null,
  );
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setSelectedCompany(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = useCallback((company: IFuelCompany) => {
    setSelectedCompany(company);
    setModalMode('edit');
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (company: IFuelCompany) => {
      Swal.fire({
        title: 'Delete Confirmation',
        text: `Are you sure you want to delete "${company.nameEn || company.nameAr}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFuelCompany(company.id, {
            onSuccess: () => toast.success('Fuel company deleted successfully'),
            onError: () => toast.error('Failed to delete fuel company'),
          });
        }
      });
    },
    [deleteFuelCompany],
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nameEn', {
        header: 'Name (EN)',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nameAr', {
        header: 'Name (AR)',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('phone', {
        header: 'Phone',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              info.getValue()
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {info.getValue() ? 'Active' : 'Inactive'}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,
        cell: (info) => {
          const company = info.row.original;
          return (
            <div className="flex justify-center gap-x-2">
              <CrudBtn
                text="edit"
                btnType="edit"
                fun={() => handleEdit(company)}
              />
              <CrudBtn
                text="delete"
                btnType="delete"
                fun={() => handleDelete(company)}
              />
            </div>
          );
        },
        enableSorting: false,
      }),
    ],
    [handleEdit, handleDelete],
  );

  return (
    <>
      <FuelCompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCompany(null);
        }}
        mode={modalMode}
        initialData={selectedCompany ?? undefined}
      />

      <div className="flex justify-between items-center mb-4">
        <CrudBtn
          text="Add New Fuel Company"
          btnType="create"
          fun={openAddModal}
        />
        <PageTitle text="Fuel Companies" />
      </div>

      <MultiDataTable
        data={fuelCompanies}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}
