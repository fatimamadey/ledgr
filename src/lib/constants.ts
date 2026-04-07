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
  '#8b7355', // warm brown
  '#a08b6e', // tan
  '#b5a48a', // sand
  '#c4b8a0', // khaki
  '#7b8f7b', // sage
  '#9c7b7b', // dusty rose
  '#7a8a8a', // muted teal
  '#a09078', // clay
  '#8a7a6a', // walnut
  '#9b8b78', // taupe
  '#7b8570', // olive
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#8b7355',
  Transport: '#7a8a8a',
  Housing: '#a08b6e',
  Entertainment: '#9c7b7b',
  Shopping: '#b5a48a',
  Health: '#7b8f7b',
  Income: '#6b8f71',
  Subscriptions: '#a09078',
  Utilities: '#8a7a6a',
  Education: '#9b8b78',
  Other: '#c4b8a0',
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
