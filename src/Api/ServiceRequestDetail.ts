import type { IApiResponse } from '../Interface/IApiResponse';
import type { IAccepterviceDetail } from '../Interface/IServiceRequestDetail';
import type { IServiceRequestDetail } from '../Interface/IServiceRequestDetail';
import type { IServiceRequestModel } from '../Interface/IServiceRequestDetail';
import api from './Axios';

export default async function getServiceDetailByTowerId(
  towerId: number,
): Promise<IServiceRequestDetail[]> {
  const { data } = await api.get<IApiResponse<IServiceRequestDetail[]>>(
    `ServiceRequestDetail/ServiceDetailByTowerId/${towerId}`,
  );
  return data.data;
}

export async function AcceptOfficer(
  id: number,
  by: string,
): Promise<IAccepterviceDetail> {
  // 1. استخدام api.put بدلاً من api.post
  // 2. تصحيح الرابط وإرسال (id و by) داخل الـ Body
  const { data } = await api.put<IApiResponse<IAccepterviceDetail>>(
    'ServiceRequestDetail/AcceptOfficer', // تأكد من اسم الـ Controller لديك
    {
      id: id,
      by: by,
    },
  );
  return data.data;
}

// // Add Service Request List
// export const AddServiceRequestList = async (
//   towerDataId: number,
//   model: IServiceRequestModel[],
// ): Promise<IApiResponse<object>> => {
//   if (!towerDataId) {
//     throw new Error('TowerData ID is required');
//   }

//   const { data } = await api.post(
//     `ServiceRequest/CreateServiceList/${towerDataId}`,
//     model,
//   );

//   return data;
// };

// // Update Service Request List
// export const UpdateServiceRequestList = async (
//   towerDataId: number,
//   model: IServiceRequestModel[],
// ): Promise<IApiResponse<object>> => {
//   if (!towerDataId) {
//     throw new Error('TowerData ID is required');
//   }

//   const { data } = await api.put(
//     `ServiceRequest/UpdateServiceList/${towerDataId}`,
//     model,
//   );

//   return data;
// };

// Add Service Request List
export const AddServiceRequestList = async (
  towerDataId: number,
  model: IServiceRequestModel[],
): Promise<IApiResponse<object>> => {
  if (!towerDataId) {
    throw new Error('TowerData ID is required');
  }

  const { data } = await api.post(
    `ServiceRequestDetail/CreateServiceList/${towerDataId}`,
    model,
  );

  return data;
};

// Update Service Request List
export const UpdateServiceRequestList = async (
  towerDataId: number,
  model: IServiceRequestModel[],
): Promise<IApiResponse<object>> => {
  if (!towerDataId) {
    throw new Error('TowerData ID is required');
  }

  const { data } = await api.put(
    `ServiceRequestDetail/UpdateServiceList/${towerDataId}`,
    model,
  );

  return data;
};
