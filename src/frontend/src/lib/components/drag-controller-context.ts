import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface IDragControllerContext {
  isDrag: boolean;
  setIsDrag: Dispatch<SetStateAction<boolean>>;
}

export const DragControllerContext =
  createContext<IDragControllerContext | null>(null);

export const useDragController = () => {
  const context = useContext(DragControllerContext);

  if (context === null) {
    throw new Error('Missing context');
  }

  return context;
};
