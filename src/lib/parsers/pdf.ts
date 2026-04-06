export interface PdfParseResult {
  rows: { description: string; amount: string; date: string }[];
}

export async function parsePdfFile(file: File): Promise<PdfParseResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/parse-pdf', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'PDF parsing failed');
  }

  return response.json();
}
