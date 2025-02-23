import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HeroUIProvider} from "@heroui/react";
import { AuthProvider } from './provider/authProvider';
import '@/styles/index.css'
import Routes from '@/routes/Routes';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </HeroUIProvider>
    {/* <App /> */}
  </StrictMode>
)
