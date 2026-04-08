'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FileUploader({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-16 text-center transition-colors',
        isDragging
          ? 'border-accent bg-surface-hover'
          : 'border-border bg-surface hover:border-muted-light hover:bg-surface-hover'
      )}
    >
      <Upload size={28} className="text-muted-light" />
      <p className="mt-3 text-sm font-medium text-foreground">
        Drop your CSV here or click to browse
      </p>
      <p className="mt-1 text-xs text-muted">Accepts .csv bank statement exports</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
