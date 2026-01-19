'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/types';
import { Modal } from './Modal';
import { Icon, iconOptions } from './Icons';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; url: string; description?: string; icon?: string }) => void;
  link?: Link | null;
  mode: 'add' | 'edit';
}

export function LinkModal({ isOpen, onClose, onSave, link, mode }: LinkModalProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  useEffect(() => {
    if (link && mode === 'edit') {
      setTitle(link.title);
      setUrl(link.url);
      setDescription(link.description || '');
      setIcon(link.icon || '');
    } else {
      setTitle('');
      setUrl('');
      setDescription('');
      setIcon('');
    }
    setErrors({});
  }, [link, mode, isOpen]);

  const validate = () => {
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 60) {
      newErrors.title = 'Title must be 60 characters or less';
    }

    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else {
      try {
        new URL(url);
      } catch {
        newErrors.url = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      title: title.trim(),
      url: url.trim(),
      description: description.trim() || undefined,
      icon: icon || undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'add' ? 'Add Link' : 'Edit Link'}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Icon</label>
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Icon name={icon} size={20} className="text-primary" />
              </div>
            )}
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="flex-1 bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="">No icon</option>
              {iconOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Title <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            placeholder="e.g., Follow us on Twitter"
            className={`w-full bg-surface-elevated border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-dim focus:ring-1 outline-none transition-all ${
              errors.title ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'
            }`}
          />
          <div className="flex justify-between mt-2">
            {errors.title ? (
              <span className="text-xs text-error">{errors.title}</span>
            ) : (
              <span className="text-xs text-text-dim">Required</span>
            )}
            <span className={`text-xs ${title.length > 50 ? 'text-secondary' : 'text-text-dim'}`}>{title.length}/60</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            URL <span className="text-secondary">*</span>
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className={`w-full bg-surface-elevated border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-dim focus:ring-1 outline-none transition-all ${
              errors.url ? 'border-error focus:border-error focus:ring-error/20' : 'border-border focus:border-primary focus:ring-primary/20'
            }`}
          />
          {errors.url && <span className="text-xs text-error mt-2 block">{errors.url}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={120}
            placeholder="Optional short description"
            className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-dim focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-text-dim">Optional</span>
            <span className={`text-xs ${description.length > 100 ? 'text-secondary' : 'text-text-dim'}`}>{description.length}/120</span>
          </div>
        </div>

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-secondary py-3"
          >
            Cancel
          </button>
          <button type="submit" className="flex-1 btn-primary py-3">
            {mode === 'add' ? 'Add Link' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
