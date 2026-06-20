import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'glass' | 'flat' | 'glow';
  className?: string;
}

export function Card({ children, variant = 'glass', className = '', ...props }: CardProps) {
  const baseStyle = 'rounded-3xl transition-all duration-300 overflow-hidden';
  
  const variantStyles = {
    glass: 'bg-white/75 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-gray-200/30 dark:shadow-black/40 border border-gray-200/50 dark:border-white/10',
    flat: 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 shadow-md',
    glow: 'relative border border-brand-500/20 dark:border-brand-500/30 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-brand-500/5 dark:shadow-brand-500/10 hover:border-brand-500/40 dark:hover:border-brand-500/50 transition-all duration-500'
  };

  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
