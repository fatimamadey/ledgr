import { cn } from '@/lib/utils';

export default function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface p-6 shadow-sm',
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
}
