export interface ApiResponse<T> {
  payload?: T;
  meta?: {
    limit: number;
    offset: number;
    count: number;
  };
}
