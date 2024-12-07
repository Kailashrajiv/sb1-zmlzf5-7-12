import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LMEHistoryData } from '../types/market';

interface LMEHistoryCardProps {
  data: LMEHistoryData;
  previousDayPrice?: number;
  rbiRate?: number;
}

export const LMEHistoryCard: React.FC<LMEHistoryCardProps> = ({ 
  data, 
  previousDayPrice,
  rbiRate = 84.4063 
}) => {
  const changeUSD = previousDayPrice ? Math.abs(data.price - previousDayPrice) : 0;
  const changeINR = changeUSD * rbiRate;
  const isPositive = previousDayPrice ? data.price > previousDayPrice : false;

  return (
    <div className="premium-card p-4 dark:bg-gray-800/50">
      <div className="text-sm text-gray-500 dark:text-gray-400">{data.date}</div>
      <div className="text-2xl font-bold gradient-text font-mono mb-2">
        ${data.price.toFixed(2)}
      </div>
      <div className="space-y-1">
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">${changeUSD.toFixed(2)}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">₹{changeINR.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};