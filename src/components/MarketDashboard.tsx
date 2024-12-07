import React from 'react';
import { useLMEHistory } from '../hooks/useLMEHistory';
import { LMEHistoryCard } from './LMEHistoryCard';
import MCXAluminium from './MCXAluminium';
import LMEAluminium from './LMEAluminium';
import RBIReference from './RBIReference';
import PriceAlert from './PriceAlert';

const RBI_RATE = 84.4063;

export default function MarketDashboard() {
  const { data, loading, error } = useLMEHistory();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse gradient-text text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* LME Cash Settlement Section */}
      <section className="premium-card p-6">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold gradient-text">LME Cash Settlement</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Source: Westmetals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <LMEHistoryCard 
              key={item.date} 
              data={item}
              previousDayPrice={index < data.length - 1 ? data[index + 1].price : undefined}
              rbiRate={RBI_RATE}
            />
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Price Alert */}
        <section className="space-y-6">
          <PriceAlert />
        </section>

        {/* Right Column - Market Prices */}
        <section className="space-y-6">
          <MCXAluminium />
          <LMEAluminium />
          <RBIReference />
        </section>
      </div>
    </div>
  );
}