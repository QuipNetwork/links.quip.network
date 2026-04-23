import { Hero } from '@/components/sections/Hero';
import { EarnSection } from '@/components/sections/EarnSection';
import { CommunitySection } from '@/components/sections/CommunitySection';
import { EventsSection } from '@/components/sections/EventsSection';
import { LinkSectionBlock } from '@/components/sections/LinkSectionBlock';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { LinksFooter } from '@/components/sections/LinksFooter';
import { siteData } from '@/data/siteData';

function App() {
  return (
    <>
      <Hero />
      <EarnSection />
      <CommunitySection />
      <EventsSection />
      <LinkSectionBlock eyebrow="Developers" heading="Build on the" italic="quantum network" links={siteData.developers} />
      <LinkSectionBlock eyebrow="Resources" heading="Research &" italic="reading" links={siteData.resources} />
      <NewsletterSection />
      <LinksFooter />
    </>
  );
}

export default App;
