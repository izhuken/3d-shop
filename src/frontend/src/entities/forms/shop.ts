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
  events: NewSalesShopValue[];
  sales: NewSalesShopValue[];
  cashboxes: Cashbox[];
  shelves: Shelf[];
  startPoints?: StartPoint;
}
