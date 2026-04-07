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
  '#64748b', // slate
  '#6b8aad', // steel blue
  '#8b9fba', // light steel
  '#a3b8cc', // powder
  '#7c9885', // sage
  '#b0a090', // tan
  '#8b7bab', // muted purple
  '#6b9e9e', // muted teal
  '#a0855b', // muted amber
  '#b07b7b', // muted rose
  '#7b9a6b', // muted green
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#64748b',
  Transport: '#6b8aad',
  Housing: '#8b9fba',
  Entertainment: '#a3b8cc',
  Shopping: '#7c9885',
  Health: '#6b9e9e',
  Income: '#7b9a6b',
  Subscriptions: '#b07b7b',
  Utilities: '#b0a090',
  Education: '#8b7bab',
  Other: '#a0855b',
};

export const CATEGORY_ICON_NAMES: Record<Category, string> = {
  Food: 'Utensils',
  Transport: 'Car',
  Housing: 'Home',
  Entertainment: 'Film',
  Shopping: 'ShoppingBag',
  Health: 'Heart',
  Income: 'Wallet',
  Subscriptions: 'Repeat',
  Utilities: 'Zap',
  Education: 'BookOpen',
  Other: 'Package',
};
