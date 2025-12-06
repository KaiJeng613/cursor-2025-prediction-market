export type MarketCategory = 'crypto' | 'stocks' | 'politics' | 'sports' | 'weather' | 'news';

export interface Market {
  id: string;
  title: string;
  description: string;
  category: MarketCategory;
  yesPrice: number;
  noPrice: number;
  volume: number;
  liquidity: number;
  endDate: string;
  trending?: boolean;
  imageUrl?: string;
  tags: string[];
  currentPrice?: number; // For stocks/crypto
  targetPrice?: number; // For price predictions
  priceChange24h?: number; // Price change percentage
  currentTemp?: number; // For weather markets
  currentCondition?: string; // For weather markets
  lastUpdated?: string;
}

export interface Trade {
  id: string;
  marketId: string;
  type: 'yes' | 'no';
  amount: number;
  price: number;
  timestamp: string;
  userId?: string;
}

export interface UserPosition {
  marketId: string;
  yesShares: number;
  noShares: number;
  averageYesPrice: number;
  averageNoPrice: number;
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
}

