import { useState, useEffect } from 'react';
import { MARKET_CONFIG } from '../config/market';

interface MCXPriceData {
  price: number;
  lastUpdated: string;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  currentPrice: number;
}

export function useMCXPrice() {
  const [priceData, setPriceData] = useState<MCXPriceData>({
    price: 241.45,
    currentPrice: 241.45,
    lastUpdated: new Date().toISOString(),
    changePercent: 0.15,
    volume: 1580,
    dayHigh: 242.30,
    dayLow: 240.80
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return { priceData, error, loading };
}