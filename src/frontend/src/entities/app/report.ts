export interface ReportRequest {
  id: string;
  shop_name: string;
  data: string;
}

export interface ReportPayload {
  [key: string]: number;
}
