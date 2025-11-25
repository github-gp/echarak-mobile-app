import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'primary' | 'secondary';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    primary: 'bg-blue-100 text-blue-800 border border-blue-200',
    secondary: 'bg-slate-100 text-slate-800 border border-slate-200',
  };

  return (
    <span className={cn('px-2.5 py-1 text-xs font-semibold rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}
