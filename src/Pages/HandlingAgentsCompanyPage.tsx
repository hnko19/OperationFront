import { useHandlingAgentsCompany } from '../Hooks/HandlingAgentsCompanyHook/useHandlingAgentsCompany';
import type { IHandlingAgentsCompany } from '../Interface/IHandlingAgentsCompany';
import type { IHandlingAgentsCompanyshow } from '../Interface/IHandlingAgentsCompany';
import { useState } from 'react';
import CrudBtn from '../Components/Buttons/CrudBtn';
import PageTitle from '../Components/Text/PageTitle';
import MainTable from '../Components/Tables/MainTable';
import HandlingAgentsCompanyModel from '../Components/Popup/HandlingAgentsCompanyModel';

export default function HandlingAgentsCompanyPage() {
  const headers = [
    '#',
    'name Ar',
    'name En',
    'Email',
    // 'currency',
    'phone',
    'address',
    'مفعل',
    <i className="fa fa-cogs"></i>,
  ];
  const { data: handlingCompanies = [] } = useHandlingAgentsCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedhandlingCompany, setSelectedhandlingCompany] =
    useState<IHandlingAgentsCompany | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // تحويل البيانات بنفس الترتيب
  const tblBody: IHandlingAgentsCompanyshow[] = handlingCompanies.map(
    (handlingCompany) => ({
      id: handlingCompany.id,
      nameAr: handlingCompany.nameAr,
      nameEn: handlingCompany.nameEn,
      email: handlingCompany.email,
      //   currencyId: handlingCompany.currencyId,
      phone: handlingCompany.phone,
      address: handlingCompany.address,
      isActive: (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            handlingCompany.isActive
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {handlingCompany.isActive ? 'مفعل' : 'غير مفعل'}
        </span>
      ),

      // countryId: airport.CountryId,
      action: (
        <div className="flex justify-center gap-x-2">
          <CrudBtn
            text="edit"
            btnType="edit"
            fun={() => {
              setSelectedhandlingCompany(handlingCompany); // خزن البيانات
              setModalMode('edit');
              setIsModalOpen(true);
            }}
          />
          {/* <CrudBtn text="" btnType="delete" fun={()=>{console.log(airport)}}/>  */}
        </div>
      ),
    }),
  );

  const openAddModal = () => {
    setSelectedhandlingCompany(null); // خزن البيانات
    setModalMode('add');
    setIsModalOpen(true);
  };

  return (
    <>
      <HandlingAgentsCompanyModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedhandlingCompany(null);
        }}
        mode={modalMode}
        initialData={selectedhandlingCompany ?? undefined}
      />

      <div className="flex justify-between items-center">
        <PageTitle text="Handling Agents Company " />
        <CrudBtn
          text="اضافة شركة مناولة ارضية"
          btnType="create"
          fun={() => openAddModal()}
        />
      </div>
      <MainTable tblHeader={headers} tblBody={tblBody ?? []} />
    </>
  );
}
