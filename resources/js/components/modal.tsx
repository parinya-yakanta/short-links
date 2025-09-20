import { ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#161615] rounded-lg shadow-lg p-6 max-w-md w-full">
        {children}
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-[#3E3E3A] dark:text-[#EDEDEC] cursor-pointer hover:dark:bg-[#62605b]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
