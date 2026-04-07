import { Category, TransactionType } from './types';

const KEYWORD_MAP: [string[], Category][] = [
  // Food
  [['grocery', 'groceries', 'whole foods', 'trader joe', 'safeway', 'kroger', 'aldi',
    'food', 'restaurant', 'pizza', 'burger',
    'starbucks', 'coffee', 'cafe', 'mcdonald', 'chipotle', 'taco', 'sushi',
    'doordash', 'grubhub', 'uber eats', 'ubereats', 'postmates', 'dinner',
    'lunch', 'breakfast', 'bakery', 'deli'], 'Food'],

  // Transport
  [['uber ride', 'lyft', 'taxi', 'gas station', 'shell', 'chevron', 'exxon',
    'parking', 'toll', 'transit', 'metro', 'subway', 'airline',
    'flight', 'amtrak', 'car wash'], 'Transport'],

  // Housing
  [['rent', 'mortgage', 'lease', 'hoa', 'property tax', 'home insurance',
    'apartment', 'landlord'], 'Housing'],

  // Entertainment
  [['netflix', 'hulu', 'disney+', 'disney plus', 'hbo', 'movie', 'cinema',
    'theater', 'concert', 'ticket', 'gaming', 'steam', 'playstation', 'xbox',
    'spotify', 'apple music', 'youtube premium'], 'Entertainment'],

  // Shopping
  [['amazon', 'target', 'walmart', 'best buy', 'costco', 'ebay', 'etsy',
    'nike', 'adidas', 'clothing', 'shoes', 'apparel', 'mall',
    'shopping', 'purchase', 'order'], 'Shopping'],

  // Health
  [['pharmacy', 'cvs', 'walgreens', 'doctor', 'hospital', 'medical', 'dental',
    'dentist', 'vision', 'eye', 'gym', 'fitness', 'health', 'therapy',
    'prescription', 'insurance premium'], 'Health'],

  // Subscriptions
  [['subscription', 'membership', 'recurring', 'monthly fee', 'annual fee',
    'icloud', 'dropbox', 'adobe', 'microsoft 365', 'chatgpt', 'openai'], 'Subscriptions'],

  // Utilities
  [['electric', 'electricity', 'water bill', 'gas bill', 'internet', 'wifi',
    'comcast', 'verizon', 'at&t', 'att', 't-mobile', 'phone bill', 'utility',
    'utilities', 'sewage', 'trash'], 'Utilities'],

  // Education
  [['tuition', 'university', 'college', 'school', 'course', 'udemy', 'coursera',
    'textbook', 'book', 'education', 'student', 'loan payment'], 'Education'],

  // Income keywords (for type detection, not category)
  [['salary', 'paycheck', 'direct deposit', 'payroll', 'freelance', 'payment received',
    'refund', 'reimbursement', 'dividend', 'interest earned', 'bonus', 'commission',
    'venmo received', 'zelle received', 'cash back', 'cashback'], 'Income'],
];

export function detectCategory(description: string): Category {
  const lower = description.toLowerCase();
  for (const [keywords, category] of KEYWORD_MAP) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return category;
    }
  }
  return 'Other';
}

export function detectTransactionType(
  description: string,
  amount: number
): TransactionType {
  // If amount is positive (credit), likely income
  if (amount > 0) {
    return 'income';
  }

  // Check description for income keywords
  const lower = description.toLowerCase();
  const incomeKeywords = ['salary', 'paycheck', 'direct deposit', 'payroll', 'freelance',
    'refund', 'reimbursement', 'dividend', 'interest earned', 'bonus',
    'commission', 'payment received', 'cash back', 'cashback'];
  for (const kw of incomeKeywords) {
    if (lower.includes(kw)) return 'income';
  }

  return 'expense';
}
