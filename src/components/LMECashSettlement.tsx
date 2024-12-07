import React from 'react';
import { TrendingDown, TrendingUp, Loader2 } from 'lucide-react';
import { useLMEHistory } from '../hooks/useLMEHistory';

export default function LMECashSettlement() {
  const { data, loading } = useLMEHistory();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {data.map((item) => (
        <div 
          key={item.date}
          className="flex-none w-[250px] bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${item.price.toFixed(2)}
            </span>
            {item.change !== 0 && (
              <span className={`flex items-center text-sm ${
                item.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {item.change > 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                ${Math.abs(item.change).toFixed(2)}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            LME Cash Settlement
          </div>
        </div>
      ))}
    </div>
  );
}