import React, { useState } from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import { LMEPriceData } from '../../types/market';

interface PriceAlertBoxProps {
  type: 'MCX' | 'LME';
  currentPrice: number;
  onCreateAlert: (upperLimit: number, lowerLimit: number) => void;
}

export default function PriceAlertBox({ type, currentPrice, onCreateAlert }: PriceAlertBoxProps) {
  const [upperLimit, setUpperLimit] = useState<string>('');
  const [lowerLimit, setLowerLimit] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateAndSubmit = () => {
    const upper = parseFloat(upperLimit);
    const lower = parseFloat(lowerLimit);

    if (isNaN(upper) && isNaN(lower)) {
      setError('Please set at least one price limit');
      return;
    }

    if (!isNaN(upper) && !isNaN(lower) && upper <= lower) {
      setError('Upper limit must be greater than lower limit');
      return;
    }

    setError('');
    onCreateAlert(upper, lower);
    setUpperLimit('');
    setLowerLimit('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm 
      rounded-xl p-6 border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] 
      hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {type} Price Alert
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          Current: {type === 'LME' ? '$' : '₹'}{currentPrice.toFixed(2)}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upper Limit
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {type === 'LME' ? '$' : '₹'}
            </span>
            <input
              type="number"
              value={upperLimit}
              onChange={(e) => setUpperLimit(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder="Enter upper limit"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lower Limit
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {type === 'LME' ? '$' : '₹'}
            </span>
            <input
              type="number"
              value={lowerLimit}
              onChange={(e) => setLowerLimit(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                focus:ring-blue-500 focus:border-transparent bg-white"
              placeholder="Enter lower limit"
              step="0.01"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={validateAndSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 
            rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
            shadow-md hover:shadow-lg"
        >
          Set Alert
        </button>
      </div>
    </div>
  );
}