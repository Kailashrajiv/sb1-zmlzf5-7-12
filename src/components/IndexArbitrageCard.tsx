import React from 'react';
import { TrendingUp, TrendingDown, ArrowLeftRight } from 'lucide-react';
import { useMCXPrice } from '../hooks/useMCXPrice';
import { useLMEHistory } from '../hooks/useLMEHistory';
import { useRBIRate } from '../hooks/useRBIRate';

export default function IndexArbitrageCard() {
  const mcxPrice = 241.45; // Fixed value as requested
  const lmePrice = 2587.5; // Fixed value as requested
  const rbiRate = 84.4708; // Fixed value as requested

  const PREMIUM_USD = 45; // Premium in USD/MT
  const DUTY_FACTOR = 1.0825; // Duty factor (8.25%)

  // Calculate LME price in INR/kg
  const calculateLMEPriceInINR = () => {
    const totalUSDPerMT = (lmePrice + PREMIUM_USD) * DUTY_FACTOR;
    return (totalUSDPerMT * rbiRate) / 1000; // Convert to INR/kg
  };

  const lmePriceInINR = calculateLMEPriceInINR();
  const arbitrage = mcxPrice - lmePriceInINR;
  const arbitragePercent = (arbitrage / lmePriceInINR) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
      border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
      transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Index Arbitrage
          </h2>
          <p className="text-sm text-gray-500">MCX vs LME</p>
        </div>
        <ArrowLeftRight className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">MCX Price</div>
            <div className="text-xl font-bold text-gray-800">₹{mcxPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">LME Price (INR)</div>
            <div className="text-xl font-bold text-gray-800">₹{lmePriceInINR.toFixed(2)}</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[40px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{Math.abs(arbitrage).toFixed(2)}
            </span>
            <span className="text-gray-500">/kg</span>
          </div>
          
          <div className="flex items-center gap-1">
            {arbitrage > 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={`text-lg font-medium ${
              arbitrage > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {Math.abs(arbitragePercent).toFixed(2)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">
              {arbitrage > 0 ? 'Premium' : 'Discount'}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          * Includes duty factor ({((DUTY_FACTOR - 1) * 100).toFixed(2)}%) and premium (${PREMIUM_USD}/MT)
        </div>
      </div>
    </div>
  );
}