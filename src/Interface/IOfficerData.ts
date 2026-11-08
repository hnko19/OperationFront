export interface IOfficerData {
  id: number;
  towerDataId: number;

  handlingAgentId: number | null; // ✅ تعديل هنا
  fuelCompanyId: number | null; // ✅ تعديل هنا
  aireLineAgentId: number | null; // ✅ تعديل هنا

  trnycupps: number;
  emb: number;
  embInft: number;

  disemb: number;
  disEmbInft: number;

  pax: number;
  paxInter: number;
  firstClassCount: number;

  date: string;

  freightLoadingExp: number;
  freightLoadingImp: number;

  normalMailLoadingExp: number;
  normalMailLoadingImp: number;

  rapidMailLoadingExp: number;
  rapidMailLoadingImp: number;

  ambulanceCarCount: number;
  fireFightingCarCount: number;

  isCurrentAccount: boolean;
  isClaimCalculated: boolean;
  isNotUsedCupps: boolean;
  hasPushPack: boolean;

  fuelLiter: number;

  companyInfoId: number;

  createdBy: string;
  creationDate: string;

  updatedBy: string;
  updatingDate: string;

  towerData?: ITowerData;
}

export interface ITowerData {
  id: number;

  airLineId: number;
  aircraftRegId: number;

  airportIdFrom: number;
  airportIdTo: number;

  // يمكن أن تكون NULL من قاعدة البيانات
  landingDate: string | null;
  takeOffDate: string | null;

  status: number;
  date: string;

  // يمكن أن تكون NULL من قاعدة البيانات
  ata: string | null;
  atd: string | null;

  tripTypeId: number;
  companyInfoId: number;

  fidsFlightId: number;
  flightNoName: string;

  createdBy: string;
  creationDate: string;

  updatedBy: string;
  updatingDate: string;
}

export interface IOfficerDataShow {
  id: number;

  airlineId: number;
  flightNo: string;

  date: string;
  time: string;

  airportFrom: number;
  airportTo: number;

  flightTypeId: number;

  flightTypeNameAr: string;
  flightTypeNameEn: string;

  airlineNameAr: string;
  airlineNameEn: string;

  airportFromNameAr: string;
  airportFromNameEn: string;

  airportToNameAr: string;
  airportToNameEn: string;

  isConsumed: boolean;
  isOfficerConfirmed: boolean;

  flightStatusId: number;
  status: number;
  isOpen: boolean;

  towerDataId: number | null;
  requestStatus: number | null;

  isAnyRequestNotAccepted: boolean;
  isAnyRequestNotConfirm: boolean;
}

export interface IFilghtNotComplateView {
  id: number;

  airLineId: number;
  flightNoName: string;

  aircraftRegId: number;
  fidsFlightId: number | null;

  airportIdTo: number | null;
  airportIdFrom: number | null;

  landingDate: string | null;
  takeOffDate: string | null;

  status: number;
  date: string;

  ata: string | null;
  atd: string | null;

  companyInfoId: number;

  registration: string | null;

  airportFromNameAr: string | null;
  airportFromNameEn: string | null;

  airportToNameAr: string | null;
  airportToNameEn: string | null;

  airLineNameEn: string | null;
}

export interface IFlightSearchRequestModel {
  airlineId?: number | null;
  flightNo?: string | null;
  dateFrom?: string | null; // بصيغة "YYYY-MM-DD"
  dateTo?: string | null; // بصيغة "YYYY-MM-DD"
}

export interface ITowerDataViewDomain {
  id: number;
  airLineId?: number | null;
  airLineNameEn?: string | null;
  flightNoName?: string | null;
  aircraftRegId?: number | null;
  registration?: string | null;
  fidsFlightId?: number | null;
  airportIdFrom?: number | null;
  airportFromNameAr?: string | null;
  airportFromNameEn?: string | null;
  airportIdTo?: number | null;
  airportToNameAr?: string | null;
  airportToNameEn?: string | null;
  landingDate?: string | null; // ISO DateTime string (مثال: "2026-10-14T00:00:00.0000000")
  takeOffDate?: string | null; // ISO DateTime string
  status?: number | null;
  date?: string | null; // DateOnly string (صيغة "YYYY-MM-DD")
  ata?: string | null; // TimeOnly string (صيغة "HH:mm:ss")
  atd?: string | null; // TimeOnly string (صيغة "HH:mm:ss")
  companyInfoId?: number | null;
}
