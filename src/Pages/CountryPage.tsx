import { useCountry } from '../Hooks/CountryHook/useCountry';
import type { ICountry } from '../Interface/ICountry';
import { useState } from 'react';
import CrudBtn from '../Components/Buttons/CrudBtn';
import PageTitle from '../Components/Text/PageTitle';
import MainTable from '../Components/Tables/MainTable';
import CountryModel from '../Components/Popup/CountryModel';

export default function CountryPage() {
  const headers = [
    '#',
    'name Ar',
    'name En',
    'Code',
    <i className="fa fa-cogs"></i>,
  ];
  const { data: countries = [] } = useCountry();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // تحويل البيانات بنفس الترتيب
  const tblBody: ICountry[] = countries.map((country) => ({
    id: country.id,
    nameAr: country.nameAr,
    nameEn: country.nameEn,
    code: country.code,

    // countryId: airport.CountryId,
    action: (
      <div className="flex justify-center gap-x-2">
        <CrudBtn
          text="edit"
          btnType="edit"
          fun={() => {
            setSelectedCountry(country); // خزن البيانات
            setModalMode('edit');
            setIsModalOpen(true);
          }}
        />
        {/* <CrudBtn text="" btnType="delete" fun={()=>{console.log(airport)}}/>  */}
      </div>
    ),
  }));

  const openAddModal = () => {
    setSelectedCountry(null); // خزن البيانات
    setModalMode('add');
    setIsModalOpen(true);
  };

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

      <div className="flex justify-between items-center">
        <PageTitle text="Country" />
        <CrudBtn
          text="اضافة دولة جديدة"
          btnType="create"
          fun={() => openAddModal()}
        />
      </div>
      <MainTable tblHeader={headers} tblBody={tblBody ?? []} />
    </>
  );
}
