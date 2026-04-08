'use client';

import { useState, useEffect } from 'react';
import { ColumnMapping } from '@/lib/types';
function autoDetectColumn(headers: string[], keywords: string[]): string | null {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const kw of keywords) {
    const idx = lower.findIndex((h) => h.includes(kw));
    if (idx >= 0) return headers[idx];
  }
  return null;
}

export default function CsvColumnMapper({
  headers,
  onMapping,
}: {
  headers: string[];
  onMapping: (mapping: ColumnMapping) => void;
}) {
  const [mapping, setMapping] = useState<ColumnMapping>({
    description: null,
    amount: null,
    date: null,
  });

  useEffect(() => {
    const auto: ColumnMapping = {
      description: autoDetectColumn(headers, ['description', 'memo', 'name', 'payee', 'merchant']),
      amount: autoDetectColumn(headers, ['amount', 'total', 'sum', 'value']),
      date: autoDetectColumn(headers, ['date', 'posted', 'transaction date']),
    };
    setMapping(auto);
  }, [headers]);

  const fields: { key: keyof ColumnMapping; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount' },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div>
      <p className="mb-4 text-xs text-muted">
        Match your CSV columns to the fields below. We auto-detected what we could.
      </p>
      <div className="space-y-3">
        {fields.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-28 text-sm font-medium text-foreground">{label}</label>
            <select
              value={mapping[key] ?? ''}
              onChange={(e) => setMapping({ ...mapping, [key]: e.target.value || null })}
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm bg-surface text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="">-- Select column --</option>
              {headers.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        onClick={() => onMapping(mapping)}
        disabled={!mapping.description || !mapping.amount || !mapping.date}
        className="mt-4 w-full rounded-lg bg-[#5c6b5c] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4d5c4d] disabled:bg-border disabled:cursor-not-allowed"
      >
        Apply Mapping
      </button>
    </div>
  );
}
