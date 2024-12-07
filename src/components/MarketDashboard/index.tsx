import React from 'react';
import { useLMEHistory } from '../../hooks/useLMEHistory';
import LMEHistoryBlock from './LMEHistoryBlock';
import MCXAluminium from '../MCXAluminium';
import LMEAluminium from '../LMEAluminium';
import IndexArbitrageCard from '../IndexArbitrageCard';
import RBIReference from '../RBIReference';
import PriceAlert from '../PriceAlert';

export default function MarketDashboard() {
  const { data, loading, error } = useLMEHistory();

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* LME Cash Settlement Section */}
      <section className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 backdrop-blur-sm rounded-xl p-6 
        border border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] 
        transition-all duration-300">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LME Cash Settlement
          </h2>
          <p className="text-sm text-gray-500">Source: Westmetals</p>
        </div>
        
        <LMEHistoryBlock
          data={data}
          loading={loading}
          error={error}
        />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <PriceAlert />
          <IndexArbitrageCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <MCXAluminium />
          <LMEAluminium />
          <RBIReference />
        </div>
      </div>
    </div>
  );
}