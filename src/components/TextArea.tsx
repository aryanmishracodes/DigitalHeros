import { useRef, forwardRef } from 'react';
import type { TextareaHTMLAttributes, RefObject } from 'react';
import { useTextAreaResize } from '../hooks/useTextAreaResize';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  error?: string;
  maxLength?: number;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, value, error, maxLength, helperText, className = '', ...props }, ref) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as RefObject<HTMLTextAreaElement | null>) || localRef;

    useTextAreaResize(resolvedRef, value);

    const characterCount = value.length;

    return (
      <div className="flex flex-col w-full gap-1.5">
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
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
        <div className="relative">
          <textarea
            ref={resolvedRef}
            value={value}
            maxLength={maxLength}
            className={`w-full px-4 py-3 rounded-2xl border bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm outline-none transition-all duration-300 resize-none overflow-hidden text-gray-800 dark:text-gray-250 placeholder-gray-400 dark:placeholder-gray-500 font-sans text-sm focus:bg-white dark:focus:bg-slate-950/80 focus:ring-4 ${
              error
                ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/10'
                : 'border-gray-200/80 dark:border-gray-800/80 focus:border-brand-500 focus:ring-brand-500/10 dark:focus:border-brand-400 dark:focus:ring-brand-400/10'
            } ${className}`}
            {...props}
          />
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
