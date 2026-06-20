import { useRef, forwardRef } from 'react';
import type { TextareaHTMLAttributes, RefObject, ReactNode } from 'react';
import { useTextAreaResize } from '../hooks/useTextAreaResize';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  error?: string;
  maxLength?: number;
  helperText?: string;
  onClear?: () => void;
  icon?: ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, value, error, maxLength, helperText, onClear, icon, className = '', ...props }, ref) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as RefObject<HTMLTextAreaElement | null>) || localRef;

    useTextAreaResize(resolvedRef, value);

    const characterCount = value.length;

    return (
      <div className="flex flex-col w-full gap-1.5">
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            {icon && <span className="text-brand-500 dark:text-brand-400">{icon}</span>}
            {label}
          </label>
          {maxLength && (
            <span
              className={`text-xs ${
                characterCount > maxLength * 0.9
                  ? 'text-rose-500 font-bold'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              {characterCount} / {maxLength}
            </span>
          )}
        </div>
        <div className="relative group">
          <textarea
            ref={resolvedRef}
            value={value}
            maxLength={maxLength}
            className={`w-full pr-10 px-4 py-3 rounded-2xl border bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm outline-none transition-all duration-300 resize-none overflow-hidden text-slate-800 dark:text-slate-100 placeholder-gray-450 dark:placeholder-gray-500 font-sans text-sm focus:bg-white dark:focus:bg-slate-950/80 focus:ring-4 ${
              error
                ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10'
                : 'border-gray-200/80 dark:border-gray-800/80 focus:border-brand-500 focus:ring-brand-500/10 dark:focus:border-brand-400 dark:focus:ring-brand-400/10'
            } ${className}`}
            {...props}
          />
          {onClear && value.length > 0 && (
            <button
              onClick={onClear}
              type="button"
              className="absolute right-3.5 top-3 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              title={`Clear ${label}`}
              aria-label={`Clear ${label}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {error ? (
          <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 px-1 animate-slide-in">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 px-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
