import { useState } from 'react';
import { Section as SectionType } from '@/types';
import { Icon } from './Icons';
import { LinkCard } from './LinkCard';

interface SectionProps {
  section: SectionType;
}

export function Section({ section }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(section.defaultExpanded);
  const sortedLinks = [...section.links].sort((a, b) => a.order - b.order);

  // Don't render empty sections
  if (sortedLinks.length === 0) {
    return null;
  }

  const headerContent = (
    <>
      {section.icon && (
        <span className="text-primary">
          <Icon name={section.icon} size={14} />
        </span>
      )}
      <h2 className="section-title flex-1">{section.title}</h2>
      {section.isCollapsible && (
        <Icon
          name="chevronDown"
          size={14}
          className={`ml-auto text-text-dim transition-transform duration-300 ${
            isExpanded ? '' : '-rotate-90'
          }`}
        />
      )}
    </>
  );

  return (
    <section className="mb-10" aria-label={section.title}>
      {section.isCollapsible ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 mb-5 w-full text-left py-2 px-2 -mx-2 rounded-xl hover:bg-surface/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
          aria-expanded={isExpanded}
        >
          {headerContent}
        </button>
      ) : (
        <div className="flex items-center gap-2 mb-5 py-2">
          {headerContent}
        </div>
      )}

      {/* Animated expand/collapse */}
      <div
        className={`transition-all duration-300 ease-out ${
          !section.isCollapsible || isExpanded
            ? 'opacity-100 max-h-[2000px]'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="space-y-3">
          {sortedLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
