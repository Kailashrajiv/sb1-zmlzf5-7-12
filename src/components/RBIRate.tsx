import React from 'react';

export default function RBIRate() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">RBI Reference Rate</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-500 text-2xl">$</span>
        <span className="text-2xl">1</span>
        <span className="text-2xl">=</span>
        <span className="text-blue-500 text-2xl">₹</span>
        <span className="text-[40px] font-bold">84.4063</span>
      </div>

      <div className="text-gray-500">15 Nov 2024</div>
    </div>
  );
}