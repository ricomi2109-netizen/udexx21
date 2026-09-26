import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useAppKit, useAppKitAccount, useAppKitState, useWalletInfo } from '@reown/appkit/react';
import { useDisconnect } from 'wagmi';
import { toast } from 'sonner';
import type { WalletProvider } from '@/data/wallets';

interface WalletState {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  provider: WalletProvider | null;
}

interface WalletContextValue extends WalletState {
  openModal: () => void;
  closeModal: () => void;
  connect: () => void;
  disconnect: () => void;
  modalOpen: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProviderContext({ children }: { children: ReactNode }) {
  const { open, close } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount({ namespace: 'eip155' });
  const { walletInfo } = useWalletInfo('eip155');
  const { open: modalOpen } = useAppKitState();
  const { disconnectAsync } = useDisconnect();
  const [attempting, setAttempting] = useState(false);

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

  const connect = useCallback(async () => {
    setAttempting(true);

    try {
      // One canonical path keeps installed extensions, wallet-specific mobile
      // deep links, QR pairing, and install links in the same AppKit session.
      await open({ view: 'Connect', namespace: 'eip155' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown wallet connection error';
      toast.error(`Unable to open a wallet connection: ${message}`);
    } finally {
      setAttempting(false);
    }
  }, [open]);

  const disconnect = useCallback(() => {
    void disconnectAsync();
  }, [disconnectAsync]);

  return (
    <WalletContext.Provider
      value={{
        connected: isConnected,
        connecting: attempting || status === 'connecting',
        address: address ?? null,
        provider,
        openModal: connect,
        closeModal: close,
        connect,
        disconnect,
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
