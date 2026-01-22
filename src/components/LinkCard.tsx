import { Link } from '@/types';
import { Icon } from './Icons';

interface LinkCardProps {
  link: Link;
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <div className="button_wrapper">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="button is-icon group"
      >
        {/* Icon */}
        {link.icon && (
          <div className="flex-shrink-0 text-white/80 group-hover:text-white transition-colors duration-300">
            <Icon
              name={link.icon}
              size={20}
              className="transition-transform duration-300"
            />
          </div>
        )}

        {/* Text content */}
        <span>{link.title}</span>
      </a>

      {/* Animated blur blobs */}
      <div className="button_blurs">
        <div className="button_blur is-1"></div>
        <div className="button_blur is-2"></div>
        <div className="button_blur is-3"></div>
        <div className="button_blur is-4"></div>
      </div>
    </div>
  );
}
