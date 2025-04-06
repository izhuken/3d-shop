import { EventCollectorEntity, KeyFrame } from '@/entities/app/animations';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { RootState } from '../types';

interface AnimConfigState {
  state: {
    // from - to (user move start - user move end)
    keyframes: KeyFrame[];
    eventCollector: EventCollectorEntity[];
    control: {
      isPlay: boolean;
      currentStamp: string;
      keyframeIndex: number;
      isEndStamp: boolean;
      onRenderStop: boolean;
    };
  };
}

const initialStatement: AnimConfigState = {
  state: {
    keyframes: [],
    eventCollector: [],
    control: {
      currentStamp: '-',
      keyframeIndex: -1,
      isEndStamp: true,
      isPlay: false,
      onRenderStop: false,
    },
  },
};

export const animConfigSlice = createSlice({
  name: 'animConfig',
  initialState: initialStatement,
  reducers: {
    init: (
      state,
      payload: PayloadAction<{
        kf: KeyFrame[];
        collector: EventCollectorEntity[];
      }>
    ) => {
      state.state.keyframes = payload.payload.kf;
      state.state.eventCollector = payload.payload.collector;

      if (payload.payload.kf.length > 0) {
        state.state.control.currentStamp = payload.payload.kf[0].stamp;
        state.state.control.keyframeIndex = 0;
      }
    },
    next: (state) => {
      if (
        state.state.control.keyframeIndex - 1 ===
        state.state.keyframes.length
      ) {
        state.state.control.isPlay = false;
        state.state.control.onRenderStop = false;

        toast.success('Симуляция окончена');
        return;
      }
      state.state.control.currentStamp =
        state.state.keyframes[state.state.control.keyframeIndex].stamp;
      state.state.control.keyframeIndex += 1;
      state.state.control.onRenderStop = false;
    },
    play: (state) => {
      if (
        state.state.control.keyframeIndex - 1 ===
        state.state.keyframes.length
      ) {
        return;
      }

      state.state.control.isPlay = true;
      state.state.control.onRenderStop = false;
    },
    stop: (state) => {
      state.state.control.isPlay = false;
      state.state.control.onRenderStop = false;
    },
    continueRender: (state) => {
      state.state.control.onRenderStop = true;
    },
  },
});

export const animConfigActions = animConfigSlice.actions;
export const animConfigReducer = animConfigSlice.reducer;
export const currentAnimConfig = (state: RootState) => state.animConfig;
