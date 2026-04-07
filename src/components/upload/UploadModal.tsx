'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import FileUploader from '@/components/upload/FileUploader';
import CsvColumnMapper from '@/components/upload/CsvColumnMapper';
import TransactionPreview from '@/components/upload/TransactionPreview';
import { parseCsvFile, CsvParseResult } from '@/lib/parsers/csv';
import { ColumnMapping, ParsedTransaction, Category, TransactionType } from '@/lib/types';
import { detectCategory, detectTransactionType } from '@/lib/categorize';
import { useLedgrStore } from '@/store';

type Step = 'upload' | 'map' | 'preview' | 'done';

export default function UploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const addTransactions = useLedgrStore((s) => s.addTransactions);
  const [step, setStep] = useState<Step>('upload');
  const [csvData, setCsvData] = useState<CsvParseResult | null>(null);
  const [parsedTransactions, setParsedTransactions] = useState<ParsedTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const reset = () => {
    setStep('upload');
    setCsvData(null);
    setParsedTransactions([]);
    setError(null);
    setImportedCount(0);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    setLoading(true);

    try {
      if (!file.name.endsWith('.csv')) {
        setError('Please upload a .csv file.');
        return;
      }
      const result = await parseCsvFile(file);
      setCsvData(result);
      setStep('map');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setLoading(false);
    }
  };

  const handleMapping = (mapping: ColumnMapping) => {
    if (!csvData) return;

    const transactions: ParsedTransaction[] = csvData.rows.reduce<ParsedTransaction[]>(
      (acc, row) => {
        const rawAmount = row[mapping.amount!] ?? '';
        const amount = parseFloat(rawAmount.replace(/[$,]/g, ''));
        if (isNaN(amount)) return acc;

        const description = row[mapping.description!] ?? 'Unknown';
        const type = detectTransactionType(description, amount);
        const category = detectCategory(description);

        acc.push({
          description,
          amount: Math.abs(amount),
          date: normalizeDate(row[mapping.date!] ?? ''),
          category,
          type,
          selected: true,
        });
        return acc;
      },
      []
    );

    setParsedTransactions(transactions);
    setStep('preview');
  };

  const handleToggle = (index: number) => {
    setParsedTransactions((prev) =>
      prev.map((t, i) => (i === index ? { ...t, selected: !t.selected } : t))
    );
  };

  const handleUpdate = (index: number, field: 'category' | 'type', value: string) => {
    setParsedTransactions((prev) =>
      prev.map((t, i) => {
        if (i !== index) return t;
        if (field === 'category') return { ...t, category: value as Category };
        return { ...t, type: value as TransactionType };
      })
    );
  };

  const handleConfirm = () => {
    const selected = parsedTransactions.filter((t) => t.selected);
    addTransactions(
      selected.map(({ selected: _, ...rest }) => rest)
    );
    setImportedCount(selected.length);
    setStep('done');
  };

  const stepLabel = (s: Step, current: Step) =>
    s === current ? 'text-slate-700 font-medium' : 'text-gray-400';

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Import from CSV"
      wide={step === 'preview'}
    >
      {/* Step indicator */}
      <div className="mb-5 flex items-center gap-2 text-xs">
        <span className={stepLabel('upload', step)}>Upload</span>
        <span className="text-gray-300">→</span>
        <span className={stepLabel('map', step)}>Map Columns</span>
        <span className="text-gray-300">→</span>
        <span className={stepLabel('preview', step)}>Preview</span>
        <span className="text-gray-300">→</span>
        <span className={stepLabel('done', step)}>Done</span>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-3 py-12">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-transparent" />
          <span className="text-sm text-gray-500">Parsing CSV...</span>
        </div>
      )}

      {step === 'upload' && !loading && (
        <FileUploader onFileSelect={handleFileSelect} />
      )}

      {step === 'map' && csvData && (
        <CsvColumnMapper headers={csvData.headers} onMapping={handleMapping} />
      )}

      {step === 'preview' && (
        <div>
          <p className="mb-3 text-xs text-gray-500">
            We auto-detected categories and types from descriptions. You can adjust each row before importing.
          </p>
          <TransactionPreview
            transactions={parsedTransactions}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onConfirm={handleConfirm}
            onCancel={reset}
          />
        </div>
      )}

      {step === 'done' && (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-900">
            {importedCount} transaction{importedCount !== 1 ? 's' : ''} imported!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Your transactions have been added.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={reset}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Upload Another
            </button>
            <button
              onClick={handleClose}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function normalizeDate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  const cleaned = dateStr.trim();

  const mdyMatch = cleaned.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (mdyMatch) {
    const [, m, d, y] = mdyMatch;
    const year = y.length === 2 ? '20' + y : y;
    return `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned;
  return new Date().toISOString().split('T')[0];
}
