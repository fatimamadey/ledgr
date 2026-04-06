@AGENTS.md

# Ledgr - Personal Financial Tracker

## Project Overview
Ledgr is a multi-page Next.js financial tracker app that lets users track transactions, debts, and budgets. Data lives entirely in client-side state (Zustand + localStorage). Deployed on Vercel.

## Tech Stack
- **Next.js 16** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS v4** — light mode clean theme (white/gray, indigo-600 accent)
- **Recharts** — charts with built-in animations
- **Zustand** — client-side state with `persist` middleware (localStorage)
- **papaparse** — CSV parsing (client-side)
- **pdf-parse v4** — PDF parsing (server-side via API route, uses PDFParse class API)

## Commands
- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint

## Routes
| Route | Description |
|---|---|
| `/` | Dashboard — summary cards, pie chart, bar chart, recent transactions |
| `/transactions` | Add/view/filter transactions |
| `/transactions/[id]` | Transaction detail with category chart and similar transactions |
| `/debts` | Debt tracker with progress bars and inline payments |
| `/budgets` | Monthly spending limits per category with auto-calculated progress |
| `/upload` | Import transactions from CSV or PDF bank statements |
| `/api/parse-pdf` | Server-side PDF parsing endpoint |

## Architecture
- **State**: Zustand store at `src/store/index.ts` with `persist` middleware. All derived data computed in `src/store/selectors.ts`.
- **Layout**: Sidebar navigation in root layout, `PageContainer` wrapper for consistent page structure.
- **Components**: Organized by feature (`dashboard/`, `transactions/`, `debts/`, `budgets/`, `upload/`, `ui/`).
- **Parsers**: CSV via papaparse (client-side), PDF via pdf-parse (server-side API route with dynamic import to avoid build issues with pdfjs-dist).

## Key Patterns
- `params` is a Promise in Next.js 15+ — use `use(params)` in client components, `await params` in server components.
- Recharts `Tooltip` formatter must use `(value) => formatCurrency(Number(value))` to avoid type errors.
- pdf-parse v4 uses `new PDFParse({ data })` class API, not the old `pdfParse(buffer)` function.
- `StoreProvider` wraps children and delays rendering until after hydration to prevent SSR/client mismatch.

## Categories
Food, Transport, Housing, Entertainment, Shopping, Health, Income, Subscriptions, Utilities, Education, Other

## Theme Colors
- Background: white / gray-50
- Surface: white / gray-100
- Text: gray-900 / gray-600
- Accent: indigo-600
- Income: emerald-500
- Expenses: red-500
- Charts: `['#6366f1', '#3b82f6', '#8b5cf6', '#0ea5e9', '#a78bfa', '#38bdf8']`
