import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { LMEHistoryData } from '../../types/market';

interface LMECashSettlementCardProps {
  data: LMEHistoryData;
  previousPrice?: number;
  rbiRate?: number;
}

export default function LMECashSettlementCard({
  data,
  previousPrice,
  rbiRate = 84.4063
}: LMECashSettlementCardProps) {
  const changeUSD = previousPrice ? Math.abs(data.price - previousPrice) : 0;
  const changeINR = changeUSD * rbiRate;
  const isPositive = previousPrice ? data.price > previousPrice : false;

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
      border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
      transition-all duration-300">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {format(new Date(data.date), 'MMM dd, yyyy')}
      </div>
      
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
        ${data.price.toFixed(2)}
      </div>
      
      <div className="space-y-2">
        <div className={`flex items-center gap-1 text-sm ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">${changeUSD.toFixed(2)}</span>
        </div>
        
        <div className={`flex items-center gap-1 text-sm ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
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
}