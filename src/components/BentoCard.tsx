import { Icon } from './Icons';

interface BentoLinkCardProps {
  title: string;
  url: string;
  icon?: string | null;
  description?: string | null;
  featured?: boolean;
  backgroundImage?: string;
  colSpan?: 1 | 2;
}

export function BentoLinkCard({ title, url, icon, description, featured, backgroundImage, colSpan = 1 }: BentoLinkCardProps) {
  if (featured) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          group block rounded-2xl p-5 transition-all duration-300 relative overflow-hidden
          bg-[rgba(28,28,40,0.7)] backdrop-blur-sm
          border border-[rgba(120,140,180,0.1)]
          hover:border-[rgba(120,140,180,0.2)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
          hover:-translate-y-0.5
          ${colSpan === 2 ? 'md:col-span-2' : ''}
        `}
      >
        {/* Background image */}
        <img
          src={backgroundImage || "/images/safe.png"}
          alt=""
          className="absolute right-0 bottom-0 h-full w-auto max-w-none opacity-40 group-hover:opacity-55 transition-opacity duration-500 pointer-events-none"
        />

        <div className="relative z-10">
          <span className="text-[15px] font-semibold text-white block drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{title}</span>
          {description && (
            <p className="text-[12px] text-[rgba(150,200,220,0.7)] mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{description}</p>
          )}
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group block rounded-2xl p-4 transition-all duration-300
        bg-[rgba(28,28,40,0.7)] backdrop-blur-sm
        border border-[rgba(120,140,180,0.08)]
        hover:border-[rgba(120,140,180,0.2)] hover:bg-[rgba(35,35,50,0.8)]
        hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        ${colSpan === 2 ? 'md:col-span-2' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex-shrink-0 text-white/50 group-hover:text-white/80 transition-colors">
            <Icon name={icon} size={18} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-[14px] font-medium text-white/90">{title}</span>
          {description && (
            <p className="text-[11px] text-white/40 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-white/20 group-hover:text-white/50 transition-colors opacity-0 group-hover:opacity-100">
          <Icon name="externalLink" size={12} />
        </div>
      </div>
    </a>
  );
}

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
}

interface BentoSocialCardProps {
  links: SocialLink[];
}

export function BentoSocialCard({ links }: BentoSocialCardProps) {
  return (
    <div className="rounded-2xl p-4 bg-[rgba(28,28,40,0.7)] backdrop-blur-sm border border-[rgba(120,140,180,0.08)]">
      <p className="text-[14px] font-medium text-white/90 mb-3">Community</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[rgba(40,40,58,0.5)] hover:bg-[rgba(50,50,70,0.7)] border border-transparent hover:border-[rgba(120,140,180,0.12)] transition-all duration-200 group"
          >
            <div className="text-white/40 group-hover:text-white/80 transition-colors">
              <Icon name={link.icon} size={15} />
            </div>
            <span className="text-[12px] text-white/50 group-hover:text-white/80 transition-colors font-medium">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

interface BentoSectionLabelProps {
  label: string;
  icon?: string;
}

export function BentoSectionLabel({ label, icon }: BentoSectionLabelProps) {
  return (
    <div className="md:col-span-2 flex items-center gap-2 pt-3 pb-1 px-1">
      {icon && (
        <span className="text-white/20">
          <Icon name={icon} size={12} />
        </span>
      )}
      <span className="text-[10px] font-semibold text-white/20 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

interface BentoNewsletterCardProps {
  children: React.ReactNode;
}

export function BentoNewsletterCard({ children }: BentoNewsletterCardProps) {
  return (
    <div className="md:col-span-2 rounded-2xl p-5 bg-[rgba(28,28,40,0.7)] backdrop-blur-sm border border-[rgba(120,140,180,0.08)]">
      {children}
    </div>
  );
}

interface BentoCalendarCardProps {
  embedUrl: string;
}

export function BentoCalendarCard({ embedUrl }: BentoCalendarCardProps) {
  return (
    <div className="md:col-span-2 rounded-2xl overflow-hidden bg-[rgba(28,28,40,0.7)] backdrop-blur-sm border border-[rgba(120,140,180,0.08)]">
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest">Events</p>
      </div>
      <iframe
        src={embedUrl}
        className="w-full border-0"
        style={{ height: '160px' }}
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
      />
    </div>
  );
}

