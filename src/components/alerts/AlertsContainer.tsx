import React from 'react';
import PriceAlertBox from './PriceAlertBox';
import { useMCXPrice } from '../../hooks/useMCXPrice';
import { useLMEHistory } from '../../hooks/useLMEHistory';

export default function AlertsContainer() {
  const { priceData: mcxPrice } = useMCXPrice();
  const { data: lmeData } = useLMEHistory();

  const handleCreateAlert = (type: 'MCX' | 'LME', upperLimit: number, lowerLimit: number) => {
    // Alert creation logic will be implemented here
    console.log('Creating alert for', type, { upperLimit, lowerLimit });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PriceAlertBox
        type="MCX"
        currentPrice={mcxPrice?.currentPrice || 0}
        onCreateAlert={(upper, lower) => handleCreateAlert('MCX', upper, lower)}
      />
      <PriceAlertBox
        type="LME"
        currentPrice={lmeData?.[0]?.price || 0}
        onCreateAlert={(upper, lower) => handleCreateAlert('LME', upper, lower)}
      />
    </div>
  );
}