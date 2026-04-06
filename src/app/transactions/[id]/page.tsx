'use client';

import { use } from 'react';
import PageContainer from '@/components/layout/PageContainer';

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <PageContainer title="Transaction Detail" subtitle={`ID: ${id}`}>
      <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-24 text-gray-400">
        Transaction detail coming soon
      </div>
    </PageContainer>
  );
}
