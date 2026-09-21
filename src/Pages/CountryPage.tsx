import { useState, useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { useCountry } from '../Hooks/CountryHook/useCountry';
import type { ICountry } from '../Interface/ICountry';
import CrudBtn from '../Components/Buttons/CrudBtn';
import PageTitle from '../Components/Text/PageTitle';
import CountryModel from '../Components/Popup/CountryModel';
import MultiDataTable from '../Components/Tables/MultiDataTable';

const columnHelper = createColumnHelper<ICountry>();

export default function CountryPage() {
  const { data: countries = [], isLoading } = useCountry();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setSelectedCountry(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (country: ICountry) => {
    setSelectedCountry(country);
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

      columnHelper.accessor('nameAr', {
        header: 'Name Ar',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('nameEn', {
        header: 'Name En',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('code', {
        header: 'Code',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,
        cell: (info) => {
          const country = info.row.original;
          return (
            <div className="flex justify-center gap-x-2">
              <CrudBtn
                text="edit"
                btnType="edit"
                fun={() => handleEdit(country)}
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
      <CountryModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCountry(null);
        }}
        mode={modalMode}
        initialData={selectedCountry ?? undefined}
      />

      <div className="flex justify-between items-center mb-4">
        <CrudBtn text="Add New Country" btnType="create" fun={openAddModal} />
        <PageTitle text="Country" />
      </div>

      {/* تمرير data و columns مباشرة إلى المكون العام */}
      <MultiDataTable
        data={countries}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}
