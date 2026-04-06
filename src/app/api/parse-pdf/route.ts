import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Dynamic import to avoid build-time issues with pdfjs-dist needing browser APIs
    const { PDFParse } = await import('pdf-parse');
    const pdf = new PDFParse({ data: uint8Array });
    const textResult = await pdf.getText();
    await pdf.destroy();

    const lines = textResult.text.split('\n').filter((line: string) => line.trim());

    const rows: { description: string; amount: string; date: string }[] = [];

    const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/;
    const amountPattern = /\$?([\d,]+\.\d{2})/;

    for (const line of lines) {
      const dateMatch = line.match(datePattern);
      const amountMatch = line.match(amountPattern);

      if (dateMatch && amountMatch) {
        const description = line
          .replace(datePattern, '')
          .replace(/\$?[\d,]+\.\d{2}/, '')
          .replace(/\s+/g, ' ')
          .trim();

        if (description.length > 1) {
          rows.push({
            date: dateMatch[1],
            amount: amountMatch[1].replace(/,/g, ''),
            description,
          });
        }
      }
    }

    return Response.json({ rows });
  } catch (error) {
    console.error('PDF parsing error:', error);
    return Response.json(
      { error: 'Failed to parse PDF. The file format may not be supported.' },
      { status: 500 }
    );
  }
}
