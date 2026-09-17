import type { IAirline } from "./IAirline";

// 1. حجم الطائرة
export interface ISize {
  id: number;
  size: string;
}

// 2. نوع الطائرة للعرض في الجداول والـ Get (راجع من السيرفر)
export interface IAircraftTypeShow {
  id: number;
  type: string;
  sizeId: number;
  createdBy: string | null;
  creationDate: string | null;
  updatedBy: string | null;
  updatingDate: string | null;
  size: ISize;
}

// 3. نوع الطائرة عند الإرسال للـ API (Add / Create)
// (السيرفر غالباً لا يطلب id أو size كـ object أو تواريخ، فقط type و sizeId)
export interface IAircraftTypeCreate {
  type: string;
  sizeId: number;
}

// 4. الواجهة التي تخص شركات الطيران/الوكيل (التي كانت مكتوبة بالخطأ كـ AircraftTypeShow)
export interface IAirlineAgentShow {
  id: number;
  nameAr: string;
  nameAn: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  airLineId: number;
  userId: string;
  isActive: boolean;
  airLine: IAirline;
}