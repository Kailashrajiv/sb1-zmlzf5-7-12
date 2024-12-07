import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';
import { LMEHistoryData } from '../../types/market';

interface LMECashSettlementCardProps {
  data: LMEHistoryData;
  previousPrice?: number;
  rbiRate?: number;
  onCardClick?: () => void;
}

export default function LMECashSettlementCard({
  data,
  previousPrice,
  rbiRate = 84.4063,
  onCardClick
}: LMECashSettlementCardProps) {
  const changeUSD = previousPrice ? Math.abs(data.price - previousPrice) : 0;
  const changeINR = changeUSD * rbiRate;
  const isPositive = previousPrice ? data.price > previousPrice : false;
  const changePercent = previousPrice ? ((data.price - previousPrice) / previousPrice) * 100 : 0;

  return (
    <div 
      onClick={onCardClick}
      className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm 
        rounded-xl p-6 border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm text-gray-500">
          {format(new Date(data.date), 'MMM dd, yyyy')}
        </div>
        <div className="group relative">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <div className="absolute right-0 top-6 w-48 bg-white rounded-lg shadow-lg p-2 text-xs 
            text-gray-600 invisible group-hover:visible transition-all duration-200">
            Click for detailed market analysis
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
            bg-clip-text text-transparent">
            ${data.price.toFixed(2)}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{changePercent.toFixed(2)}%</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>USD Change</span>
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              ${changeUSD.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>INR Change</span>
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              ₹{changeINR.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}