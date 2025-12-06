import axios from 'axios';
import { Market } from '../types';

// CoinGecko API (free tier) for crypto prices
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Mapping of crypto symbols to CoinGecko IDs
const cryptoIdMap: Record<string, string> = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'XRP': 'ripple',
  'ADA': 'cardano',
  'DOGE': 'dogecoin',
  'MATIC': 'matic-network',
  'DOT': 'polkadot',
  'AVAX': 'avalanche-2',
  'LINK': 'chainlink'
};

export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

/**
 * Fetch current crypto prices from CoinGecko
 */
export async function fetchCryptoPrices(symbols: string[]): Promise<Record<string, CryptoPrice>> {
  try {
    console.log('💰 Fetching crypto prices from CoinGecko...');
    
    const ids = symbols
      .map(symbol => cryptoIdMap[symbol.toUpperCase()])
      .filter(Boolean)
      .join(',');

    if (!ids) {
      console.warn('No valid crypto symbols to fetch');
      return {};
    }

    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids,
        vs_currencies: 'usd',
        include_24hr_change: true,
        include_market_cap: true,
        include_24hr_vol: true
      }
    });

    const prices: Record<string, CryptoPrice> = {};
    
    for (const [symbol, coinId] of Object.entries(cryptoIdMap)) {
      if (response.data[coinId]) {
        const data = response.data[coinId];
        prices[symbol] = {
          symbol,
          price: data.usd,
          change24h: data.usd_24h_change || 0,
          marketCap: data.usd_market_cap || 0,
          volume24h: data.usd_24h_vol || 0
        };
      }
    }

    console.log(`✅ Fetched prices for ${Object.keys(prices).length} cryptocurrencies`);
    return prices;
  } catch (error) {
    console.error('❌ Error fetching crypto prices:', error);
    return {};
  }
}

/**
 * Extract crypto symbol from market title
 */
function extractCryptoSymbol(title: string): string | null {
  const symbols = Object.keys(cryptoIdMap);
  
  // Check for full name or symbol in title
  for (const symbol of symbols) {
    if (title.toLowerCase().includes(symbol.toLowerCase())) {
      return symbol;
    }
  }
  
  // Special cases
  if (title.toLowerCase().includes('bitcoin')) return 'BTC';
  if (title.toLowerCase().includes('ethereum')) return 'ETH';
  if (title.toLowerCase().includes('solana')) return 'SOL';
  if (title.toLowerCase().includes('ripple')) return 'XRP';
  
  return null;
}

/**
 * Calculate probability based on current price and target price
 */
function calculatePriceProbability(
  currentPrice: number,
  targetPrice: number,
  daysUntilEnd: number
): { yesPrice: number; noPrice: number } {
  const priceDiff = targetPrice - currentPrice;
  const percentageChange = (priceDiff / currentPrice) * 100;
  
  // Base probability on percentage change needed
  let yesProbability: number;
  
  if (percentageChange < 0) {
    // Target is below current price
    yesProbability = 0.15;
  } else if (percentageChange < 5) {
    // Very close to target
    yesProbability = 0.75;
  } else if (percentageChange < 10) {
    // Within 10%
    yesProbability = 0.65;
  } else if (percentageChange < 25) {
    // 10-25% increase needed
    yesProbability = 0.50;
  } else if (percentageChange < 50) {
    // 25-50% increase needed
    yesProbability = 0.35;
  } else if (percentageChange < 100) {
    // 50-100% increase needed
    yesProbability = 0.25;
  } else {
    // Over 100% increase needed
    yesProbability = 0.15;
  }
  
  // Adjust based on time remaining
  const timeFactor = Math.min(1, daysUntilEnd / 365);
  yesProbability *= (0.7 + (timeFactor * 0.3)); // Less time = lower probability
  
  // Ensure probabilities are within valid range
  yesProbability = Math.max(0.05, Math.min(0.95, yesProbability));
  const noProbability = 1 - yesProbability;
  
  return {
    yesPrice: parseFloat(yesProbability.toFixed(2)),
    noPrice: parseFloat(noProbability.toFixed(2))
  };
}

/**
 * Update crypto market predictions with real-time prices
 */
export async function updateCryptoMarketPredictions(markets: Market[]): Promise<Market[]> {
  try {
    console.log('🔄 Updating crypto market predictions...');
    
    // Find all crypto markets
    const cryptoMarkets = markets.filter(m => m.category === 'crypto');
    if (cryptoMarkets.length === 0) {
      console.log('No crypto markets to update');
      return markets;
    }
    
    // Extract unique crypto symbols
    const symbols = new Set<string>();
    cryptoMarkets.forEach(market => {
      const symbol = extractCryptoSymbol(market.title);
      if (symbol) symbols.add(symbol);
    });
    
    // Fetch prices
    const prices = await fetchCryptoPrices(Array.from(symbols));
    
    // Update markets with new prices and probabilities
    const updatedMarkets = markets.map(market => {
      if (market.category !== 'crypto') {
        return market;
      }
      
      const symbol = extractCryptoSymbol(market.title);
      if (!symbol || !prices[symbol]) {
        return market;
      }
      
      const cryptoPrice = prices[symbol];
      const currentPrice = cryptoPrice.price;
      const targetPrice = market.targetPrice || currentPrice * 1.5;
      
      // Calculate days until market end
      const daysUntilEnd = Math.ceil(
        (new Date(market.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      
      // Calculate new probabilities
      const probabilities = calculatePriceProbability(currentPrice, targetPrice, daysUntilEnd);
      
      console.log(
        `📊 ${symbol}: $${currentPrice.toFixed(2)} → $${targetPrice.toFixed(2)} ` +
        `(${probabilities.yesPrice * 100}% YES)`
      );
      
      return {
        ...market,
        currentPrice,
        targetPrice,
        priceChange24h: cryptoPrice.change24h,
        yesPrice: probabilities.yesPrice,
        noPrice: probabilities.noPrice,
        lastUpdated: new Date().toISOString()
      };
    });
    
    console.log('✅ Crypto markets updated successfully');
    return updatedMarkets;
  } catch (error) {
    console.error('❌ Error updating crypto predictions:', error);
    return markets;
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(2)}k`;
  }
  return `$${price.toFixed(2)}`;
}

/**
 * Format percentage change
 */
export function formatPercentage(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

/**
 * Get price trend indicator
 */
export function getPriceTrend(change24h: number): 'up' | 'down' | 'neutral' {
  if (change24h > 0.5) return 'up';
  if (change24h < -0.5) return 'down';
  return 'neutral';
}

