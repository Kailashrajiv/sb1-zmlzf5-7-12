export interface Commodity {
  id: string;
  name: string;
  exchange: 'MCX';
  currentPrice: number;
  previousClose: number;
  change: number;
  lastUpdated: string;
  volume: number;
  dayHigh: number;
  dayLow: number;
}

export interface Alert {
  id: string;
  commodityId: string;
  type: 'PRICE_ABOVE' | 'PRICE_BELOW' | 'PERCENTAGE_CHANGE';
  value: number;
  isActive: boolean;
  message: string;
}

export interface Transaction {
  id: string;
  commodityId: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';
}