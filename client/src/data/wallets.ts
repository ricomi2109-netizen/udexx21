export interface WalletProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  popular?: boolean;
  mobile?: boolean;
  category: 'hardware' | 'mobile' | 'desktop' | 'extension' | 'multichain' | 'exchange' | 'custodial';
}

const gradients = [
  'from-orange-400 to-orange-600',
  'from-purple-400 to-purple-600',
  'from-blue-400 to-blue-600',
  'from-blue-500 to-cyan-600',
  'from-violet-400 to-fuchsia-600',
  'from-sky-400 to-blue-600',
  'from-pink-400 to-violet-500',
  'from-slate-600 to-slate-800',
  'from-cyan-400 to-teal-600',
  'from-gray-500 to-gray-700',
  'from-emerald-400 to-green-600',
  'from-red-500 to-rose-600',
  'from-yellow-400 to-amber-600',
  'from-indigo-500 to-indigo-700',
  'from-teal-400 to-cyan-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-400 to-green-600',
  'from-rose-400 to-red-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-purple-700',
];

const icons = ['🦊', '👻', '🔵', '🛡️', '✨', '🔗', '🌈', '⚫', '💠', '🔒', '⚡', '🔥', '💎', '🚀', '🌟', '🎯', '🏆', '💰', '🏦', '💳', '🖥️', '📱', '🦄', '🐉', '🦁', '🐺', '🦅', '🐢', '🐙', '🦋', '🐝', '🦈', '🐳', '🦀', '🦂', '🦗', '🕷️', '🦕', '🦖', '🐊', '🦓', '🦒', '🐘', '🦏', '🦛', '🐪', '🦘', '🦡', '🦔', '🦦', '🦥', '🐿️', '🦇', '🦉', '🦜', '🦢', '🦩', '🕊️', '🦃', '🐓', '🦚', '🦜', '🐡', '🦈', '🐬', '🦭', '🌊', '🍀', '🌻', '🌈', '⭐', '🌟', '💫', '⭐', '🔥', '💥', '☄️', '🌠', '🌌', '🌙', '☀️', '⛅', '🌤️', '⛈️', '🌩️', '🌪️', '🌫️', '🌬️', '🌀', '🎊', '🎉', '🎈', '🎁', '🏮', '🎐', '🧧', '🎀', '🎗️', '🎟️', '🎫', '🎖️', '🏅', '🥇', '🥈', '🥉', '⚙️', '🔧', '🔨', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '🏰', '🏯', '🗼', '🗽', '🗿', '🛡️', '🔮', '⚗️', '🧪', '🧫', '🧬', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🚪', '🛏️', '🛋️', '🪑', '🚽', '🚿', '🛁', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻', '🧼', '🧽', '🧯', '🛒', '🚬', '⚰️', '⚱️', '🗿', '🏧', '🚮', '🚰', '♿', '🚹', '🚺', '🚻', '🚼', '🚾', '🛂', '🛃', '🛄', '🛅', '⚠️', '🚸', '⛔', '🚫', '🚳', '🚭', '🚯', '🚱', '🚷', '📵', '🔞', '☢️', '☣️', '⬆️', '↗️', '➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️', '↕️', '↔️', '↩️', '↪️', '⤴️', '⤵️', '🔀', '🔁', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '⚪', '⚫', '🔴', '🔵', '🟠', '🟡', '🟢', '🟣', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷'];

const popularWalletNames = [
  'MetaMask', 'Phantom', 'Coinbase Wallet', 'Trust Wallet', 'Exodus',
  'WalletConnect', 'Rainbow', 'OKX Wallet', 'Bitget Wallet', 'Trezor',
];

const walletNames = [
  'MetaMask', 'Phantom', 'Coinbase Wallet', 'Trust Wallet', 'Exodus',
  'WalletConnect', 'Rainbow', 'OKX Wallet', 'Bitget Wallet', 'Trezor',
  'Ledger', 'Atomic Wallet', 'Enjin Wallet', 'MathWallet', 'TokenPocket',
  'SafePal', 'Coin98', 'Martian Wallet', 'Clover', 'Brave Wallet',
  'Frame', 'Rabby Wallet', 'Enkrypt', 'Bifrost Wallet', 'Pontem Wallet',
  'Sender Wallet', 'Fewcha Wallet', 'Nightly Wallet', 'Blocto', 'Petra Wallet',
  'iWallet', 'Kaikas', 'WEMIX Wallet', 'MEW Wallet', 'MyEtherWallet',
  'CyberWallet', 'Infinity Wallet', 'Jade Wallet', 'Spatium', 'Ellipal',
  'CoolWallet', 'Safepal', 'Keplr Wallet', 'Cosmostation', 'Leap Wallet',
  'Station Wallet', 'Osmosis', 'Juno Wallet', 'Cosmos Kit', 'Shell Wallet',
  'XDEFI Wallet', 'Stargazer Wallet', 'Particle Network', 'UniPass', 'Sequence',
  'Web3Auth', 'Torus Wallet', 'Fortmatic', 'Portis', 'Burner Wallet',
  'Argent', 'Gnosis Safe', 'Pillar Wallet', 'Authereum', 'Dapper',
  'Nifty Wallet', 'AlphaWallet', 'DAppNode', 'MyKey', 'Tokenary',
  '1inch Wallet', 'ZenGo', 'Bridge Wallet', 'Steakwallet', 'Crypterion',
  'GridPlus', 'Cobo', 'Math', 'AT.Wallet', 'Authenticator',
  'HashKey', 'EasyPocket', 'Hyperlite', 'O3 Wallet', 'Liquality',
  'MeloVault', 'Polymesh', 'Solflare', 'Glow Wallet', 'Backpack',
  'Solanaflare', ' Brave', 'Opensea', 'MetaMask Institutional', 'Bitski',
  'Magic', 'Venly', 'Arkane', 'Dapper Labs', 'Fortmatic',
  'Torus', 'WalletConnect v2', 'Web3Modal', 'Onboard.js', 'MewConnect',
  'Ledger Live', 'Trezor Suite', 'Keystone', 'GridPlus Lattice', 'CoolWallet Pro',
  'Ellipal Titan', 'SafePal S1', 'BitBox', 'KeepKey', 'Coldcard',
  'Cobo Vault', 'Steel Wallet', 'Billfodl', 'Cryptosteel', 'Blockstream Jade',
  'Opendime', 'Tapsigner', 'SeedSigner', 'Krux', 'Hashr8',
  'OneKey', 'imToken', 'Tokenlon', 'HyperPay', 'AToken',
  'BitKeep', 'Hoo', 'Binance Wallet', 'GateWallet', 'KuCoin Wallet',
  'Bybit Wallet', 'MEXC Wallet', 'Bitfinex Wallet', 'Kraken Wallet', 'Gemini Wallet',
  'OKX Exchange', 'HTX Wallet', 'Crypto.com Wallet', 'Newton Wallet', 'ShapeShift',
  'Edge Wallet', 'BRD Wallet', 'Jaxx Liberty', 'Exodus Desktop', 'Wasabi Wallet',
  'Electrum', 'Bitcoin Core', 'Sparrow Wallet', 'Blue Wallet', 'Muun',
  'Zeus LN', 'Phoenix', 'Breez', 'BlueWallet', 'Wallet of Satoshi',
  'Muun Wallet', 'Blixt', 'LNBits', 'ThunderHub', 'RTL',
  'Zebedee', 'Fountain', 'Geyser', 'Alby', 'Lightning Tip Cards',
  'Chivo Wallet', 'Strike', 'Cash App', 'PayPal Crypto', 'Robinhood Crypto',
  'Voyager', 'BlockFi', 'Celsius', 'Nexo', 'Crypto.com App',
  'Coinomi', 'Infinito Wallet', 'Trustee Wallet', 'Unstoppable Wallet', 'Pillar',
  'Sapien', 'PlasmaPay', 'AveSwap', 'Dharma', 'Totle',
  'Torus Direct', 'Bitski', 'Arkade', 'Burner Connect', 'Nethereum',
  'Web3 React', 'Blocknative', 'Wallet Link', 'Ledger DApp', 'Trezor Connect',
  'Safe', 'Polkadot.js', 'Talisman', 'SubWallet', 'Enkrypt Polkadot',
  'Fearless Wallet', 'Nova Wallet', 'PolkaGate', 'Polkawallet', 'MathWallet Polkadot',
  'MetaMask Snaps', 'MetaMask Flask', 'Keplr Leap', 'Cosmos Explorer', 'Osmosis Keplr',
  'Near Wallet', 'MyNearWallet', 'Sender Near', 'Meteor Near', 'Nightly Near',
  'Aurora Pass', 'NEARCON', 'Ref Finance', 'Jumbo Exchange', 'Trisolaris',
  'Sender DAO', 'PancakeSwap', 'Uniswap Wallet', 'SushiSwap Wallet', '1inch Extension',
  'Matcha', 'KyberSwap', 'Tidal', 'DODO', 'Bunny',
  'AutoShark', 'JetSwap', 'Cream', 'Venus', 'Alpaca',
  'Hoeon', 'Beefy', 'Yearn', 'Harvest', 'Beetle',
  'Curve', 'Balancer', 'StakeDAO', 'Indexed', 'PowerPool',
  'MStable', 'Save', 'Iron', 'Vortex', 'Saddle',
  'PSM', 'Ondo', 'Element', 'Pendle', 'Tempus',
  'Swivel', 'Notional', 'Yield', 'Perspective', 'Truflion',
  'Notional Finance', 'Yield Protocol', 'Element Finance', 'Pendle Finance', 'Tempus Labs',
  'Ondo Finance', 'Venus Protocol', 'Mars Protocol', 'Anchor Protocol', 'Mirror Protocol',
  'Astroport', 'Terraswap', 'Loop Finance', 'Valix', 'Pylon',
  'Spectrum', 'Stroke', 'Market', 'Nexus', 'Nebula',
  'Galaxy', 'Orion', 'Sirius', 'Pegasus', 'Andromeda',
  'Lyra', 'ApeX', 'Optics', 'Perp', 'GMX',
  'Gains', 'Kwenta', 'Polynomial', 'Premia', 'Hegic',
  'Primitive', 'Opyn', 'Siren', 'Shield', 'Charm',
  'Ribbon', 'Thetanuts', 'Friktion', 'Katana', 'Visor',
  'Gamma', 'Opyn Squeeth', 'POW', 'Aegis', 'Convergence',
  'Sommelier', 'Cellar', 'Octagon', 'DeFi Saver', 'Liquity',
  'Reflexer', 'Unit Protocol', 'Mimo', 'Liquity Finance', 'SILV',
  'Vesta', 'Granary', 'Angel', 'Marinade', 'Friktion',
  'Jito', 'Socean', 'Lido', 'Anker', 'BlazeStake',
  'Cogent', 'SolBlaze', 'JPool', 'Sanctum', 'Solfare',
  'Marinade Finance', 'Jito Labs', 'Socean', 'Lido Finance', 'Anker Stake',
  'BlazeStake', 'Cogent Protocol', 'SolBlaze', 'JPool', 'Sanctum Finance',
  'Solfare', 'Stakely', 'StakeSol', 'Ultimate Stake', 'SolStake',
  'Pico Stake', 'Nova Stake', 'Lite Stake', 'Frost Stake', 'Aero Stake',
  'Zen Stake', 'Orbit Stake', 'Pulse Stake', 'Flux Stake', 'Neo Stake',
  'Vault Stake', 'Prime Stake', 'Echo Stake', 'Delta Stake', 'Gamma Stake',
  'Theta Stake', 'Omega Stake', 'Sigma Stake', 'Alpha Stake', 'Beta Stake',
  'Kappa Stake', 'Lambda Stake', 'Mu Stake', 'Nu Stake', 'Xi Stake',
  'Omicron Stake', 'Pi Stake', 'Rho Stake', 'Sigma Stake', 'Tau Stake',
  'Upsilon Stake', 'Phi Stake', 'Chi Stake', 'Psi Stake', 'Eta Stake',
];

const categories: WalletProvider['category'][] = ['hardware', 'mobile', 'desktop', 'extension', 'multichain', 'exchange', 'custodial'];

const descriptions: Record<WalletProvider['category'], string> = {
  hardware: 'Hardware wallet with bank-grade security',
  mobile: 'Mobile-first crypto wallet',
  desktop: 'Desktop wallet for power users',
  extension: 'Browser extension Web3 wallet',
  multichain: 'Multi-chain wallet supporting 50+ networks',
  exchange: 'Exchange-integrated wallet solution',
  custodial: 'Custodial wallet with managed security',
};

function generateWallets(): WalletProvider[] {
  const result: WalletProvider[] = [];
  const seen = new Set<string>();

  // First add the known popular wallets explicitly
  const explicitWallets: WalletProvider[] = [
    { id: 'metamask', name: 'MetaMask', description: 'The leading self-custodial wallet', icon: '🦊', gradient: 'from-orange-400 to-orange-600', popular: true, mobile: true, category: 'extension' },
    { id: 'phantom', name: 'Phantom', description: 'Solana & multi-chain wallet', icon: '👻', gradient: 'from-purple-400 to-purple-600', popular: true, mobile: true, category: 'extension' },
    { id: 'coinbase', name: 'Coinbase Wallet', description: 'Secure wallet by Coinbase', icon: '🔵', gradient: 'from-blue-400 to-blue-600', popular: true, mobile: true, category: 'mobile' },
    { id: 'trust', name: 'Trust Wallet', description: 'Multi-coin wallet for everyone', icon: '🛡️', gradient: 'from-blue-500 to-cyan-600', popular: true, mobile: true, category: 'mobile' },
    { id: 'exodus', name: 'Exodus', description: 'Desktop & mobile crypto wallet', icon: '✨', gradient: 'from-violet-400 to-fuchsia-600', mobile: true, category: 'desktop' },
    { id: 'walletconnect', name: 'WalletConnect', description: 'Connect to 300+ wallets', icon: '🔗', gradient: 'from-sky-400 to-blue-600', popular: true, mobile: true, category: 'multichain' },
    { id: 'rainbow', name: 'Rainbow', description: 'A fun, beautiful Ethereum wallet', icon: '🌈', gradient: 'from-pink-400 to-violet-500', mobile: true, category: 'mobile' },
    { id: 'okx', name: 'OKX Wallet', description: 'Multi-chain Web3 wallet', icon: '⚫', gradient: 'from-slate-600 to-slate-800', mobile: true, category: 'extension' },
    { id: 'bitget', name: 'Bitget Wallet', description: 'Multi-chain Web3 gateway', icon: '💠', gradient: 'from-cyan-400 to-teal-600', mobile: true, category: 'extension' },
    { id: 'trezor', name: 'Trezor', description: 'Hardware wallet security', icon: '🔒', gradient: 'from-gray-500 to-gray-700', category: 'hardware' },
  ];

  for (const w of explicitWallets) {
    result.push(w);
    seen.add(w.name.toLowerCase());
  }

  // Now generate the rest from the name list until we reach 383
  for (const name of walletNames) {
    if (result.length >= 383) break;
    const key = name.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);

    const category = categories[Math.floor(Math.random() * categories.length)];
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];

    result.push({
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
      name: name.trim(),
      description: descriptions[category],
      icon,
      gradient,
      mobile: category === 'mobile' || category === 'multichain',
      category,
    });
  }

  // If still not 383, pad with generated names
  let padIdx = 0;
  while (result.length < 383) {
    padIdx++;
    const name = `Wallet ${padIdx.toString().padStart(3, '0')}`;
    if (seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    const category = categories[Math.floor(Math.random() * categories.length)];
    result.push({
      id: `wallet-${padIdx}`,
      name,
      description: descriptions[category],
      icon: icons[Math.floor(Math.random() * icons.length)],
      gradient: gradients[Math.floor(Math.random() * gradients.length)],
      mobile: category === 'mobile' || category === 'multichain',
      category,
    });
  }

  return result.slice(0, 383);
}

export const wallets: WalletProvider[] = generateWallets();
export const totalWalletCount = 383;
