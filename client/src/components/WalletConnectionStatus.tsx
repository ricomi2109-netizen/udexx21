import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, CircleDot, ExternalLink, LoaderCircle, RefreshCw, X } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const walletGuides = [
  {
    id: 'MetaMask',
    label: 'MetaMask',
    color: 'text-orange-300',
    steps: ['Open MetaMask and unlock it.', 'Approve the connection request.', 'Approve the network switch if prompted.'],
    link: 'https://metamask.io/download/',
  },
  {
    id: 'Trust Wallet',
    label: 'Trust Wallet',
    color: 'text-sky-300',
    steps: ['Open Trust Wallet on your phone.', 'Use the WalletConnect scanner or approve the app request.', 'Confirm the requested network.'],
    link: 'https://trustwallet.com/download',
  },
  {
    id: 'Coinbase Wallet',
    label: 'Coinbase Wallet',
    color: 'text-blue-300',
    steps: ['Open Coinbase Wallet.', 'Approve the connection request in the app or extension.', 'Confirm the network switch if requested.'],
    link: 'https://www.coinbase.com/wallet/downloads',
  },
  {
    id: 'WalletConnect',
    label: 'WalletConnect / QR',
    color: 'text-purple-300',
    steps: ['Open any WalletConnect-compatible wallet.', 'Scan the live QR code shown by AURORA.', 'Approve the connection and return to this page.'],
    link: 'https://walletconnect.com/explorer',
  },
];

function shortenAddress(address: string | null) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : 'Wallet address unavailable';
}

