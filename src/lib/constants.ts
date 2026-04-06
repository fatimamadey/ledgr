import { Category } from './types';

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Shopping',
  'Health',
  'Income',
  'Subscriptions',
  'Utilities',
  'Education',
  'Other',
];

export const CHART_COLORS = [
  '#6366f1', // indigo
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#0ea5e9', // sky
  '#a78bfa', // purple
  '#38bdf8', // light sky
  '#f43f5e', // rose
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ec4899', // pink
  '#14b8a6', // teal
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#6366f1',
  Transport: '#3b82f6',
  Housing: '#8b5cf6',
  Entertainment: '#0ea5e9',
  Shopping: '#a78bfa',
  Health: '#38bdf8',
  Income: '#10b981',
  Subscriptions: '#f43f5e',
  Utilities: '#f59e0b',
  Education: '#ec4899',
  Other: '#14b8a6',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍔',
  Transport: '🚗',
  Housing: '🏠',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Health: '💊',
  Income: '💰',
  Subscriptions: '📱',
  Utilities: '⚡',
  Education: '📚',
  Other: '📦',
};
