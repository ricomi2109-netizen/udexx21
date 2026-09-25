import { mainnet, arbitrum, base, polygon, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

if (!projectId) {
  throw new Error('VITE_REOWN_PROJECT_ID is required to enable wallet connections.');
}

export const networks = [mainnet, arbitrum, base, polygon] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

export const appKitConfig = {
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'AURORA',
    description: 'AURORA multi-chain rewards cockpit',
    url: window.location.origin,
    icons: [`${window.location.origin}/aurora-mark.svg`],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  } as const,
};
