import { Zap, Twitter, MessageCircle, MessageSquare, Send, Github } from 'lucide-react';

const socials = [
  { icon: Twitter, label: 'X', href: '#' },
  { icon: MessageCircle, label: 'Telegram', href: '#' },
  { icon: MessageSquare, label: 'Discord', href: '#' },
  { icon: Send, label: 'Medium', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

const linkColumns = [
  {
    title: 'Platform',
    links: ['Airdrop Tasks', 'Supported Chains', 'How It Works', 'Yield Protocol', 'Roadmap'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Whitepaper', 'API Reference', 'Brand Kit', 'Blog'],
  },
  {
    title: 'Community',
    links: ['Discord Server', 'Telegram Group', 'X Account', 'Forum', 'Governance'],
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Risk Disclosure', 'Audit Reports'],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-bold text-white">AURORA</span>
            </div>
            <p className="text-sm text-neutral-400 mb-5 max-w-xs leading-relaxed">
              The premier multi-chain airdrop platform. Connect, earn, and grow your crypto across 20+ blockchains.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-9 h-9 rounded-xl glass-card glass-card-hover flex items-center justify-center text-neutral-400 hover:text-primary-400"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {linkColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; 2026 AURORA Protocol. All rights reserved. Non-custodial. Audited.
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-success-400 animate-glow-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
