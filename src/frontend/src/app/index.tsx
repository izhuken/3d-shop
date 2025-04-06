import '@/styles/base.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './providers';
import { StoreProvider } from './providers/store-provider';
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
      <StoreProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </QueryClientProvider>
        </ToastProvider>
      </StoreProvider>
    </StrictMode>
  );
};
