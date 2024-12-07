import React from 'react';

export default function LMEPrice() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">LME Aluminium</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50">
            $
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full">
            ₹
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-blue-500">$2514.00</span>
            <span className="text-gray-500">per MT</span>
          </div>
          <div className="text-red-500 text-xl">-16.00 (-0.63%)</div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-baseline gap-2">
            <span className="text-[32px] font-bold text-green-500">₹232.70</span>
            <span className="text-gray-500">per kg</span>
          </div>
          <p className="text-gray-500 text-sm">
            Includes logistics premium (8.25%) & duty factor (₹3/kg)
          </p>
        </div>

        <div className="text-gray-500">Last updated: Live</div>
      </div>
    </div>
  );
}