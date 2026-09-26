import { AlertTriangle, CheckCircle2, ChevronRight, CircleDot, LoaderCircle, RefreshCw, X } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

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
  } = useWallet();

  const showConnectionProgress = connecting && !modalOpen;
  const showError = connectionPhase === 'error';
  const showNetworkPrompt = wrongNetwork;

  if (!showConnectionProgress && !showError && !showNetworkPrompt) return null;

  if (showNetworkPrompt) {
    return (
      <div className="fixed inset-0 z-[2147483646] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="network-switch-title"
          className="w-full max-w-md overflow-hidden rounded-3xl border border-amber-300/20 bg-[#10191b] p-6 text-white shadow-2xl shadow-black/50"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Network required</p>
                <h2 id="network-switch-title" className="mt-1 text-xl font-semibold">Switch to a supported chain</h2>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close network prompt"
              onClick={closeModal}
              className="rounded-xl p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-5 text-sm leading-6 text-neutral-300">
            Your wallet is connected to chain <span className="font-mono text-amber-200">{chainId ?? 'unknown'}</span>. Choose a supported network and approve the switch in your wallet.
          </p>

          <div className="mt-5 grid gap-2">
            {supportedNetworks.map((network) => (
              <button
                key={network.id}
                type="button"
                disabled={switchingNetwork}
                onClick={() => void switchNetwork(network.id)}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition hover:border-primary-300/40 hover:bg-primary-300/10 disabled:cursor-wait disabled:opacity-60"
              >
                <span className="flex items-center gap-3">
                  <CircleDot className="h-4 w-4 text-primary-300" />
                  <span>
                    <span className="block text-sm font-medium text-white">{network.name}</span>
                    <span className="block text-xs text-neutral-500">{network.nativeCurrency} · Chain {network.id}</span>
                  </span>
                </span>
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
        <section
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="wallet-error-title"
          className="w-full max-w-md rounded-3xl border border-red-300/20 bg-[#10191b] p-6 text-white shadow-2xl shadow-black/50"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-400/15 text-red-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">Connection interrupted</p>
              <h2 id="wallet-error-title" className="mt-1 text-xl font-semibold">Your wallet did not connect</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-neutral-300">{connectionError ?? 'The request was cancelled or the wallet did not respond.'}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={retry}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary-300 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-primary-200 active:scale-[0.98]"
            >
              <RefreshCw className="h-4 w-4" />
              Retry connection
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-neutral-200 transition hover:bg-white/10"
            >
              Choose later
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-[2147483646] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-primary-300/20 bg-[#10191b]/95 px-4 py-3 text-white shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <LoaderCircle className="h-5 w-5 shrink-0 animate-spin text-primary-300" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Waiting for wallet approval</p>
          <p className="mt-0.5 truncate text-xs text-neutral-400">Approve the request in your wallet app or extension.</p>
        </div>
        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-300/70" />
      </div>
    </div>
  );
}
