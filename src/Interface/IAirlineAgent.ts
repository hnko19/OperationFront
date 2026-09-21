import type { IAirline } from "./IAirline";

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

export interface IAirlineAgentCreate {
  id?: number;
  nameAr: string;
  nameAn: string;
  phone1: string;
  phone2?: string | null;
  email: string;
  address: string;
  airLineId: number;
  userId: string;
  isActive: boolean;
}