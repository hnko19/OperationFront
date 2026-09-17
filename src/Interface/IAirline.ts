export interface IAirline {
  id: number;
  name: string;
  code: string;
  phone: string | null;
  email: string | null;
  arName: string;
  address: string | null;
  accId: string | null;
  isLocalCompany: boolean;
  currencyType: number;
  createdBy: string | null;
  creationDate: string | null;
  updatedBy: string | null;
  updatingDate: string | null;
}