import { useState, useEffect } from 'react';
import { LMEHistoryData } from '../types/market';
import { mockLMEHistory } from '../services/mockData';

export function useLMEHistory() {
  const [data, setData] = useState<LMEHistoryData[]>(mockLMEHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return { data, loading, error };
}