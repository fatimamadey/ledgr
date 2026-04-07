'use client';

import {
  Utensils,
  Car,
  Home,
  Film,
  ShoppingBag,
  Heart,
  Wallet,
  Repeat,
  Zap,
  BookOpen,
  Package,
} from 'lucide-react';
import { Category } from '@/lib/types';

const iconMap: Record<Category, React.ElementType> = {
  Food: Utensils,
  Transport: Car,
  Housing: Home,
  Entertainment: Film,
  Shopping: ShoppingBag,
  Health: Heart,
  Income: Wallet,
  Subscriptions: Repeat,
  Utilities: Zap,
  Education: BookOpen,
  Other: Package,
};

export default function CategoryIcon({
  category,
  size = 16,
  className = 'text-gray-500',
}: {
  category: Category;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[category] ?? Package;
  return <Icon size={size} className={className} />;
}
