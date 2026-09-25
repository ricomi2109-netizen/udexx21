import { Zap, Wallet, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';

export function Header() {
  const { connected, address, provider, openModal, disconnect } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div className="glass-card border-x-0 border-t-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">AURORA</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo('tasks')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Tasks</button>
              <button onClick={() => scrollTo('leaderboard')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Leaderboard</button>
              <button onClick={() => scrollTo('blockchains')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Chains</button>
              <button onClick={() => scrollTo('how-it-works')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollTo('stats')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Stats</button>
              <button onClick={() => scrollTo('faq')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">FAQ</button>
            </nav>

            {/* Wallet button */}
            <div className="flex items-center gap-3">
              {connected ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900/60 border border-white/5">
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${provider?.gradient} flex items-center justify-center text-sm`}>
                      {provider?.icon}
                    </div>
                    <span className="text-sm font-medium text-white font-mono">{shortAddr}</span>
                  </div>
                  <button
                    onClick={disconnect}
                    className="w-10 h-10 rounded-xl bg-neutral-900/60 border border-white/5 hover:border-error-500/30 hover:text-error-400 flex items-center justify-center transition-colors text-neutral-400"
                    title="Disconnect wallet"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white text-sm font-semibold shadow-lg shadow-primary-500/20 transition-all hover:scale-105"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              )}

              {/* Mobile menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center justify-center text-neutral-300"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-white/5 px-4 py-4 space-y-3 animate-slide-up">
            <button onClick={() => scrollTo('tasks')} className="block w-full text-left py-2 text-neutral-300 hover:text-white">Tasks</button>
            <button onClick={() => scrollTo('leaderboard')} className="block w-full text-left py-2 text-neutral-300 hover:text-white">Leaderboard</button>
            <button onClick={() => scrollTo('blockchains')} className="block w-full text-left py-2 text-neutral-300 hover:text-white">Chains</button>
            <button onClick={() => scrollTo('how-it-works')} className="block w-full text-left py-2 text-neutral-300 hover:text-white">How It Works</button>
            <button onClick={() => scrollTo('stats')} className="block w-full text-left py-2 text-neutral-300 hover:text-white">Stats</button>
            <button onClick={() => scrollTo('faq')} className="block w-full text-left py-2 text-neutral-300 hover:text-white">FAQ</button>
          </nav>
        )}
      </div>
    </header>
  );
}
