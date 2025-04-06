export type Period = {
  start: string;
  end: string;
  index: number;
  offset: number;
};

export interface KeyFrame {
  stamp: string;
  users: UserMove[];
}

export type EventCollectorEntity = ActiveEvent | ActiveSales;

export interface EventCollector {
  stamp: string;
  events: EventCollectorEntity[];
}

export interface ActiveEvent {
  name: string;
  start: string;
  end?: string;
}

export interface ActiveSales {
  name: string;
  start: string;
  end?: string;
}

export interface UserMove {
  x: number;
  y: number;
  stamp: string;
}
