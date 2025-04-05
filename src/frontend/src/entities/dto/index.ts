export type WrongResponse = {
  code: number;
  details: string;
};

export type PaginatedResponse<T> = {
  data: T;
  count: number;
  next: string;
  previous: string;
};
