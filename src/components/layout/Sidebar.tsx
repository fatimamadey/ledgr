'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, FileText, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLedgrStore } from '@/store';
import { generateSeedTransactions, generateSeedDebts, generateSeedBudgets } from '@/lib/seed';

function SeedDataButtons() {
  const transactions = useLedgrStore((s) => s.transactions);
  const addTransactions = useLedgrStore((s) => s.addTransactions);
  const addDebt = useLedgrStore((s) => s.addDebt);
  const setBudget = useLedgrStore((s) => s.setBudget);

  const loadSeed = () => {
    addTransactions(generateSeedTransactions());
    generateSeedDebts().forEach((d) => addDebt(d));
    generateSeedBudgets().forEach((b) => setBudget(b));
    toast.success('Sample data loaded');
  };

  const clearAll = () => {
    useLedgrStore.setState({ transactions: [], debts: [], budgets: [] });
    toast.success('All data cleared');
  };

  return (
    <div className="space-y-1">
      {transactions.length === 0 && (
        <button
          onClick={loadSeed}
          className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#6b7b6b] hover:bg-[#e8ece8]"
        >
          Load Sample Data
        </button>
      )}
      {transactions.length > 0 && (
        <button
          onClick={clearAll}
          className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-400 hover:bg-[#f8eced] hover:text-[#b8606d]"
        >
          Clear All Data
        </button>
      )}
    </div>
  );
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/debts', label: 'Debts', icon: FileText },
  { href: '/budgets', label: 'Budgets', icon: Target },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-md lg:hidden"
      >
        <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
          <span className="text-2xl font-bold tracking-tight text-[#4d5c4d]">Ledgr</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive(item.href)
                    ? 'bg-[#e8ece8] text-[#3d4a3d]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                )}
              >
                <Icon size={18} strokeWidth={isActive(item.href) ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 px-4 py-4 space-y-2">
          <SeedDataButtons />
          <p className="text-xs text-gray-300 px-2">Ledgr v1.0</p>
        </div>
      </aside>
    </>
  );
}
