import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is AURORA?',
    a: 'AURORA is a multi-chain airdrop platform that lets you earn AUR tokens by completing tasks across 20+ blockchains. Your earned tokens are automatically staked in our yield protocol, generating interest of up to 24% APY.',
  },
  {
    q: 'How do I start earning?',
    a: 'Simply connect your wallet (MetaMask, Phantom, Trust Wallet, Coinbase, Exodus, and more are supported), then complete tasks from the Tasks section. Each completed task credits AUR tokens to your account instantly.',
  },
  {
    q: 'Which wallets are supported?',
    a: 'We support MetaMask, Phantom, Coinbase Wallet, Trust Wallet, Exodus, WalletConnect, Rainbow, OKX Wallet, Bitget Wallet, and Trezor. More wallets are added regularly.',
  },
  {
    q: 'Is AURORA safe to use?',
    a: 'Yes. AURORA is non-custodial, meaning we never hold your private keys. All transactions are signed by you in your wallet. Our smart contracts are audited by leading security firms.',
  },
  {
    q: 'How does the yield work?',
    a: 'When you earn AUR tokens, they are automatically staked in our yield protocol. The protocol generates returns through validated DeFi strategies across multiple chains, paying you interest on your holdings.',
  },
  {
    q: 'Which blockchains are supported?',
    a: 'AURORA supports 26 blockchains including Ethereum, Bitcoin, Solana, BNB Chain, Polygon, Avalanche, Arbitrum, Optimism, Base, Sui, Aptos, NEAR, Cosmos, and many more.',
  },
  {
    q: 'Are there any fees?',
    a: 'Participating in airdrops and completing tasks is completely free. Standard network gas fees apply for on-chain transactions, which are paid by your connected wallet.',
  },
  {
    q: 'When can I withdraw my rewards?',
    a: 'AUR tokens can be claimed and withdrawn to your wallet at any time. Tokens that are staked in the yield protocol can be unstaked with a 7-day unlock period.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-white text-sm sm:text-base pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-neutral-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-neutral-400">Everything you need to know about AURORA</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
