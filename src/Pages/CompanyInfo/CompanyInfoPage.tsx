import { useCompanyInfo } from '../../Hooks/CompanyInfoHook/useCompanyInfo';
import type { ICompanyInfo } from '../../Interface/ICompanyInfo';
import { useState } from 'react';
import CrudBtn from '../../Components/Buttons/CrudBtn';
import PageTitle from '../../Components/Text/PageTitle';
import MainTable from '../../Components/Tables/MainTable';
import CompanyInfoModel from '../../Components/Popup/CompanyInfoModel';

export default function CompanyInfoPage() {
  const headers = [
    '#',
    'Name (AR)',
    'Name (EN)',
    'Code',
    'Email',
    <i key="action-icon" className="fa fa-cogs"></i>,
  ];

  const { data: CompanyInfoes = [] } = useCompanyInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyInfo, setSelectedCompanyInfo] =
    useState<ICompanyInfo | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Format table data
  const tblBody = CompanyInfoes.map((companyInfo: ICompanyInfo) => ({
    id: companyInfo.id,
    nameAr: companyInfo.nameAr,
    nameEn: companyInfo.nameEn,
    code: companyInfo.code,
    email: companyInfo.email || '-',
    action: (
      <div className="flex justify-center gap-x-2">
        <CrudBtn
          text="Edit"
          btnType="edit"
          fun={() => {
            setSelectedCompanyInfo(companyInfo);
            setModalMode('edit');
            setIsModalOpen(true);
          }}
        />
      </div>
    ),
  }));

  const openAddModal = () => {
    setSelectedCompanyInfo(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  return (
    <>
      <CompanyInfoModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCompanyInfo(null);
        }}
        mode={modalMode}
        initialData={selectedCompanyInfo ?? undefined}
      />

      <div className="flex justify-between items-center">
        <CrudBtn text="Add New" btnType="create" fun={openAddModal} />
        <PageTitle text="Company & Airport Info" />
      </div>

      <MainTable tblHeader={headers} tblBody={tblBody} />
    </>
  );
}
