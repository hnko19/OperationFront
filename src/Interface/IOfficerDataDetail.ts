export interface IServiceRequestDetail {
  id: number;
  serviceRequestId: number | null;
  serviceTypeId: number | null;
  serviceTypeName: string | null;
  countOfRequests: number | null;
  towerDataId: number | null;
  airlineId: number | null;
  airlineName: string | null;
  requestedAt: string | null;
  requestedBy: string | null;
  acceptedAt: string | null;
  acceptedBy: string | null;
  confirmAgentAt: string | null;
  confirmAgentBy: string | null;
  requestStatus: number | null;
}

export interface ITowerDataDetail {
  id: number;
  airLineId?: number | null;
  airLineName: string | null;
  aircraftRegId?: number | null;
  aircraftRegName: string | null;
  airportIdFrom?: number | null;
  airportIdFromName: string | null;
  airportIdTo?: number | null;
  airportIdToName: string | null;
  landingDate: string | null;
  takeOffDate: string | null;
  status: number | null;
  date: string | null;
  ata: string | null;
  atd: string | null;
  tripTypeId: number | null;
  companyInfoId: number | null;
  fidsFlightId: number | null;
  flightNoName: string | null;
  isOfficerConfirmed: boolean | null;
  createdBy: string | null;
  creationDate: string | null;
  updatedBy: string | null;
  updatingDate: string | null;
  isAnyRequestNotAccepted: boolean;
  isAnyRequestNotConfirm: boolean;
  requestStatus: number;
  serviceRequestDetails: IServiceRequestDetail[];
}

export interface IOfficerDataDetail {
  id: number;
  towerDataId: number;
  handlingAgentId?: number | null;
  handlingAgentName: string | null;
  fuelCompanyId?: number | null;
  fuelCompanyName: string | null;
  trnycupps: number | null;
  emb: number | null;
  embInft: number | null;
  disemb: number | null;
  disEmbInft: number | null;
  pax: number | null;
  firstClassCount: number | null;
  date: string | null;
  freightLoadingExp: number | null;
  freightLoadingImp: number | null;
  normalMailLoadingExp: number | null;
  rapidMailLoadingExp: number | null;
  normalMailLoadingImp: number | null;
  rapidMailLoadingImp: number | null;
  ambulanceCarCount: number | null;
  fireFightingCarCount: number | null;
  isCurrentAccount: boolean;
  fuelLiter: number | null;
  aireLineAgentId: number | null;
  companyInfoId: number | null;
  hasPushPack: boolean | null;
  isNotUsedCupps: boolean | null;
  createdBy: string | null;
  creationDate: string | null;
  updatedBy: string | null;
  updatingDate: string | null;
  paxInter: number | null;
  isClaimCalculated: boolean | null;
  towerData: ITowerDataDetail | null;
}
