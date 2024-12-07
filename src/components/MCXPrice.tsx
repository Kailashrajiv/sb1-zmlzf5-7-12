import React from 'react';

export default function MCXPrice() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">MCX Aluminium</h2>
        <span className="text-gray-500">Future Nov 2024</span>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[56px] font-bold text-blue-500">₹235.20</span>
          <span className="text-gray-500">per kg</span>
        </div>
        <div className="text-green-500 text-xl">+0.00 (0.00%)</div>
      </div>

      <div className="flex items-center gap-2 text-gray-500">
        <span>Last updated: 10:04:26</span>
        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-sm">
          Live
        </span>
      </div>
    </div>
  );
}