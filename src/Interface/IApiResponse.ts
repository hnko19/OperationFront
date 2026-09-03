export interface IApiResponse<T> {
  status: string;
  message: string;
  data: T;
}