export function WalletConnectionStatus() {
  const {
    connecting,
    connectionPhase,
    connectionError,
    modalOpen,
    retry,
    closeModal,
    wrongNetwork,
    chainId,
    supportedNetworks,
    switchNetwork,
    switchingNetwork,
    walletName,
    address,
    switchSuccess,
    clearSwitchSuccess,
  } = useWallet();
  const [selectedGuideId, setSelectedGuideId] = useState('MetaMask');

  useEffect(() => {
    const matchingGuide = walletGuides.find((guide) => walletName?.toLowerCase().includes(guide.id.toLowerCase()));
    if (matchingGuide) setSelectedGuideId(matchingGuide.id);
  }, [walletName]);

  const selectedGuide = useMemo(
    () => walletGuides.find((guide) => guide.id === selectedGuideId) ?? walletGuides[0],
    [selectedGuideId],
  );

  const showConnectionProgress = connecting;
  const showError = connectionPhase === 'error';
  const showNetworkPrompt = wrongNetwork;
  const showSwitchSuccess = Boolean(switchSuccess);

  if (showSwitchSuccess && switchSuccess) {
    return (
      <div className="fixed bottom-5 left-1/2 z-[2147483646] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-3xl border border-primary-300/30 bg-[#10191b]/95 p-4 text-white shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-300/15 text-primary-200">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">Network ready</p>
            <h2 className="mt-1 text-base font-semibold">Connected to {switchSuccess.networkName}</h2>
            <p className="mt-1 truncate font-mono text-xs text-neutral-400">{shortenAddress(switchSuccess.address)}</p>
          </div>
          <button type="button" aria-label="Dismiss network success" onClick={clearSwitchSuccess} className="rounded-xl p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!showConnectionProgress && !showError && !showNetworkPrompt) return null;

  if (showNetworkPrompt) {
    return (
      <div className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
        <section role="dialog" aria-modal="true" aria-labelledby="network-switch-title" className="w-full max-w-md overflow-hidden rounded-3xl border border-amber-300/20 bg-[#10191b] p-6 text-white shadow-2xl shadow-black/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300"><AlertTriangle className="h-5 w-5" /></div>
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Network required</p><h2 id="network-switch-title" className="mt-1 text-xl font-semibold">Switch to a supported chain</h2></div>
            </div>
            <button type="button" aria-label="Close network prompt" onClick={closeModal} className="rounded-xl p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
          <p className="mt-5 text-sm leading-6 text-neutral-300">Your wallet is connected to chain <span className="font-mono text-amber-200">{chainId ?? 'unknown'}</span>. Choose a supported network and approve the switch in your wallet.</p>
          <div className="mt-5 grid gap-2">
            {supportedNetworks.map((network) => (
              <button key={network.id} type="button" disabled={switchingNetwork} onClick={() => void switchNetwork(network.id)} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition hover:border-primary-300/40 hover:bg-primary-300/10 disabled:cursor-wait disabled:opacity-60">
                <span className="flex items-center gap-3"><CircleDot className="h-4 w-4 text-primary-300" /><span><span className="block text-sm font-medium text-white">{network.name}</span><span className="block text-xs text-neutral-500">{network.nativeCurrency} · Chain {network.id}</span></span></span>
                {switchingNetwork ? <LoaderCircle className="h-4 w-4 animate-spin text-primary-300" /> : <ChevronRight className="h-4 w-4 text-neutral-500 transition group-hover:translate-x-0.5 group-hover:text-primary-200" />}
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-black/65 p-4 backdrop-blur-md">
        <section role="alertdialog" aria-modal="true" aria-labelledby="wallet-error-title" className="w-full max-w-md rounded-3xl border border-red-300/20 bg-[#10191b] p-6 text-white shadow-2xl shadow-black/50">
          <div className="flex items-start gap-3"><div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-400/15 text-red-300"><AlertTriangle className="h-5 w-5" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">Connection interrupted</p><h2 id="wallet-error-title" className="mt-1 text-xl font-semibold">Your wallet did not connect</h2></div></div>
          <p className="mt-4 text-sm leading-6 text-neutral-300">{connectionError ?? 'The request was cancelled or the wallet did not respond.'}</p>
          <WalletGuide selectedGuide={selectedGuide} selectedGuideId={selectedGuideId} onSelect={setSelectedGuideId} />
          <div className="mt-6 flex flex-col gap-2 sm:flex-row"><button type="button" onClick={retry} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-primary-200 active:scale-[0.98]"><RefreshCw className="h-4 w-4" />Retry connection</button><button type="button" onClick={closeModal} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/10">Choose later</button></div>
        </section>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-[2147483646] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-primary-300/20 bg-[#10191b]/95 px-4 py-3 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center gap-3"><LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-primary-300" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">Waiting for wallet approval</p><p className="mt-0.5 truncate text-xs text-neutral-400">{walletName ? `Approve the request in ${walletName}.` : 'Approve the request in your wallet app or extension.'}</p></div><CheckCircle2 className="h-4 w-4 shrink-0 text-primary-300/70" /></div>
      <WalletGuide selectedGuide={selectedGuide} selectedGuideId={selectedGuideId} onSelect={setSelectedGuideId} compact />
    </div>
  );
}

function WalletGuide({ selectedGuide, selectedGuideId, onSelect, compact = false }: { selectedGuide: typeof walletGuides[number]; selectedGuideId: string; onSelect: (id: string) => void; compact?: boolean }) {
  return (
    <details className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2" open={!compact}>
      <summary className="cursor-pointer list-none text-xs font-semibold text-neutral-300">Connection help {selectedGuide.label ? `· ${selectedGuide.label}` : ''}</summary>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {walletGuides.map((guide) => <button key={guide.id} type="button" onClick={() => onSelect(guide.id)} className={`rounded-lg px-2.5 py-1.5 text-xs transition ${selectedGuideId === guide.id ? 'bg-white/15 text-white' : 'text-neutral-500 hover:bg-white/10 hover:text-neutral-200'}`}>{guide.label}</button>)}
      </div>
      <ol className="mt-3 space-y-1.5 text-xs leading-5 text-neutral-400">{selectedGuide.steps.map((step) => <li key={step} className="flex gap-2"><span className={`font-semibold ${selectedGuide.color}`}>•</span><span>{step}</span></li>)}</ol>
      <a href={selectedGuide.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-200 hover:text-primary-100">Get or open {selectedGuide.label}<ExternalLink className="h-3 w-3" /></a>
    </details>
  );
}
