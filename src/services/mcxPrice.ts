import axios from 'axios';

export interface MCXPriceResponse {
  price: number;
  timestamp: string;
}

const MOCK_PRICE = 241.45;
const MAX_RETRIES = 3;
const INITIAL_TIMEOUT = 3000;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<string> {
  try {
    const response = await axios.get(url, {
      timeout: INITIAL_TIMEOUT * (MAX_RETRIES - retries + 1),
      headers: {
        'Accept': 'text/csv',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      // Add random query parameter to prevent caching
      params: {
        _t: Date.now()
      }
    });
    return response.data;
  } catch (error) {
    if (retries > 0) {
      // Exponential backoff
      const delay = INITIAL_TIMEOUT * (MAX_RETRIES - retries + 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
}

export async function fetchMCXPrice(): Promise<MCXPriceResponse> {
  try {
    const csvData = await fetchWithRetry(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Km6DGkZUL2vqQmG2YI03Vzn6c-MaWPvAC-mfy7__8WzMpDqyV6LgTWaGCC93TlWHACuOA73wtY5u/pub?output=csv&gid=0'
    );

    const firstLine = csvData.split('\n')[0];
    const firstCell = firstLine.split(',')[0];
    const price = parseFloat(firstCell);

    if (isNaN(price)) {
      console.warn('Invalid price format in spreadsheet, using mock data');
      return {
        price: MOCK_PRICE,
        timestamp: new Date().toISOString()
      };
    }

    return {
      price,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log specific error for debugging but return mock data to maintain UI
      if (error.code === 'ECONNABORTED') {
        console.warn('Request timeout, using mock data');
      } else if (error.response?.status === 429) {
        console.warn('Rate limit exceeded, using mock data');
      } else {
        console.warn(`Network error (${error.message}), using mock data`);
      }
    } else {
      console.warn('Unexpected error, using mock data');
    }
    
    return {
      price: MOCK_PRICE,
      timestamp: new Date().toISOString()
    };
  }
}