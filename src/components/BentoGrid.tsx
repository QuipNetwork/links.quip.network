import { useState, useEffect } from 'react';
import { siteData } from '@/data/siteData';
import { BentoLinkCard, BentoSocialCard, BentoNewsletterCard, BentoCalendarCard } from './BentoCard';
import { Newsletter } from './Newsletter';

const LUMA_CALENDAR_API = 'https://api.lu.ma/calendar/get-items?calendar_api_id=cal-ByIDA5W5e1B4mpO&period=future';
const LUMA_CALENDAR_EMBED = 'https://lu.ma/embed/calendar/cal-ByIDA5W5e1B4mpO/events';

export function BentoGrid() {
  const [hasEvents, setHasEvents] = useState(false);

  useEffect(() => {
    fetch(LUMA_CALENDAR_API)
      .then(res => res.json())
      .then(data => {
        if (data.entries && data.entries.length > 0) {
          setHasEvents(true);
        }
      })
      .catch(() => {});
  }, []);
  const vault = siteData.sections.find(s => s.id === 'vault');
  const community = siteData.sections.find(s => s.id === 'community');
  const developers = siteData.sections.find(s => s.id === 'developers');
  const resources = siteData.sections.find(s => s.id === 'resources');

  const vaultLink = vault?.links[0];
  const questLink = vault?.links.find(l => l.id === 'quest');
  const socialLinks = community?.links.map(l => ({
    id: l.id,
    title: l.title.replace('Follow us on ', '').replace('Join our ', '').replace('Follow on ', ''),
    url: l.url,
    icon: l.icon || 'link',
  })) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Community */}
      <div className="md:col-span-2">
        <BentoSocialCard links={socialLinks} />
      </div>

      {/* Vault (featured) + Quests */}
      {vaultLink && (
        <BentoLinkCard
          title={vaultLink.title}
          url={vaultLink.url}
          icon={vaultLink.icon}
          description={vaultLink.description}
          featured
        />
      )}

      {questLink && (
        <BentoLinkCard
          title={questLink.title}
          url={questLink.url}
          icon={questLink.icon}
          description={questLink.description}
          featured
          backgroundImage="/images/chest.png"
        />
      )}

      {/* Events */}
      {hasEvents ? (
        <BentoCalendarCard embedUrl={LUMA_CALENDAR_EMBED} />
      ) : (
        <BentoLinkCard
          title="Events"
          url="https://lu.ma/quipnetwork"
          icon="calendar"
          description="No upcoming events"
          colSpan={2}
        />
      )}

      {developers?.links.map(link => (
        <BentoLinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          icon={link.icon}
          description={link.description}
        />
      ))}

      {resources?.links.map(link => (
        <BentoLinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          icon={link.icon}
          description={link.description}
        />
      ))}

      {/* Newsletter (full width) */}
      <BentoNewsletterCard>
        <Newsletter />
      </BentoNewsletterCard>
    </div>
  );
}
