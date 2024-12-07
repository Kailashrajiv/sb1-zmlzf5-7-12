import React from 'react';
import PriceAlert from './PriceAlert';
import PriceSection from './PriceSection';

export default function MainDashboard() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <PriceSection />
      <PriceAlert />
    </div>
  );
}