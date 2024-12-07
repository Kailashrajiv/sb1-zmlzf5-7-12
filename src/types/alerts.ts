export type AlertType = 'PRICE_ABOVE' | 'PRICE_BELOW' | 'PERCENTAGE_CHANGE';
export type NotificationChannel = 'whatsapp' | 'web' | 'email';

export interface PriceAlert {
  id: string;
  userId: string;
  targetPrice: number;
  currentPrice: number;
  customMessage: string;
  notificationChannels: NotificationChannel[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  lastTriggeredAt?: string;
  category?: 'MCX' | 'LME';
}