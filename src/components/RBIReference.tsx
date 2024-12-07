import React from 'react';
import { useRBIRate } from '../hooks/useRBIRate';
import { format } from 'date-fns';

export default function RBIReference() {
  const { rate, lastUpdated, loading } = useRBIRate();

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
      border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
      transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RBI Reference Rate
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Source: ceicdata.com</p>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-500 text-2xl">$</span>
        <span className="text-2xl text-gray-700 dark:text-gray-300">1</span>
        <span className="text-2xl text-gray-700 dark:text-gray-300">=</span>
        <span className="text-blue-500 text-2xl">₹</span>
        <span className={`font-mono text-[64px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
          loading ? 'animate-pulse' : ''
        }`}>
          {rate.toFixed(4)}
        </span>
      </div>

      <div className="text-gray-500 dark:text-gray-400 mb-4">
        {format(lastUpdated, 'dd MMM yyyy')}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-500 dark:text-gray-400">
          Last updated: {format(lastUpdated, 'hh:mm a')} IST
        </span>
        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          Daily
        </span>
      </div>
    </div>
  );
}