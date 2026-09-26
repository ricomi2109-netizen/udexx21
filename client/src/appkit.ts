import { arbitrum, base, mainnet, optimism, polygon, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createStorage } from 'wagmi';

// Reown project IDs are public frontend identifiers. Keep a publish-safe fallback so
// the app does not crash if a deployment omits Vite environment injection.
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || 'f7d685e50e0923ce7a1e73e35bddcfa9';

export const networks = [mainnet, arbitrum, base, polygon, optimism] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  storage: createStorage({ storage: window.localStorage }),
  ssr: false,
});

export const appKitConfig = {
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'AURORA',
    description: 'Claim your airdrop tokens here',
    // Use the actual page origin so wallet apps return to the page that started
    // the session, including when the deployment host changes.
    url: window.location.origin,
    icons: [`${window.location.origin}/aurora-mark.svg`],
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
  } as const,
};
