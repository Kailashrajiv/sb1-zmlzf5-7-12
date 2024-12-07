export interface LMEHistoryData {
  date: string;
  price: number;
  change: number;
}

export interface MCXPriceData {
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  dayHigh: number;
  dayLow: number;
  lastUpdated: string;
}

export interface LMEPriceData {
  price: number;
  change: number;
  premium: number;
  lastUpdated: string;
}