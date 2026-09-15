import { Hero } from '@/components/sections/Hero';
import { SpotlightSection } from '@/components/sections/SpotlightSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CommunitySection } from '@/components/sections/CommunitySection';
import { EventsSection } from '@/components/sections/EventsSection';
import { LinkSectionBlock } from '@/components/sections/LinkSectionBlock';
import { ContactSection } from '@/components/sections/ContactSection';
import { LinksFooter } from '@/components/sections/LinksFooter';
import { siteData } from '@/data/siteData';

function App() {
  // Shown until the moment the mint closes, then gone.
  const spotlight = siteData.spotlight;
  const showSpotlight = spotlight && (!spotlight.endsAt || Date.now() < Date.parse(spotlight.endsAt));

  return (
    <>
      <Hero />
      {showSpotlight && <SpotlightSection item={spotlight} />}
      <ProductsSection />
      <LinkSectionBlock eyebrow="Build" heading="Build on the" italic="quantum network" links={siteData.developers} />
      <LinkSectionBlock eyebrow="Resources" heading="Research &" italic="reading" links={siteData.resources} />
      <EventsSection />
      <CommunitySection />
      <LinkSectionBlock
        eyebrow="Earn"
        heading="Points toward"
        italic="the airdrop"
        links={siteData.earn}
      />
      <ContactSection />
      <LinksFooter />
    </>
  );
}

export default App;
