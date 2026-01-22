import { siteData } from '@/data/siteData';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { Footer } from '@/components/Footer';
import { GradientWave } from '@/components/GradientWave';
import { Newsletter } from '@/components/Newsletter';

function App() {
  const sortedSections = [...siteData.sections].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-background">
      <GradientWave />
      <div className="max-w-link-page mx-auto px-5 sm:px-4 relative z-10">
        <Header config={siteData.config} />
        <div className="transition-opacity duration-300 ease-out">
          {sortedSections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </div>
        <Newsletter />
        {siteData.config.showFooter && <Footer />}
      </div>
    </main>
  );
}

export default App;
