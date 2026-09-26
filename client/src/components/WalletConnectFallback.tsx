import { useAppKit, useAppKitState } from '@reown/appkit/react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

function findWalletConnectQr(root: ParentNode | ShadowRoot): HTMLElement | null {
  for (const element of Array.from(root.querySelectorAll<HTMLElement>('*'))) {
    if (element.tagName.toLowerCase() === 'wui-qr-code' && element.getAttribute('uri')) {
      return element;
    }

    if (element.shadowRoot) {
      const nested = findWalletConnectQr(element.shadowRoot);
      if (nested) return nested;
    }
  }

  return null;
}

export function WalletConnectFallback() {
  const { close } = useAppKit();
  const { open } = useAppKitState();
  const [uri, setUri] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setUri('');
      setQrDataUrl('');
      setCopied(false);
      return;
    }

    let cancelled = false;
    let timer: number | undefined;

    const readUri = () => {
      const qr = findWalletConnectQr(document);
      const nextUri = qr?.getAttribute('uri') || '';

      if (nextUri && nextUri !== uri) {
        setUri(nextUri);
        void QRCode.toDataURL(nextUri, {
          errorCorrectionLevel: 'M',
          margin: 2,
          width: 280,
          color: { dark: '#071316', light: '#ffffff' },
        }).then((dataUrl) => {
          if (!cancelled) setQrDataUrl(dataUrl);
        });
      }

      timer = window.setTimeout(readUri, 250);
    };

    readUri();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [open, uri]);

  if (!open || !uri || !qrDataUrl) return null;

  const copyUri = async () => {
    await navigator.clipboard.writeText(uri);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#101b1e] p-5 text-white shadow-2xl shadow-black/50">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-300">WalletConnect</p>
            <h2 className="mt-1 text-xl font-semibold">Scan to connect</h2>
            <p className="mt-1 text-sm text-neutral-400">Open your wallet app and scan this live connection code.</p>
          </div>
          <button onClick={() => close()} className="rounded-lg px-2 py-1 text-xl text-neutral-400 hover:bg-white/10 hover:text-white" aria-label="Close QR code">
            ×
          </button>
        </div>

        <div className="flex justify-center rounded-2xl bg-white p-4">
          <img src={qrDataUrl} width={280} height={280} alt="WalletConnect QR code" className="block h-auto w-full max-w-[280px]" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-neutral-400">Code refreshes with each new session</span>
          <button onClick={copyUri} className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10">
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
}
