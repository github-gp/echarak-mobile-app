import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'primary' | 'secondary';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    primary: 'bg-orange-100 text-orange-800',
    secondary: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={cn('px-2 py-1 text-xs font-medium rounded-full', variants[variant], className)}>
      {children}
    </span>
  );
}

