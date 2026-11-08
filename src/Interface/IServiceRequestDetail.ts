export interface IServiceRequestDetail {
  id: number;
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
}

export interface IAccepterviceDetail {
  id: number;
  By: string | null;
}

export interface IServiceRequestModel {
  id: number | null;
  serviceTypeId: number | null;
  countOfRequests: number | null;
  requestedAt: string | null; // أو يمكن استخدام Date إذا كنت تقوم بتحويله لاحقاً
  requestedBy: string | null;
}
