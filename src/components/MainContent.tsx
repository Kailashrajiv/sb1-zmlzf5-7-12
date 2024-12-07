import React from 'react';
import MCXAluminium from './MCXAluminium';
import LMEAluminium from './LMEAluminium';
import RBIReference from './RBIReference';
import PriceAlert from './PriceAlert';

export default function MainContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Price Alert */}
      <div>
        <PriceAlert />
      </div>

      {/* Right Column - Market Data */}
      <div className="space-y-6">
        <MCXAluminium />
        <LMEAluminium />
        <RBIReference />
      </div>
    </div>
  );
}