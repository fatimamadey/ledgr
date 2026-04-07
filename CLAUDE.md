@AGENTS.md

# Ledgr - Personal Financial Tracker

## Project Overview
Ledgr is a multi-page Next.js financial tracker app that lets users track transactions, debts, and budgets. Data lives entirely in client-side state (Zustand + localStorage). Deployed on Vercel.

## Tech Stack
- **Next.js 16** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS v4** — light gray background, slate/blue-gray accents
- **Recharts** — charts with muted color palette and built-in animations
- **Zustand** — client-side state with `persist` middleware (localStorage)
- **papaparse** — CSV parsing (client-side)
- **lucide-react** — outlined icons (1px stroke)
- **sonner** — toast notifications
- **Roboto / Roboto Mono** — fonts via next/font/google

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Routes
| Route | Description |
|---|---|
| `/` | Dashboard — summary cards, spending carousel (6 months), bar chart, recent transactions |
| `/transactions` | Add/view/filter/search transactions, CSV import via modal |
| `/transactions/[id]` | Transaction detail with edit/delete, category chart, similar transactions |
| `/debts` | Debt tracker with progress bars, inline payments, delete confirmation |
| `/budgets` | Monthly spending limits per category with auto-calculated progress |

## Architecture
- **State**: Zustand store at `src/store/index.ts` with `persist` middleware. All derived data computed in `src/store/selectors.ts` using `useMemo`.
- **Layout**: Sidebar navigation (Lucide icons) in root layout, `PageContainer` wrapper for consistent page structure.
- **Components**: Organized by feature (`dashboard/`, `transactions/`, `debts/`, `budgets/`, `upload/`, `ui/`).
- **CSV Import**: Modal on transactions page. papaparse (client-side) → column mapper → preview with editable type/category → confirm.
- **Category Detection**: `src/lib/categorize.ts` keyword-matches descriptions to categories and income/expense type.
- **Toasts**: sonner `<Toaster />` in root layout. All actions show success feedback.
- **Confirmations**: `ConfirmDialog` component wraps all delete actions.

## Key Patterns
- `params` is a Promise in Next.js 15+ — use `use(params)` in client components.
- Recharts `Tooltip` formatter: `(value) => formatCurrency(Number(value))`.
- `StoreProvider` delays rendering until after hydration to prevent SSR/client mismatch.
- Date labels use `new Date(year, month-1, 1)` (local time) to avoid timezone bugs with `new Date('YYYY-MM-01')` (UTC).

## Categories
Food, Transport, Housing, Entertainment, Shopping, Health, Income, Subscriptions, Utilities, Education, Other

## Theme
- **Font**: Roboto (300/400/500/700)
- **Icons**: lucide-react (outlined, 1px stroke)
- **Background**: gray-100
- **Surface**: white
- **Text**: slate-900 / gray-500
- **Accent**: slate-700 (buttons, active nav, focus rings)
- **Income**: emerald-600
- **Expenses**: red-500
- **Charts**: muted palette `['#64748b', '#6b8aad', '#8b9fba', '#a3b8cc', '#7c9885', '#b0a090']`
