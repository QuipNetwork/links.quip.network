'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/types';
import { Modal } from './Modal';
import { Icon, iconOptions } from './Icons';

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; icon?: string; isCollapsible?: boolean }) => void;
  section?: Section | null;
  mode: 'add' | 'edit';
}

export function SectionModal({ isOpen, onClose, onSave, section, mode }: SectionModalProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (section && mode === 'edit') {
      setTitle(section.title);
      setIcon(section.icon || '');
      setIsCollapsible(section.isCollapsible);
    } else {
      setTitle('');
      setIcon('');
      setIsCollapsible(false);
    }
    setError('');
  }, [section, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    onSave({
      title: title.trim(),
      icon: icon || undefined,
      isCollapsible,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'add' ? 'Add Section' : 'Edit Section'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-caption text-text-secondary mb-1">
            Title <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Community"
            className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder:text-text-muted focus:border-primary outline-none"
          />
          {error && <span className="text-caption text-red-400 mt-1 block">{error}</span>}
        </div>

        <div>
          <label className="block text-caption text-text-secondary mb-1">Icon</label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary focus:border-primary outline-none"
          >
            <option value="">No icon</option>
            {iconOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {icon && (
            <div className="mt-2 flex items-center gap-2 text-text-secondary">
              <Icon name={icon} size={16} />
              <span className="text-caption">Preview</span>
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isCollapsible}
              onChange={(e) => setIsCollapsible(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-surface-elevated text-primary focus:ring-primary"
            />
            <span className="text-link-description text-text-secondary">
              Make section collapsible
            </span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="flex-1 btn-primary">
            {mode === 'add' ? 'Add Section' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
