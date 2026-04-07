import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'danger';

const variants: Record<BadgeVariant, string> = {
  success: 'bg-[#eef3ee] text-[#5a7d5f]',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-[#f8eced] text-[#a85060]',
};

export default function Badge({
  label,
  variant,
}: {
  label: string;
  variant: BadgeVariant;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant]
      )}
    >
      {label}
    </span>
  );
}
