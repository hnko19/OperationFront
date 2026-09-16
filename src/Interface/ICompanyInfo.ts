export interface ICompanyInfo {
  id: number;
  nameAr: string;
  nameEn: string;
  code: string;
  address: string;
  revenuesManager: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdBy: string | null;
  creationDate: string | null;
  updatedBy: string | null;
  updatingDate: string | null;
  landingSupervisor: string;
  serviceCarSupervisor: string;
  interCuupssupervisor: string;
  domeCuupssupervisor: string;
  interNysupervisor: string;
  domeNysupervisor: string;
  firstClassSupervisor: string;
  pushBackSupervisor: string;
  isSingleAccounting: boolean;
}
