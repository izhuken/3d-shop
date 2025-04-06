import { configureStore } from '@reduxjs/toolkit';
import { animConfigReducer } from './slices/animation-entities';
import { sceneEntitiesReducer } from './slices/scene-entities';

export const store = configureStore({
  reducer: {
    sceneEntities: sceneEntitiesReducer,
    animConfig: animConfigReducer,
  },
});
