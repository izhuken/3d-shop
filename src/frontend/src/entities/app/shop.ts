export interface ShopList {
  id: string;
  name: string;
  open_at: string;
  close_at: string;
  is_generated: boolean;
}

export interface Shop {
  id: string;
  name: string;
  is_generated: boolean;
  open_at: string;
  close_at: string;
  data: {
    users_per_day: number;
    scene: ShopScene[][];
    events: ShopEvents;
    sales: ShopSale[];
  };
}

export type ShopScene = ShopStartPoint | ShopShelf | ShopCashbox | null;

export type ShopStartPoint = 'start_point';

export interface ShopGoods {
  [key: string]: {
    cost: number;
    goods_type: string;
  };
}

export interface ShopShelf {
  [key: string]: {
    goodses: Shop;
    type_shelf: number;
    capatity: string;
  };
}

export interface ShopCashbox {
  [key: string]: number;
}

export interface ShopEvents {
  [key: string]: {
    rate: number;
    type: 'ban_shelf';
    self_type: string;
  };
}

export interface ShopSale {
  goods_type: string;
  days: number;
  size: number;
}

export const isStartPoint = (item: ShopScene): item is ShopStartPoint => {
  return typeof item === 'string';
};

export const isShopShelf = (item: ShopScene): item is ShopShelf => {
  if (typeof item !== 'object' || item === null || Array.isArray(item))
    return false;

  if (Object.keys(item).length === 0) {
    return false;
  }

  return Array.from(Object.keys(item))[0].startsWith('shelf');
};

export const isShopCashbox = (item: ShopScene): item is ShopCashbox => {
  if (typeof item !== 'object' || item === null || Array.isArray(item))
    return false;

  if (Object.keys(item).length === 0) {
    return false;
  }

  return Array.from(Object.keys(item))[0].startsWith('cashbox');
};
