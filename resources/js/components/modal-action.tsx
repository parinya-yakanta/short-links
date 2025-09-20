import { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  children: ReactNode;
};

export default function ModalAction({ open, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#161615] rounded-lg shadow-lg p-6 max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
