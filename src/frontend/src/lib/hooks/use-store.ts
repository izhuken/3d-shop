import { RootStore } from '@/store';
import { createContext, useContext } from 'react';

export const RootStoreContext = createContext<typeof RootStore | null>(null);

export const useStoreHook = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error('No provider');
  }

  return context;
};
