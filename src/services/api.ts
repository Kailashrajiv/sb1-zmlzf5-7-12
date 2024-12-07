import axios from 'axios';
import type { LMEHistoryData } from '../types/market';

const mockData: LMEHistoryData[] = [
  { date: "27 Nov 2024", price: 2577.00, change: -0.52 },
  { date: "26 Nov 2024", price: 2590.50, change: -0.98 },
  { date: "25 Nov 2024", price: 2616.00, change: 1.04 },
  { date: "22 Nov 2024", price: 2589.00, change: -0.85 }
];

export const fetchLMEHistory = async (): Promise<LMEHistoryData[]> => {
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  
  // If no API key is provided or it's the placeholder value, return mock data
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    console.log('Using mock data (no valid API key provided)');
    return mockData;
  }

  try {
    const SHEET_ID = '1RB9Jw843HKk59zx80_L2kj6Pnps8agSDzY02Xevt-ZM';
    const RANGE = 'A2:B5';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    const response = await axios.get(url);
    
    if (!response.data?.values || !Array.isArray(response.data.values)) {
      console.warn('Invalid data format received from API, using mock data');
      return mockData;
    }

    const rows = response.data.values;
    const processedData: LMEHistoryData[] = [];
    let previousPrice = 0;

    for (let i = 0; i < rows.length; i++) {
      const [date, priceStr] = rows[i];
      const price = parseFloat(priceStr) || 0;
      const change = i === 0 ? 0 : ((price - previousPrice) / previousPrice) * 100;

      processedData.push({
        date: String(date),
        price,
        change: Number(change.toFixed(2))
      });

      previousPrice = price;
    }

    return processedData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn('API Error:', error.response?.data || error.message);
    } else {
      console.warn('Error fetching data:', error);
    }
    return mockData;
  }
};