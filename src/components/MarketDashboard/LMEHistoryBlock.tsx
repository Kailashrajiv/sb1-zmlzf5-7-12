import React from 'react';
import { AlertCircle } from 'lucide-react';
import { LMEHistoryData } from '../../types/market';
import LMECashSettlementCard from './LMECashSettlementCard';

interface LMEHistoryBlockProps {
  data: LMEHistoryData[];
  loading: boolean;
  error: string | null;
}

export default function LMEHistoryBlock({ data, loading, error }: LMEHistoryBlockProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-red-500 gap-2">
        <AlertCircle className="w-8 h-8" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <LMECashSettlementCard
          key={item.date}
          data={item}
          previousPrice={index < data.length - 1 ? data[index + 1].price : undefined}
        />
      ))}
    </div>
  );
}