import { RootStoreContext } from '@/lib';
import { RootStore } from '@/store';
import '@/styles/base.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './providers';
import { AppRouter } from './router';

interface ApplicationProps {}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Application: React.FC<ApplicationProps> = () => {
  return (
    <StrictMode>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <RootStoreContext.Provider value={RootStore}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </RootStoreContext.Provider>
        </QueryClientProvider>
      </ToastProvider>
    </StrictMode>
  );
};
