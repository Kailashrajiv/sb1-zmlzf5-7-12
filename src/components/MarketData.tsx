import React from 'react';
import MCXAluminium from './MCXAluminium';
import LMEAluminium from './LMEAluminium';
import RBIReference from './RBIReference';

export default function MarketData() {
  return (
    <div className="space-y-6">
      <MCXAluminium />
      <LMEAluminium />
      <RBIReference />
    </div>
  );
}