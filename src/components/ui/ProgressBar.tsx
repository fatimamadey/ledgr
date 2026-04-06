import { cn } from '@/lib/utils';

export default function ProgressBar({
  percentage,
  color = 'bg-indigo-600',
  className,
}: {
  percentage: number;
  color?: string;
  className?: string;
}) {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={cn('h-2.5 w-full overflow-hidden rounded-full bg-gray-100', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-700 ease-out', color)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
