import { siteData } from '@/data/siteData';
import { BentoLinkCard, BentoSocialCard, BentoNewsletterCard } from './BentoCard';
import { Newsletter } from './Newsletter';

export function BentoGrid() {
  const vault = siteData.sections.find(s => s.id === 'vault');
  const community = siteData.sections.find(s => s.id === 'community');
  const developers = siteData.sections.find(s => s.id === 'developers');
  const resources = siteData.sections.find(s => s.id === 'resources');

  const vaultLink = vault?.links[0];
  const socialLinks = community?.links.map(l => ({
    id: l.id,
    title: l.title.replace('Follow us on ', '').replace('Join our ', '').replace('Follow on ', ''),
    url: l.url,
    icon: l.icon || 'link',
  })) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Row 1: Vault (featured) + Social Icons */}
      {vaultLink && (
        <BentoLinkCard
          title={vaultLink.title}
          url={vaultLink.url}
          icon={vaultLink.icon}
          description={vaultLink.description}
          featured
        />
      )}

      <BentoSocialCard links={socialLinks} />

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
