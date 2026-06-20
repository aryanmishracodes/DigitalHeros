import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'glow' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle = 'inline-flex items-center justify-center font-display font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none select-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  const variantStyles = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20 dark:shadow-brand-600/10 focus:ring-4 focus:ring-brand-500/20 dark:focus:ring-brand-400/20 border border-brand-500/10',
    secondary: 'bg-white/40 dark:bg-gray-900/40 hover:bg-gray-100/60 dark:hover:bg-gray-800/80 border border-gray-200/80 dark:border-gray-800/80 text-gray-700 dark:text-gray-200 focus:ring-4 focus:ring-gray-500/10',
    glow: 'bg-gradient-to-r from-brand-500 to-fuchsia-600 hover:from-brand-400 hover:to-fuchsia-500 text-white shadow-xl shadow-brand-500/25 dark:shadow-brand-500/10 focus:ring-4 focus:ring-brand-500/20',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 focus:ring-4 focus:ring-rose-500/10'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </button>
  );
}
