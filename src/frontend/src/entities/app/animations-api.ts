export interface SimDetails {
  id: string;
  shop_name: string;
  data: {
    [key: string]: {
      users: SimDataUser[];
      active_events: SimDataEvents[];
      sales: SimDataSales[];
    };
  };
}

export interface SimDataUser {
  name: string;
  moves: [number, number][];
}

export interface SimDataEvents {
  name: string;
}

export interface SimDataSales {
  goods_type: string;
  size: number;
}
