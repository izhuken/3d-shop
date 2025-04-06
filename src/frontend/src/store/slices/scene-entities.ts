import { SceneCashbox, SceneShelf, SceneStartPoint } from '@/entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

interface SceneEntitiesState {
  state: {
    cashboxes: SceneCashbox[];
    shelves: SceneShelf[];
    startPoint: SceneStartPoint | null;
  };
}

const initialStatement: SceneEntitiesState = {
  state: {
    cashboxes: [],
    shelves: [],
    startPoint: null,
  },
};

export const sceneEntitiesSlice = createSlice({
  name: 'sceneEntities',
  initialState: initialStatement,
  reducers: {
    setCashboxes: (state, action: PayloadAction<SceneCashbox[]>) => {
      state.state.cashboxes = action.payload;
    },
    setShelves: (state, action: PayloadAction<SceneShelf[]>) => {
      state.state.shelves = action.payload;
    },
    setStartPoint: (state, action: PayloadAction<SceneStartPoint>) => {
      state.state.startPoint = action.payload;
    },
  },
});

export const sceneEntitiesActions = sceneEntitiesSlice.actions;
export const sceneEntitiesReducer = sceneEntitiesSlice.reducer;
export const currentSceneEntities = (state: RootState) => state.sceneEntities;
