'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Link as LinkType } from '@/types';
import { SiteDataProvider, useSiteData } from '@/lib/context';
import { Icon } from '@/components/Icons';
import { LinkModal } from '@/components/LinkModal';
import { SectionModal } from '@/components/SectionModal';
import { ConfirmModal } from '@/components/ConfirmModal';

function AdminContent() {
  const {
    siteData,
    isLoaded,
    updateConfig,
    addSection,
    updateSection,
    deleteSection,
    addLink,
    updateLink,
    deleteLink,
    reorderSections,
    reorderLinks,
  } = useSiteData();

  // Modal states
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkModalMode, setLinkModalMode] = useState<'add' | 'edit'>('add');
  const [currentLink, setCurrentLink] = useState<LinkType | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [sectionModalMode, setSectionModalMode] = useState<'add' | 'edit'>('add');
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');

  // Drag state
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [draggedLink, setDraggedLink] = useState<{ id: string; sectionId: string } | null>(null);

  const sortedSections = [...siteData.sections].sort((a, b) => a.order - b.order);

  // Section handlers
  const handleAddSection = () => {
    setSectionModalMode('add');
    setCurrentSection(null);
    setSectionModalOpen(true);
  };

  const handleEditSection = (section: Section) => {
    setSectionModalMode('edit');
    setCurrentSection(section);
    setSectionModalOpen(true);
  };

  const handleDeleteSection = (section: Section) => {
    setConfirmTitle('Delete Section');
    setConfirmMessage(
      `Are you sure you want to delete "${section.title}"? All links in this section will also be deleted.`
    );
    setConfirmAction(() => () => deleteSection(section.id));
    setConfirmModalOpen(true);
  };

  const handleSaveSection = (data: { title: string; icon?: string; isCollapsible?: boolean }) => {
    if (sectionModalMode === 'add') {
      addSection(data.title, data.icon);
    } else if (currentSection) {
      updateSection(currentSection.id, data);
    }
  };

  // Link handlers
  const handleAddLink = (sectionId: string) => {
    setLinkModalMode('add');
    setCurrentLink(null);
    setCurrentSectionId(sectionId);
    setLinkModalOpen(true);
  };

  const handleEditLink = (link: LinkType) => {
    setLinkModalMode('edit');
    setCurrentLink(link);
    setCurrentSectionId(link.sectionId);
    setLinkModalOpen(true);
  };

  const handleDeleteLink = (link: LinkType) => {
    setConfirmTitle('Delete Link');
    setConfirmMessage(`Are you sure you want to delete "${link.title}"?`);
    setConfirmAction(() => () => deleteLink(link.id));
    setConfirmModalOpen(true);
  };

  const handleSaveLink = (data: { title: string; url: string; description?: string; icon?: string }) => {
    if (linkModalMode === 'add' && currentSectionId) {
      addLink(currentSectionId, data.title, data.url, data.description, data.icon);
    } else if (currentLink) {
      updateLink(currentLink.id, data);
    }
  };

  // Drag and drop handlers for sections
  const handleSectionDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetSectionId) return;

    const newSections = [...sortedSections];
    const draggedIndex = newSections.findIndex((s) => s.id === draggedSection);
    const targetIndex = newSections.findIndex((s) => s.id === targetSectionId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = newSections.splice(draggedIndex, 1);
      newSections.splice(targetIndex, 0, removed);
      reorderSections(newSections);
    }
  };

  const handleSectionDragEnd = () => {
    setDraggedSection(null);
  };

  // Drag and drop handlers for links
  const handleLinkDragStart = (e: React.DragEvent, linkId: string, sectionId: string) => {
    e.stopPropagation();
    setDraggedLink({ id: linkId, sectionId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleLinkDragOver = (e: React.DragEvent, targetLinkId: string, targetSectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedLink || draggedLink.id === targetLinkId) return;

    const section = siteData.sections.find((s) => s.id === targetSectionId);
    if (!section) return;

    const sortedLinks = [...section.links].sort((a, b) => a.order - b.order);
    const draggedIndex = sortedLinks.findIndex((l) => l.id === draggedLink.id);
    const targetIndex = sortedLinks.findIndex((l) => l.id === targetLinkId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = sortedLinks.splice(draggedIndex, 1);
      sortedLinks.splice(targetIndex, 0, removed);
      reorderLinks(targetSectionId, sortedLinks);
    }
  };

  const handleLinkDragEnd = () => {
    setDraggedLink(null);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-text-muted text-sm">Loading admin...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border" style={{ backgroundColor: '#1a0c25' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(35, 16, 48, 0.7)' }}>
              <Icon name="edit" size={18} className="text-primary" />
            </div>
            <h1 className="text-admin-title text-text-primary">Admin</h1>
          </div>
          <Link
            href="/"
            target="_blank"
            className="admin-btn-secondary"
          >
            <Icon name="eye" size={16} />
            <span className="hidden sm:inline">Preview Site</span>
            <span className="sm:hidden">Preview</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Site Settings */}
        <div className="admin-card p-5 sm:p-6 mb-6">
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="settings" size={18} className="text-text-muted" />
            Site Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Tagline</label>
              <input
                type="text"
                value={siteData.config.tagline || ''}
                onChange={(e) => updateConfig({ tagline: e.target.value || null })}
                placeholder="Enter a tagline..."
                className="admin-input"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer group py-2">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={siteData.config.showFooter}
                  onChange={(e) => updateConfig({ showFooter: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 rounded-full transition-all" style={{ backgroundColor: 'rgba(35, 16, 48, 0.7)', border: '1px solid var(--border)' }}>
                  <div className="peer-checked:translate-x-4 peer-checked:bg-primary" />
                </div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-text-muted rounded-full peer-checked:translate-x-4 peer-checked:bg-primary transition-all" />
              </div>
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Show footer</span>
            </label>
          </div>
        </div>

        {/* Sections */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
            <Icon name="layers" size={18} className="text-text-muted" />
            Sections
            <span className="text-xs font-normal text-text-dim px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(35, 16, 48, 0.7)' }}>
              {sortedSections.length}
            </span>
          </h2>
          <button onClick={handleAddSection} className="admin-btn-primary">
            <Icon name="plus" size={16} />
            Add Section
          </button>
        </div>

        <div className="space-y-4">
          {sortedSections.map((section) => (
            <div
              key={section.id}
              draggable
              onDragStart={(e) => handleSectionDragStart(e, section.id)}
              onDragOver={(e) => handleSectionDragOver(e, section.id)}
              onDragEnd={handleSectionDragEnd}
              className={`admin-card overflow-hidden transition-all ${
                draggedSection === section.id ? 'opacity-50 scale-[0.98]' : ''
              }`}
            >
              {/* Section header */}
              <div className="flex items-center gap-3 p-4 admin-card-header">
                <div className="cursor-grab active:cursor-grabbing text-text-dim hover:text-text-secondary p-1.5 -m-1.5 rounded-lg hover:bg-surface transition-colors">
                  <Icon name="drag" size={18} />
                </div>
                {section.icon && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(167, 139, 250, 0.15)' }}>
                    <Icon name={section.icon} size={16} className="text-secondary" />
                  </div>
                )}
                <span className="text-[15px] font-medium text-text-primary flex-1">{section.title}</span>
                <span className="text-xs text-text-dim px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(35, 16, 48, 0.7)' }}>
                  {section.links.length} {section.links.length === 1 ? 'link' : 'links'}
                </span>
                <button
                  onClick={() => handleEditSection(section)}
                  className="p-2.5 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  title="Edit section"
                >
                  <Icon name="edit" size={16} />
                </button>
                <button
                  onClick={() => handleDeleteSection(section)}
                  className="p-2.5 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"
                  title="Delete section"
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>

              {/* Links */}
              <div className="p-4 space-y-2">
                {[...section.links]
                  .sort((a, b) => a.order - b.order)
                  .map((link) => (
                    <div
                      key={link.id}
                      draggable
                      onDragStart={(e) => handleLinkDragStart(e, link.id, section.id)}
                      onDragOver={(e) => handleLinkDragOver(e, link.id, section.id)}
                      onDragEnd={handleLinkDragEnd}
                      className={`flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-border transition-all ${
                        draggedLink?.id === link.id ? 'opacity-50 scale-[0.98]' : ''
                      }`}
                      style={{ backgroundColor: 'rgba(35, 16, 48, 0.5)' }}
                    >
                      <div className="cursor-grab active:cursor-grabbing text-text-dim hover:text-text-secondary p-1 -m-1 rounded hover:bg-surface transition-colors">
                        <Icon name="drag" size={14} />
                      </div>
                      {link.icon && (
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(100, 200, 255, 0.15)' }}>
                          <Icon name={link.icon} size={14} className="text-primary" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text-primary truncate">{link.title}</div>
                        {link.description && (
                          <div className="text-xs text-text-muted truncate mt-0.5">{link.description}</div>
                        )}
                      </div>
                      <button
                        onClick={() => handleEditLink(link)}
                        className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="Edit link"
                      >
                        <Icon name="edit" size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link)}
                        className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"
                        title="Delete link"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  ))}

                <button
                  onClick={() => handleAddLink(section.id)}
                  className="w-full p-3.5 border-2 border-dashed border-border/60 rounded-xl text-text-muted hover:text-primary hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <Icon name="plus" size={16} />
                  Add Link
                </button>
              </div>
            </div>
          ))}

          {sortedSections.length === 0 && (
            <div className="text-center py-16 px-6 admin-card">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(167, 139, 250, 0.15)' }}>
                <Icon name="layers" size={28} className="text-secondary" />
              </div>
              <h3 className="text-lg font-medium text-text-primary mb-2">No sections yet</h3>
              <p className="text-text-muted mb-6 max-w-sm mx-auto">
                Create your first section to start organizing your links.
              </p>
              <button onClick={handleAddSection} className="admin-btn-primary">
                <Icon name="plus" size={16} />
                Create First Section
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <LinkModal
        isOpen={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        onSave={handleSaveLink}
        link={currentLink}
        mode={linkModalMode}
      />

      <SectionModal
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
        onSave={handleSaveSection}
        section={currentSection}
        mode={sectionModalMode}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => confirmAction?.()}
        title={confirmTitle}
        message={confirmMessage}
      />
    </div>
  );
}

export default function AdminPage() {
  return (
    <SiteDataProvider>
      <AdminContent />
    </SiteDataProvider>
  );
}
