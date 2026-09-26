import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useAppKit, useAppKitAccount, useAppKitState, useWalletInfo } from '@reown/appkit/react';
import { useChainId, useDisconnect, useSwitchChain } from 'wagmi';
import { toast } from 'sonner';
import { networks } from '@/appkit';
import type { WalletProvider } from '@/data/wallets';

type ConnectionPhase = 'idle' | 'connecting' | 'connected' | 'wrong-network' | 'error';

interface SupportedNetwork {
  id: number;
  name: string;
  nativeCurrency: string;
}

interface WalletState {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  provider: WalletProvider | null;
  connectionPhase: ConnectionPhase;
  connectionError: string | null;
  chainId: number | undefined;
  wrongNetwork: boolean;
  switchingNetwork: boolean;
  supportedNetworks: SupportedNetwork[];
}

interface WalletContextValue extends WalletState {
  openModal: () => void;
  closeModal: () => void;
  connect: () => void;
  retry: () => void;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
  modalOpen: boolean;
}

const CONNECTION_TIMEOUT_MS = 25_000;
const supportedNetworks: SupportedNetwork[] = networks.map((network) => ({
  id: Number(network.id),
  name: network.name,
  nativeCurrency: network.nativeCurrency.name,
}));
const supportedNetworkIds = new Set(supportedNetworks.map((network) => network.id));

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProviderContext({ children }: { children: ReactNode }) {
  const { open, close } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount({ namespace: 'eip155' });
  const { walletInfo } = useWalletInfo('eip155');
  const { open: modalOpen } = useAppKitState();
  const { disconnectAsync } = useDisconnect();
  const { switchChainAsync, isPending: switchingNetwork } = useSwitchChain();
  const chainId = useChainId();
  const [connectionPhase, setConnectionPhase] = useState<ConnectionPhase>('idle');
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const wrongNetwork = Boolean(isConnected && chainId !== undefined && !supportedNetworkIds.has(chainId));

  const provider = useMemo<WalletProvider | null>(() => {
    if (!isConnected) return null;
    return {
      id: walletInfo?.name?.toLowerCase().replace(/\s+/g, '-') || 'walletconnect',
      name: walletInfo?.name || 'Connected wallet',
      description: 'Connected through Reown AppKit',
      icon: '🔗',
      gradient: 'from-primary-400 to-secondary-500',
      category: 'multichain',
      mobile: true,
    };
  }, [isConnected, walletInfo?.name]);

  useEffect(() => {
    if (!isConnected) return;
    setConnectionPhase(wrongNetwork ? 'wrong-network' : 'connected');
    setConnectionError(null);
  }, [isConnected, wrongNetwork]);

  useEffect(() => {
    if (connectionPhase !== 'connecting') return;
    const timeoutId = window.setTimeout(() => {
      if (!isConnected) {
        setConnectionPhase('error');
        setConnectionError('The wallet did not respond before the connection timed out.');
        toast.error('Wallet connection timed out. You can retry or choose another wallet.');
      }
    }, CONNECTION_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [connectionPhase, isConnected]);

  const connect = useCallback(async () => {
    setConnectionError(null);
    setConnectionPhase('connecting');

    try {
      // One canonical path keeps installed extensions, wallet-specific mobile
      // deep links, QR pairing, and install links in the same AppKit session.
      await open({ view: 'Connect', namespace: 'eip155' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown wallet connection error';
      setConnectionPhase('error');
      setConnectionError(message);
      toast.error(`Unable to open a wallet connection: ${message}`);
    }
  }, [open]);

  const retry = useCallback(() => {
    void connect();
  }, [connect]);

  const closeModal = useCallback(() => {
    close();
    if (!isConnected) {
      setConnectionPhase('idle');
      setConnectionError(null);
    }
  }, [close, isConnected]);

  const disconnect = useCallback(() => {
    void disconnectAsync();
    setConnectionPhase('idle');
    setConnectionError(null);
  }, [disconnectAsync]);

  const switchNetwork = useCallback(
    async (targetChainId: number) => {
      setConnectionError(null);
      try {
        await switchChainAsync({ chainId: targetChainId });
        const target = supportedNetworks.find((network) => network.id === targetChainId);
        toast.success(`Switched to ${target?.name ?? 'supported network'}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Network switch was rejected';
        setConnectionError(message);
        toast.error(`Could not switch network: ${message}`);
      }
    },
    [switchChainAsync],
  );

  const connecting = connectionPhase === 'connecting' || status === 'connecting';

  return (
    <WalletContext.Provider
      value={{
        connected: isConnected,
        connecting,
        address: address ?? null,
        provider,
        connectionPhase,
        connectionError,
        chainId,
        wrongNetwork,
        switchingNetwork,
        supportedNetworks,
        openModal: () => void connect(),
        closeModal,
        connect: () => void connect(),
        retry,
        disconnect,
        switchNetwork,
        modalOpen,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProviderContext');
  return ctx;
}
