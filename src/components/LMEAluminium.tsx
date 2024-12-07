import React from 'react';
import { useLMEHistory } from '../hooks/useLMEHistory';

const PREMIUM_USD = 45; // Premium in USD
const DUTY_FACTOR = 1.0825; // Duty factor
const RBI_RATE = 84.4063; // RBI reference rate

export default function LMEAluminium() {
  const { data } = useLMEHistory();
  const basePrice = data?.[0]?.price || 2639.50;

  // Calculate price per kg in INR using the formula:
  // (LME Aluminum base price + Premium) * Duty Factor * RBI Rate / 1000
  const calculateINRPerKg = () => {
    const totalUSDPerMT = (basePrice + PREMIUM_USD) * DUTY_FACTOR;
    const totalINRPerMT = totalUSDPerMT * RBI_RATE;
    return totalINRPerMT / 1000;
  };

  const inrPerKg = calculateINRPerKg();
  const change = data?.[0]?.change || -16.00;
  const changePercent = ((change / basePrice) * 100) || -0.63;

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
      border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
      transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LME Aluminium
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Source: Investing.com</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 text-blue-600">
            $
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400">
            ₹
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[64px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${basePrice.toFixed(2)}
          </span>
          <span className="text-xl text-gray-500">per MT</span>
        </div>
        <div className="text-2xl text-red-500 mb-6">
          {change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100/50">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[64px] font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
            ₹{inrPerKg.toFixed(2)}
          </span>
          <span className="text-xl text-gray-500">per kg</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Includes premium (${PREMIUM_USD}/MT) & duty factor ({((DUTY_FACTOR - 1) * 100).toFixed(2)}%)
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="text-gray-500">Last updated: Live</span>
        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Live
        </span>
      </div>
    </div>
  );
}