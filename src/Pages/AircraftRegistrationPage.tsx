import { useAircraftRegistration } from '../Hooks/AircraftRegistrationHook/useAircraftRegistration';
import type { IAircraftRegistration } from '../Interface/IAircraftRegistration';
import type { IAircraftRegistrationshow } from '../Interface/IAircraftRegistration';

import { useState } from 'react';
import CrudBtn from '../Components/Buttons/CrudBtn';
import AircraftRegistrationModel from '../Components/Popup/AircraftRegistrationModel';
import PageTitle from '../Components/Text/PageTitle';
import MainTable from '../Components/Tables/MainTable';

export default function AircraftRegistrationPage() {
  const headers = [
    '#',
    'Registration',
    'max Wieght',
    'Type(النوع)',
    <i className="fa fa-cogs"></i>,
  ];
  const { data: aircraftRegistrations = [] } = useAircraftRegistration();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAircraftRegistration, setSelectedAircraftRegistration] =
    useState<IAircraftRegistration | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const tblBody: IAircraftRegistrationshow[] = aircraftRegistrations.map(
    (aircraftRegistration) => ({
      id: aircraftRegistration.id,
      registration: aircraftRegistration.registration,
      maxTakoffWieght: aircraftRegistration.maxTakoffWieght,
      aircraftType: aircraftRegistration.aircraftType?.type ?? 'غير محدد',

      // sizeId: aircraftType.sizeId,
      //   aircraftType: aircraftRegistration.aircraftType?.type ?? 'غير محدد',
      action: (
        <div className="flex justify-center gap-x-2">
          <CrudBtn
            text="edit"
            btnType="edit"
            fun={() => {
              setSelectedAircraftRegistration(aircraftRegistration); // خزن البيانات
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
    setSelectedAircraftRegistration(null); // خزن البيانات
    setModalMode('add');
    setIsModalOpen(true);
  };

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

      <div className="flex justify-between items-center">
        <CrudBtn
          text="Add Aircraft Registration"
          btnType="create"
          fun={() => openAddModal()}
        />
        <PageTitle text="Aircraft Registration" />
      </div>
      <MainTable tblHeader={headers} tblBody={tblBody ?? []} />
    </>
  );
}
