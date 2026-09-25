import { useState } from 'react';
import { Copy, Check, Share2, Gift, Users, TrendingUp, Twitter, MessageCircle, Send } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export function ReferralSection() {
  const { connected, address, openModal } = useWallet();
  const [copied, setCopied] = useState(false);

  const referralLink = address
    ? `https://aurora-airdrop.io/r/${address.slice(2, 10)}`
    : 'https://aurora-airdrop.io/r/your-wallet';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: 'Friends Invited', value: '0', icon: Users, color: 'from-primary-400 to-primary-600' },
    { label: 'Referral Points', value: '0', icon: TrendingUp, color: 'from-secondary-400 to-secondary-600' },
    { label: 'Bonus Earned', value: '0 AUR', icon: Gift, color: 'from-accent-400 to-accent-600' },
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card mb-5">
            <Share2 className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-neutral-200">Loyalty Program</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Refer Friends, <span className="text-gradient-aurora">Earn 10% Bonus</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Share your unique referral link. When friends connect their wallet and complete tasks, you earn 10% of their points — permanently.
          </p>
        </div>

        {connected ? (
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            {/* Referral link */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-300 mb-2">Your Referral Link</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 px-4 py-3 rounded-xl bg-neutral-900/60 border border-white/5 text-sm text-neutral-300 font-mono truncate">
                  {referralLink}
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    copied
                      ? 'bg-success-500/20 text-success-400'
                      : 'bg-primary-500 hover:bg-primary-400 text-white shadow-lg shadow-primary-500/20'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" strokeWidth={3} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs text-neutral-500 mr-1">Share to:</span>
              {[
                { icon: Twitter, label: 'X', color: 'hover:bg-slate-700' },
                { icon: MessageCircle, label: 'Telegram', color: 'hover:bg-sky-600' },
                { icon: Send, label: 'Share', color: 'hover:bg-primary-600' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    className={`w-9 h-9 rounded-lg bg-white/5 ${s.color} flex items-center justify-center text-neutral-400 hover:text-white transition-all`}
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="glass-card rounded-xl p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-display text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Connect to Get Your Link</h3>
            <p className="text-sm text-neutral-400 mb-6">Connect your wallet to generate your unique referral link and start earning 10% bonus on friends' rewards.</p>
            <button
              onClick={openModal}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/20 transition-all hover:scale-105"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
