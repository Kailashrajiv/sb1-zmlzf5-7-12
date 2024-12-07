import React from 'react';
import { ArrowsUpDown } from 'lucide-react';

export default function PriceSpreadCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
      border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
      transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Price Spread
          </h2>
          <p className="text-sm text-gray-500">MCX - LME</p>
        </div>
        <ArrowsUpDown className="w-6 h-6 text-blue-600" />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[64px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ₹10.00
        </span>
        <span className="text-xl text-gray-500">/kg</span>
      </div>
    </div>
  );
}