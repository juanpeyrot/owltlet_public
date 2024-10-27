export type APIResponse<T> = {
  data: T;
  message: string;
};

export type APIResponseNoData = {
  message: string;
};

export type APIError = {
  error: string;
}