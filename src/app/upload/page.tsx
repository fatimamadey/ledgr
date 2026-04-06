'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import FileUploader from '@/components/upload/FileUploader';
import CsvColumnMapper from '@/components/upload/CsvColumnMapper';
import TransactionPreview from '@/components/upload/TransactionPreview';
import Card from '@/components/ui/Card';
import { parseCsvFile, CsvParseResult } from '@/lib/parsers/csv';
import { parsePdfFile } from '@/lib/parsers/pdf';
import { ColumnMapping, ParsedTransaction } from '@/lib/types';
import { useLedgrStore } from '@/store';

type Step = 'upload' | 'map' | 'preview' | 'done';

export default function UploadPage() {
  const addTransactions = useLedgrStore((s) => s.addTransactions);
  const [step, setStep] = useState<Step>('upload');
  const [csvData, setCsvData] = useState<CsvParseResult | null>(null);
  const [parsedTransactions, setParsedTransactions] = useState<ParsedTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [importedCount, setImportedCount] = useState(0);

  const handleFileSelect = async (file: File) => {
    setError(null);
    setLoading(true);

    try {
      if (file.name.endsWith('.csv')) {
        const result = await parseCsvFile(file);
        setCsvData(result);
        setStep('map');
      } else if (file.name.endsWith('.pdf')) {
        const result = await parsePdfFile(file);
        const transactions: ParsedTransaction[] = result.rows.map((row) => {
          const amount = parseFloat(row.amount);
          return {
            description: row.description,
            amount: Math.abs(amount),
            date: normalizeDate(row.date),
            category: 'Other',
            type: amount < 0 ? 'expense' : 'expense',
            selected: true,
          };
        });
        setParsedTransactions(transactions);
        setStep('preview');
      } else {
        setError('Unsupported file type. Please upload a CSV or PDF file.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setLoading(false);
    }
  };

  const handleMapping = (mapping: ColumnMapping) => {
    if (!csvData) return;

    const transactions: ParsedTransaction[] = csvData.rows
      .reduce<ParsedTransaction[]>((acc, row) => {
        const rawAmount = row[mapping.amount!] ?? '';
        const amount = parseFloat(rawAmount.replace(/[$,]/g, ''));
        if (isNaN(amount)) return acc;

        acc.push({
          description: row[mapping.description!] ?? 'Unknown',
          amount: Math.abs(amount),
          date: normalizeDate(row[mapping.date!] ?? ''),
          category: 'Other',
          type: 'expense',
          selected: true,
        });
        return acc;
      }, []);

    setParsedTransactions(transactions);
    setStep('preview');
  };

  const handleToggle = (index: number) => {
    setParsedTransactions((prev) =>
      prev.map((t, i) => (i === index ? { ...t, selected: !t.selected } : t))
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

  const reset = () => {
    setStep('upload');
    setCsvData(null);
    setParsedTransactions([]);
    setError(null);
    setImportedCount(0);
  };

  return (
    <PageContainer title="Upload Statement" subtitle="Import transactions from a bank statement">
      <div className="max-w-2xl space-y-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className={step === 'upload' ? 'text-indigo-600 font-medium' : ''}>Upload</span>
          <span>→</span>
          <span className={step === 'map' ? 'text-indigo-600 font-medium' : ''}>Map</span>
          <span>→</span>
          <span className={step === 'preview' ? 'text-indigo-600 font-medium' : ''}>Preview</span>
          <span>→</span>
          <span className={step === 'done' ? 'text-indigo-600 font-medium' : ''}>Done</span>
        </div>

        {error && (
          <Card>
            <div className="flex items-center gap-2 text-sm text-red-600">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </Card>
        )}

        {loading && (
          <Card>
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <span className="text-sm text-gray-500">Parsing file...</span>
            </div>
          </Card>
        )}

        {step === 'upload' && !loading && <FileUploader onFileSelect={handleFileSelect} />}

        {step === 'map' && csvData && (
          <CsvColumnMapper headers={csvData.headers} onMapping={handleMapping} />
        )}

        {step === 'preview' && (
          <TransactionPreview
            transactions={parsedTransactions}
            onToggle={handleToggle}
            onConfirm={handleConfirm}
            onCancel={reset}
          />
        )}

        {step === 'done' && (
          <Card>
            <div className="py-8 text-center">
              <span className="text-4xl">✅</span>
              <p className="mt-3 text-lg font-semibold text-gray-900">
                {importedCount} transaction{importedCount !== 1 ? 's' : ''} imported!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Your transactions have been added to your account.
              </p>
              <button
                onClick={reset}
                className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Upload Another
              </button>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}

function normalizeDate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];

  // Try common formats
  const cleaned = dateStr.trim();

  // MM/DD/YYYY or MM-DD-YYYY
  const mdyMatch = cleaned.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (mdyMatch) {
    const [, m, d, y] = mdyMatch;
    const year = y.length === 2 ? '20' + y : y;
    return `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }

  // YYYY-MM-DD already correct
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) return cleaned;

  return new Date().toISOString().split('T')[0];
}
