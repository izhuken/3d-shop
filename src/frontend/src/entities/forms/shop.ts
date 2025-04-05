import { NewEventFormData } from './event';
import { Cashbox, Shelf, StartPoint } from './scene';

export interface NewSalesShopValue {
  goods_type: string;
  size: number;
}

export interface NewShopForm {
  name: string;
  user_per_day: number;
  open_at: string;
  close_at: string;
  events: NewEventFormData[];
  sales: NewSalesShopValue[];
  cashboxes: Cashbox[];
  shelves: Shelf[];
  startPoints?: StartPoint;
}

export type _events = {
  [key: string]: any;
};

export interface ShopCreate {
  name: string;
  is_generated: false;
  open_at: string;
  close_at: string;
  data?: {
    users_per_day?: number;
    scene?: unknown[][];
    events?: _events;
    sales?: {
      goods_type: string;
      days: number;
      size: number;
    }[];
  };
}
