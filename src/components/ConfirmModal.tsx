'use client';

import { Modal } from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-link-description text-text-secondary">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 admin-btn-secondary">
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 admin-btn-danger"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
