'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function FileUploader({
  onFileSelect,
  accept = '.csv,.pdf',
}: {
  onFileSelect: (file: File) => void;
  accept?: string;
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
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
      )}
    >
      <span className="text-4xl">📤</span>
      <p className="mt-3 text-sm font-medium text-gray-900">
        Drop your file here or click to browse
      </p>
      <p className="mt-1 text-xs text-gray-500">Supports CSV and PDF bank statements</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
