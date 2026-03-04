export interface IApiBaseResponse<T> {
  message: string;
  success: boolean;
  data: T;
}
export interface IAbpResponse<T> {
  result: T;
  success: boolean;
  error: any;
  targetUrl?: string;
  unAuthorizedRequest?: boolean;
}

export type SelectOption = {
  id: string | number | any;
  name: string | any;
};
