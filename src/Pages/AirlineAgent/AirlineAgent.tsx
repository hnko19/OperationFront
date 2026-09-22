import { useMemo } from 'react'; //1 - useMemo
import { createColumnHelper } from '@tanstack/react-table'; //2- لعمل column datatable
import MultiDataTable from '../../Components/Tables/MultiDataTable'; //3- بدل  MainTable

import { useState } from 'react';
import type { IAirlineAgentShow } from '../../Interface/IAirlineAgent';
import CrudBtn from '../../Components/Buttons/CrudBtn';
import PageTitle from '../../Components/Text/PageTitle';
// import MainTable from '../../Components/Tables/MainTable';
import AirlineAgentModel from '../../Components/Popup/AirlineAgentModel';
import { useAirlineAgent } from '../../Hooks/AirlineAgentHook/useAirlineAgent';

const columnHelper = createColumnHelper<IAirlineAgentShow>(); ////////// 4

// واجهة لتمثيل البيانات المعروضة في أسطر الجدول
// export interface IAirlineAgentTableRow {
//   id: number;
//   nameAr: string;
//   nameAn: string;
//   airline: string;
//   phone: string;
//   email: string;
//   status: ReactNode;
//   action: ReactNode;
// }

export default function AirlineAgentPage() {
  // const headers = [
  //   "#",
  //   "Arabic Name",
  //   "English Name",
  //   "Airline",
  //   "Phone",
  //   "Email",
  //   "Status",
  //   <i className="fa fa-cogs" key="actions-header"></i>,
  // ];

  const { data: airlineAgents = [], isLoading } = useAirlineAgent(); // 5 اضافة ,isLoading
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAirlineAgent, setSelectedAirlineAgent] =
    useState<IAirlineAgentShow | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setSelectedAirlineAgent(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (airlineAgent: IAirlineAgentShow) => {
    setSelectedAirlineAgent(airlineAgent);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // تحويل البيانات القادمة من السيرفر (IAirlineAgentShow) إلى شكل صفوف الجدول
  // const tblBody: IAirlineAgentTableRow[] = airlineAgents.map((item) => ({
  //   id: item.id,
  // nameAr: item.nameAr || "-",
  // nameAn: item.nameAn || "-",
  // airline: item.airLine?.name || item.airLine?.arName || "-", // انتبه لخاصية اسم شركة الطيران
  // phone: item.phone1 || "-",
  // email: item.email || "-",
  //   status: (
  //     <span
  //       className={`px-2 py-1 rounded-full text-xs font-semibold ${
  //         item.isActive
  //           ? "bg-green-100 text-green-700"
  //           : "bg-red-100 text-red-700"
  //       }`}
  //     >
  //       {item.isActive ? "Active" : "Inactive"}
  //     </span>
  //   ),
  //   action: (
  //     <div className="flex justify-center items-center gap-x-2">
  //       <CrudBtn text="" btnType="edit" fun={() => openEditModal(item)} />
  //       {/* في حال تفعيل الحذف لاحقاً:
  //       <CrudBtn
  //         text=""
  //         btnType="delete"
  //         fun={() => handleDelete(item.id)}
  //       />
  //       */}
  //     </div>
  //   ),
  // }));

  //////////////    6 //////////////////////Table
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('nameAr', {
        header: 'الاسم بالعربي',
        cell: (info) => info.getValue() || '-',
      }),

      // لاحظ كتابة nameAn كما وردت لديك في الكود المرجعي
      columnHelper.accessor('nameAn', {
        header: 'الاسم بالإنجليزي',
        cell: (info) => info.getValue() || '-',
      }),

      // شركة الطيران مع معالجة القيم المحتملة
      columnHelper.accessor(
        (row) => row.airLine?.name || row.airLine?.arName || '-',
        {
          id: 'airline',
          header: 'Airline',
          cell: (info) => info.getValue(),
        },
      ),

      columnHelper.accessor('phone1', {
        header: 'Phone',
        cell: (info) => info.getValue() || '-',
      }),

      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue() || '-',
      }),

      // حالة التفعيل مع تنسيق الـ Badge
      columnHelper.accessor('isActive', {
        header: 'Status',
        cell: (info) => {
          const isActive = info.getValue();
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        },
      }),

      // عمود الإجراءات (Actions)
      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,
        cell: (info) => {
          const agent = info.row.original;
          return (
            <div className="flex justify-center items-center gap-x-2">
              <CrudBtn
                text=""
                btnType="edit"
                fun={() => openEditModal(agent)}
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
      <AirlineAgentModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAirlineAgent(null);
        }}
        mode={modalMode}
        initialData={selectedAirlineAgent ?? undefined}
      />

      <div className="flex justify-between items-center mb-4">
        <PageTitle text="Airline Agents" />
        <CrudBtn text="New Airline Agent" btnType="create" fun={openAddModal} />
      </div>

      {/*  7  تمرير data و columns مباشرة إلى المكون العام */}
      <MultiDataTable
        data={airlineAgents}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}
