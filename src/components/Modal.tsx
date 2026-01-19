'use client';

import { useEffect, ReactNode } from 'react';
import { Icon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative bg-surface border border-border rounded-2xl w-full max-w-md shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <h2 id="modal-title" className="text-lg font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary hover:bg-surface-elevated p-2 -m-2 rounded-lg transition-all"
            aria-label="Close modal"
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
