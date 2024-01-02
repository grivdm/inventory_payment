export interface IAPIResponse<T> {
  data: T | null;
  error?: Error | null;
}

export interface IAPIRequest {
  url: string;
  method?: "GET" | "POST" | "DELETE";
  body?: any;
  headers?: HeadersInit;
}
