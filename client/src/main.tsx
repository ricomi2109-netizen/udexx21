import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppKitProvider } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import App from './App.tsx';
import { appKitConfig, wagmiAdapter } from './appkit';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider {...appKitConfig}>
          <App />
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
