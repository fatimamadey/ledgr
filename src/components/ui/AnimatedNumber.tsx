'use client';

import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { formatCurrency } from '@/lib/utils';

export default function AnimatedNumber({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const animated = useAnimatedNumber(value);

  return <span className={className}>{formatCurrency(animated)}</span>;
}
