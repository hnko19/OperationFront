// import type { ReactNode } from 'react';
export interface IAircraftRegistration {
  id: number;
  registration: string;
  aircraftTypeId: number;
  maxTakoffWieght: number;
  aircraftType?: {
    id?: number;
    type: string;
    sizeId?: number | null;
  };
}

// export interface IAircraftRegistrationshow {
//   id: number;
//   registration: string;
//   maxTakoffWieght: number;
//   aircraftType: string; // نص مباشر وليس كائناً
//   action: ReactNode;
// }
