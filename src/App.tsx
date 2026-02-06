import { siteData } from '@/data/siteData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GradientWave } from '@/components/GradientWave';
import { BentoGrid } from '@/components/BentoGrid';

function App() {
  return (
    <main className="min-h-screen">
      <GradientWave />
      <div className="max-w-link-page mx-auto px-5 sm:px-4 relative z-10">
        <Header config={siteData.config} />
        <BentoGrid />
        {siteData.config.showFooter && <Footer />}
      </div>
    </main>
  );
}

export default App;
