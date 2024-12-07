import React from 'react';

interface PriceCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  change?: number;
}

export const PriceCard: React.FC<PriceCardProps> = ({ title, value, subValue, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <div className="text-2xl font-bold text-blue-600">{value}</div>
    {subValue && <div className="text-sm text-gray-600 mt-1">{subValue}</div>}
    {change !== undefined && (
      <div className={`text-sm mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
      </div>
    )}
  </div>
);