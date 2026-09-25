import { useState, useEffect, useMemo, useRef } from 'react';
import { X, Shield, Loader2, Check, ChevronRight, Search, Link2, Smartphone, Monitor, HardDrive, Globe, Layers, Building2, Archive } from 'lucide-react';
import { useWallet, wallets } from '@/context/WalletContext';
import { totalWalletCount } from '@/data/wallets';
import type { WalletProvider } from '@/data/wallets';

const categoryIcons: Record<WalletProvider['category'], typeof Link2> = {
  hardware: HardDrive,
  mobile: Smartphone,
  desktop: Monitor,
  extension: Link2,
  multichain: Globe,
  exchange: Building2,
  custodial: Archive,
};

const categoryLabels: Record<WalletProvider['category'], string> = {
  hardware: 'Hardware',
  mobile: 'Mobile',
  desktop: 'Desktop',
  extension: 'Extension',
  multichain: 'Multi-Chain',
  exchange: 'Exchange',
  custodial: 'Custodial',
};

const categories: (WalletProvider['category'] | 'all' | 'popular')[] = ['all', 'popular', 'extension', 'mobile', 'hardware', 'desktop', 'multichain', 'exchange', 'custodial'];

const BATCH_SIZE = 30;

export function WalletModal() {
  const { modalOpen, closeModal, connect, connecting, connected, provider } = useWallet();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<WalletProvider['category'] | 'all' | 'popular'>('all');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  // Reset visible count when search or category changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [search, activeCategory]);

  const filtered = useMemo(() => {
    return wallets.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(search.toLowerCase()) ||
        w.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'popular' && w.popular) ||
        w.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const visibleWallets = filtered.slice(0, visibleCount);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
    }
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md"
        onClick={connecting ? undefined : closeModal}
      />

      <div className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl animate-scale-in overflow-hidden flex flex-col max-h-[90vh]">
        {/* Aurora glow header */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 z-10" />

        {connecting ? (
          <div className="px-8 py-16 text-center">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${provider?.gradient} opacity-30 animate-glow-pulse`} />
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${provider?.gradient} flex items-center justify-center text-4xl`}>
                {provider?.icon}
              </div>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Connecting to {provider?.name}</h3>
            <p className="text-neutral-400 text-sm mb-6">Confirm the connection in your wallet app</p>
            <div className="flex items-center justify-center gap-2 text-primary-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Awaiting confirmation...</span>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-500">
              <Shield className="w-4 h-4" />
              <span>Secured by AURORA Protocol</span>
            </div>
          </div>
        ) : connected ? (
          <div className="px-8 py-16 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-success-500/20 flex items-center justify-center mb-6 animate-scale-in">
              <Check className="w-10 h-10 text-success-400" strokeWidth={3} />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Wallet Connected!</h3>
            <p className="text-neutral-400 text-sm">Welcome to AURORA. You can now participate in airdrops.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 flex-shrink-0">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Connect a Wallet</h2>
                <p className="text-sm text-neutral-400 mt-0.5">
                  {totalWalletCount} wallets available · Search to find yours
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-neutral-400 hover:text-white flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search bar */}
            <div className="px-5 pt-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 383 wallets..."
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-900/60 border border-white/5 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-primary-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="px-5 py-3 flex-shrink-0">
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize ${
                      activeCategory === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat === 'popular' ? 'Popular' : categoryLabels[cat as WalletProvider['category']]}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet list — scrollable with infinite scroll */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-5 pb-4 min-h-0"
            >
              {visibleWallets.length === 0 ? (
                <div className="py-12 text-center">
                  <Search className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500">No wallets found for "{search}"</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {visibleWallets.map((wallet) => {
                    const CatIcon = categoryIcons[wallet.category];
                    return (
                      <button
                        key={wallet.id}
                        onClick={() => {
                          setSelected(wallet.id);
                          connect(wallet);
                        }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all group text-left ${
                          selected === wallet.id
                            ? 'border-primary-500/50 bg-primary-500/5'
                            : 'border-white/5 bg-neutral-900/40 hover:border-white/10 hover:bg-neutral-900/60'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${wallet.gradient} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}>
                          {wallet.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm truncate">{wallet.name}</span>
                            {wallet.popular && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-accent-500/20 text-accent-400 uppercase tracking-wide flex-shrink-0">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <CatIcon className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                            <p className="text-xs text-neutral-400 truncate">{wallet.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0" />
                      </button>
                    );
                  })}

                  {visibleCount < filtered.length && (
                    <div className="py-3 text-center">
                      <div className="inline-flex items-center gap-2 text-xs text-neutral-500">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Loading more wallets... ({filtered.length - visibleCount} remaining)</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Shield className="w-4 h-4 text-primary-500" />
                <span>Non-custodial & encrypted</span>
              </div>
              <span className="text-xs text-neutral-500">
                Showing {visibleWallets.length} of {filtered.length}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
