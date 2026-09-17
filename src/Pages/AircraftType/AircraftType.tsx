import { useState, type ReactNode } from "react";
import { useAircraftType } from "../../Hooks/AircraftTypeHook/useAircraftType";
import type { IAircraftTypeShow } from "../../Interface/IAircraftType";
import CrudBtn from "../../Components/Buttons/CrudBtn";
import PageTitle from "../../Components/Text/PageTitle";
import MainTable from "../../Components/Tables/MainTable";
import AircraftTypeModel from "../../Components/Popup/AircraftTypeModel";


// واجهة لتمثيل البيانات المعروضة في أسطر الجدول
export interface IAircraftTypeTableRow {
  id: number;
  type: string;
  size: string;
  creationDate: string;
  action: ReactNode;
}

export default function AircraftTypePage() {
  const headers = [
    "#",
    " Type ",
    "Size",
    "Date",
    <i className="fa fa-cogs" key="actions-header"></i>,
  ];

  const { data: aircraftTypes = [] } = useAircraftType();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAircraftType, setSelectedAircraftType] =
    useState<IAircraftTypeShow | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const openAddModal = () => {
    setSelectedAircraftType(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (aircraftType: IAircraftTypeShow) => {
    setSelectedAircraftType(aircraftType);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // تحويل البيانات القادمة من السيرفر (IAircraftTypeShow) إلى شكل صفوف الجدول
  const tblBody: IAircraftTypeTableRow[] = aircraftTypes.map((item) => ({
    id: item.id,
    type: item.type,
    size: item.size?.size ?? "-",
    creationDate: item.creationDate
      ? new Date(item.creationDate).toLocaleDateString("ar-EG")
      : "-",
    action: (
      <div className="flex justify-center items-center gap-x-2">
        <CrudBtn
          text=""
          btnType="edit"
          fun={() => openEditModal(item)}
        />
        {/* في حال تفعيل الحذف لاحقاً:
        <CrudBtn
          text=""
          btnType="delete"
          fun={() => handleDelete(item.id)}
        /> 
        */}
      </div>
    ),
  }));

  return (
    <>
      <AircraftTypeModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAircraftType(null);
        }}
        mode={modalMode}
        initialData={selectedAircraftType ?? undefined}
      />

      <div className="flex justify-between items-center mb-4">
        <PageTitle text="أنواع الطائرات (Aircraft Types)" />
        <CrudBtn
          text="إضافة نوع طائرة"
          btnType="create"
          fun={openAddModal}
        />
      </div>

      <MainTable tblHeader={headers} tblBody={tblBody} />
    </>
  );
}