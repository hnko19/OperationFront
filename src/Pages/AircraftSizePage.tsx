import { useAircraftSize } from '../Hooks/AircraftSizeHook/useAircraftSize';
import type { IAircraftSize } from '../Interface/IAircraftSize';
import { useState } from 'react';
import CrudBtn from '../Components/Buttons/CrudBtn';
import AircraftSizeModel from '../Components/Popup/AircraftSizeModel';
import PageTitle from '../Components/Text/PageTitle';
import MainTable from '../Components/Tables/MainTable';

export default function AircraftSizePage() {
  const headers = ['#', 'الوزن(Size)', <i className="fa fa-cogs"></i>];
  const { data: aircraftsizes = [] } = useAircraftSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAircraftSize, setSelectedAircraftSize] =
    useState<IAircraftSize | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // تحويل البيانات بنفس الترتيب
  const tblBody: IAircraftSize[] = aircraftsizes.map((aircraftsize) => ({
    id: aircraftsize.id,
    size: aircraftsize.size,

    // countryId: airport.CountryId,
    action: (
      <div className="flex justify-center gap-x-2">
        <CrudBtn
          text="edit"
          btnType="edit"
          fun={() => {
            setSelectedAircraftSize(aircraftsize); // خزن البيانات
            setModalMode('edit');
            setIsModalOpen(true);
          }}
        />
        {/* <CrudBtn text="" btnType="delete" fun={()=>{console.log(airport)}}/>  */}
      </div>
    ),
  }));

  const openAddModal = () => {
    setSelectedAircraftSize(null); // خزن البيانات
    setModalMode('add');
    setIsModalOpen(true);
  };

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
      <MainTable tblHeader={headers} tblBody={tblBody ?? []} />
    </>
  );
}
