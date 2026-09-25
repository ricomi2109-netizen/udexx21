import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { wallets, type WalletProvider } from '@/data/wallets';

interface WalletState {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  provider: WalletProvider | null;
}

interface WalletContextValue extends WalletState {
  openModal: () => void;
  closeModal: () => void;
  connect: (wallet: WalletProvider) => void;
  disconnect: () => void;
  modalOpen: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

function generateAddress(): string {
  const chars = '0123456789abcdef';
  let addr = '0x';
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

export function WalletProviderContext({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<WalletProvider | null>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const connect = useCallback((wallet: WalletProvider) => {
    setConnecting(true);
    setProvider(wallet);
    setTimeout(() => {
      const addr = generateAddress();
      setAddress(addr);
      setConnected(true);
      setConnecting(false);
      setTimeout(() => setModalOpen(false), 400);
    }, 1800);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setProvider(null);
    setAddress(null);
    setModalOpen(true);
  }, []);

  return (
    <WalletContext.Provider
      value={{ connected, connecting, address, provider, openModal, closeModal, connect, disconnect, modalOpen }}
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

export { wallets };
