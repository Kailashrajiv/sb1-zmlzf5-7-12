import React from 'react';
import MCXPrice from './MCXPrice';
import LMEPrice from './LMEPrice';
import RBIRate from './RBIRate';

export default function PriceSection() {
  return (
    <div className="space-y-6">
      <MCXPrice />
      <LMEPrice />
      <RBIRate />
    </div>
  );
}