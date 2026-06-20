import { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({ message, isOpen, onClose }: ToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border border-white/10 dark:border-white/5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl animate-slide-in"
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
        <Check className="w-4 h-4" />
      </div>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        {message}
      </p>
      <button
        onClick={onClose}
        type="button"
        className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
