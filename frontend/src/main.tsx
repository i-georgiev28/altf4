import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from "@heroui/react";
import { AuthProvider } from './provider/authProvider';
import '@/styles/index.css'
import Routes from '@/routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
    </HeroUIProvider>
    {/* <App /> */}
  </StrictMode>
)
