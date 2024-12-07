import { useState } from 'react';
import { MARKET_CONFIG } from '../config/market';

export function useRBIRate() {
  const [rate] = useState(MARKET_CONFIG.RBI.DEFAULT_RATE);
  const [lastUpdated] = useState<Date>(new Date());
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return {
    rate,
    lastUpdated,
    loading,
    error
  };
}