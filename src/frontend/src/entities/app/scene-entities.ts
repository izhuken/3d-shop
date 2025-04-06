export interface BaseSceneEntity {
  x: number;
  y: number;
  z: number;
  // nominate x/y/z
  nx: number;
  ny: number;
  nz: number;

  color: 'red' | 'blue' | 'green';
}

export interface SceneCashbox extends BaseSceneEntity {
  name: string;
  color: 'red';
}

export interface SceneStartPoint extends BaseSceneEntity {
  name: string;
  color: 'green';
}

export interface SceneShelf extends BaseSceneEntity {
  name: string;
  color: 'blue';
}
