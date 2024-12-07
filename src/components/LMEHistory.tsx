import React from 'react';
import { useLMEHistory } from '../hooks/useLMEHistory';

export default function LMEHistory() {
  const { data, loading, error } = useLMEHistory();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-pulse text-gray-600">Loading LME history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map((item) => (
        <div 
          key={item.date}
          className="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          <div className="text-sm text-gray-600">{item.date}</div>
          <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
          {item.change !== 0 && (
            <div className={`text-sm ${item.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
}