import { mainnet, arbitrum, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Reown project IDs are public frontend identifiers. Keep a publish-safe fallback so
// the app does not crash if a deployment omits Vite environment injection.
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '025f198899a9171b367bcf763366d4b4';

export const networks = [mainnet, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]];

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
    name: 'My Airdrop Token dApp',
    description: 'Claim your airdrop tokens here',
    url: window.location.origin,
    icons: [`${window.location.origin}/aurora-mark.svg`],
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
  } as const,
};
