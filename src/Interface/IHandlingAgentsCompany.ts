export interface IHandlingAgentsCompany {
  id: number;
  currencyId: number;
  phone: string;
  email: string;
  nameAr: string;
  nameEn: string;
  address: string;
  isActive: boolean;
}

export interface IHandlingAgentsCompanyshow {
  id: number;
  // currencyId: number;
  phone: string;
  email: string;
  nameAr: string;
  nameEn: string;
  address: string;
  isActive: React.ReactNode; //  تغيير النوع لدعم عناصر JSX
  action?: React.ReactNode; //  إضافة أزرار التحكم
}
