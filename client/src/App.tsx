import { WalletProviderContext } from '@/context/WalletContext';
import { Toaster } from 'sonner';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { HowItWorks } from '@/components/HowItWorks';
import { Tasks } from '@/components/Tasks';
import { YieldSection } from '@/components/YieldSection';
import { Blockchains } from '@/components/Blockchains';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Leaderboard } from '@/components/Leaderboard';
import { ReferralSection } from '@/components/ReferralSection';
import { WalletConnectFallback } from '@/components/WalletConnectFallback';
import { WalletConnectionStatus } from '@/components/WalletConnectionStatus';

function App() {
  return (
    <WalletProviderContext>
      <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
        <Toaster position="bottom-right" richColors theme="dark" />
        <WalletConnectFallback />
        <WalletConnectionStatus />
        <Header />
        <main>
          <Hero />
          <Stats />
          <HowItWorks />
          <Tasks />
          <Leaderboard />
          <ReferralSection />
          <YieldSection />
          <Blockchains />
          <FAQ />
        </main>
        <Footer />
      </div>
    </WalletProviderContext>
  );
}

export default App;
