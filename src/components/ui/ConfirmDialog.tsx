'use client';

import Modal from './Modal';

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  variant = 'danger',
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'default';
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-muted">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-hover"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
            variant === 'danger'
              ? 'bg-[#c4727f] hover:bg-[#b8606d]'
              : 'bg-[#5c6b5c] hover:bg-[#4d5c4d]'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
