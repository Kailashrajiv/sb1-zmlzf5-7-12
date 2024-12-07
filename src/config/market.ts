export const MARKET_CONFIG = {
  LME: {
    PREMIUM_USD: 45, // Premium in USD/MT
    DUTY_FACTOR: 1.0825, // Duty factor (8.25%)
    BASE_PRICE: 2587.5, // Base price in USD/MT
  },
  RBI: {
    DEFAULT_RATE: 84.4708,
    UPDATE_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  }
} as const;