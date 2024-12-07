import React, { useState, useRef } from 'react';
import { Calculator } from 'lucide-react';

interface PriceCalculatorProps {
  className?: string;
}

export default function PriceCalculator({ className }: PriceCalculatorProps) {
  const [mcxPrice, setMcxPrice] = useState('243.75');
  const [mcxPremium, setMcxPremium] = useState('');
  const [mcxFreight, setMcxFreight] = useState('');
  
  const [lmePrice, setLmePrice] = useState('2639.50');
  const [lmePremium, setLmePremium] = useState('');
  const [lmeFreight, setLmeFreight] = useState('');
  
  const freightInputRef = useRef<HTMLInputElement>(null);

  const DUTY_FACTOR = 1.0825;
  const RBI_RATE = 84.4063;

  const handlePremiumKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, type: 'mcx' | 'lme') => {
    if (e.key === 'Enter' && freightInputRef.current) {
      freightInputRef.current.focus();
    }
  };

  const calculateMCXTotal = () => {
    const price = parseFloat(mcxPrice) || 0;
    const premium = parseFloat(mcxPremium) || 0;
    const freight = parseFloat(mcxFreight) || 0;
    return price + premium + freight;
  };

  const calculateLMETotal = () => {
    const price = parseFloat(lmePrice) || 0;
    const premium = parseFloat(lmePremium) || 0;
    const freight = parseFloat(lmeFreight) || 0;
    return (((price + premium) * DUTY_FACTOR * RBI_RATE) / 1000) + freight;
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${className}`}>
      {/* MCX Based Price */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-blue-100 h-[101.5%]">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            MCX Based Price
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MCX Aluminum Price (₹/kg)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="number"
                value={mcxPrice}
                onChange={(e) => setMcxPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter MCX price"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Premium (₹/kg)
            </label>
            <input
              type="number"
              value={mcxPremium}
              onChange={(e) => setMcxPremium(e.target.value)}
              onKeyPress={(e) => handlePremiumKeyPress(e, 'mcx')}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter premium"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Freight (₹/kg)
            </label>
            <input
              ref={freightInputRef}
              type="number"
              value={mcxFreight}
              onChange={(e) => setMcxFreight(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter freight"
            />
          </div>

          <div className="pt-4 border-t border-blue-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Price (per kg)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-white">₹</span>
              </div>
              <input
                type="text"
                value={calculateMCXTotal().toFixed(2)}
                disabled
                className="w-full pl-8 pr-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 rounded-lg font-bold text-white text-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* LME Based Price */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm p-6 border border-purple-100 h-[101.5%]">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calculator className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            LME Based Price
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LME Aluminum Price (USD/MT)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                value={lmePrice}
                onChange={(e) => setLmePrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter LME price"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Premium (USD/MT)
            </label>
            <input
              type="number"
              value={lmePremium}
              onChange={(e) => setLmePremium(e.target.value)}
              onKeyPress={(e) => handlePremiumKeyPress(e, 'lme')}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter premium"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Freight (₹/kg)
            </label>
            <input
              type="number"
              value={lmeFreight}
              onChange={(e) => setLmeFreight(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter freight"
            />
          </div>

          <div className="pt-4 border-t border-purple-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Price (per kg)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-white">₹</span>
              </div>
              <input
                type="text"
                value={calculateLMETotal().toFixed(2)}
                disabled
                className="w-full pl-8 pr-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 border-0 rounded-lg font-bold text-white text-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}