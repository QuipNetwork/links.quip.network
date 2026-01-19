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
          <button onClick={onClose} className="flex-1 btn-secondary">
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
