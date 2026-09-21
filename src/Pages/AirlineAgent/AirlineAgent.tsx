import { useState, type ReactNode } from "react";
import type { IAirlineAgentShow } from "../../Interface/IAirlineAgent";
import CrudBtn from "../../Components/Buttons/CrudBtn";
import PageTitle from "../../Components/Text/PageTitle";
import MainTable from "../../Components/Tables/MainTable";
import AirlineAgentModel from "../../Components/Popup/AirlineAgentModel";
import { useAirlineAgent } from "../../Hooks/AirlineAgentHook/useAirlineAgent";

// واجهة لتمثيل البيانات المعروضة في أسطر الجدول
export interface IAirlineAgentTableRow {
  id: number;
  nameAr: string;
  nameAn: string;
  airline: string;
  phone: string;
  email: string;
  status: ReactNode;
  action: ReactNode;
}

export default function AirlineAgentPage() {
  const headers = [
    "#",
    "Arabic Name",
    "English Name",
    "Airline",
    "Phone",
    "Email",
    "Status",
    <i className="fa fa-cogs" key="actions-header"></i>,
  ];

  const { data: airlineAgents = [] } = useAirlineAgent();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAirlineAgent, setSelectedAirlineAgent] =
    useState<IAirlineAgentShow | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const openAddModal = () => {
    setSelectedAirlineAgent(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const openEditModal = (airlineAgent: IAirlineAgentShow) => {
    setSelectedAirlineAgent(airlineAgent);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // تحويل البيانات القادمة من السيرفر (IAirlineAgentShow) إلى شكل صفوف الجدول
  const tblBody: IAirlineAgentTableRow[] = airlineAgents.map((item) => ({
    id: item.id,
  nameAr: item.nameAr || "-",
  nameAn: item.nameAn || "-",
  airline: item.airLine?.name || item.airLine?.arName || "-", // انتبه لخاصية اسم شركة الطيران
  phone: item.phone1 || "-",
  email: item.email || "-",
    status: (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          item.isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {item.isActive ? "Active" : "Inactive"}
      </span>
    ),
    action: (
      <div className="flex justify-center items-center gap-x-2">
        <CrudBtn text="" btnType="edit" fun={() => openEditModal(item)} />
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
        <CrudBtn
          text="New Airline Agent"
          btnType="create"
          fun={openAddModal}
        />
      </div>

      <MainTable tblHeader={headers} tblBody={tblBody} />
    </>
  );
}