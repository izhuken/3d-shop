import { Goods } from '../app';

export interface SceneEntity {
  x: number;
  y: number;
  z: number;
  color: string;
  type: 'cashbox' | 'shelf' | 'start_point';
}

export interface Cashbox extends SceneEntity {
  type: 'cashbox';
  color: 'red';
}

export interface Shelf extends SceneEntity {
  type: 'shelf';
  goods: Goods[];
  color: 'blue';
}

export interface StartPoint extends SceneEntity {
  type: 'start_point';
  color: 'green';
}
