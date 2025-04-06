import { AppStore, store } from '@/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  storeRef.current = store;

  return <Provider store={storeRef.current}>{children}</Provider>;
};
