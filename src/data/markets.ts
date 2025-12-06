import { Market } from '../types';

export const sampleMarkets: Market[] = [
  // Crypto Markets
  {
    id: 'btc-100k-2025',
    title: 'Will Bitcoin reach $100,000 by end of 2025?',
    description: 'Bitcoin (BTC) has been showing strong momentum. Will it break the $100k barrier by December 31, 2025?',
    category: 'crypto',
    yesPrice: 0.67,
    noPrice: 0.33,
    volume: 2450000,
    liquidity: 890000,
    endDate: '2025-12-31',
    trending: true,
    tags: ['Bitcoin', 'BTC', 'Crypto', '$100k'],
    currentPrice: 95420,
    targetPrice: 100000,
    priceChange24h: 2.3
  },
  {
    id: 'eth-8k-q1-2026',
    title: 'Will Ethereum hit $8,000 in Q1 2026?',
    description: 'With Ethereum upgrades and institutional adoption, can ETH reach $8,000 by March 31, 2026?',
    category: 'crypto',
    yesPrice: 0.52,
    noPrice: 0.48,
    volume: 1850000,
    liquidity: 720000,
    endDate: '2026-03-31',
    trending: true,
    tags: ['Ethereum', 'ETH', 'Crypto'],
    currentPrice: 3680,
    targetPrice: 8000,
    priceChange24h: 3.7
  },
  {
    id: 'sol-500-2026',
    title: 'Solana to reach $500 by mid-2026?',
    description: 'Solana has been gaining traction. Will SOL hit $500 by June 30, 2026?',
    category: 'crypto',
    yesPrice: 0.45,
    noPrice: 0.55,
    volume: 980000,
    liquidity: 340000,
    endDate: '2026-06-30',
    tags: ['Solana', 'SOL', 'Crypto'],
    currentPrice: 198,
    targetPrice: 500,
    priceChange24h: 5.2
  },
  {
    id: 'xrp-5-2026',
    title: 'Will XRP surpass $5 in 2026?',
    description: 'With ongoing SEC developments and adoption, will XRP reach $5 by December 2026?',
    category: 'crypto',
    yesPrice: 0.38,
    noPrice: 0.62,
    volume: 720000,
    liquidity: 280000,
    endDate: '2026-12-31',
    tags: ['XRP', 'Ripple', 'Crypto'],
    currentPrice: 2.34,
    targetPrice: 5,
    priceChange24h: 1.8
  },

  // Stock Markets
  {
    id: 'aapl-250-2026',
    title: 'Apple stock to hit $250 by end of 2026?',
    description: 'Apple continues innovation in AI and hardware. Will AAPL reach $250 by December 31, 2026?',
    category: 'stocks',
    yesPrice: 0.61,
    noPrice: 0.39,
    volume: 1680000,
    liquidity: 540000,
    endDate: '2026-12-31',
    trending: true,
    tags: ['Apple', 'AAPL', 'Tech Stocks'],
    currentPrice: 198.50,
    targetPrice: 250,
    priceChange24h: 0.8
  },
  {
    id: 'tsla-500-2026',
    title: 'Tesla to reach $500 per share in 2026?',
    description: 'With FSD developments and energy business growth, will TSLA hit $500?',
    category: 'stocks',
    yesPrice: 0.48,
    noPrice: 0.52,
    volume: 2340000,
    liquidity: 810000,
    endDate: '2026-12-31',
    tags: ['Tesla', 'TSLA', 'EV', 'Tech'],
    currentPrice: 345.20,
    targetPrice: 500,
    priceChange24h: -1.2
  },
  {
    id: 'nvda-200-2026',
    title: 'NVIDIA to exceed $200 by mid-2026?',
    description: 'AI chip demand remains strong. Will NVDA surpass $200 by June 2026?',
    category: 'stocks',
    yesPrice: 0.73,
    noPrice: 0.27,
    volume: 1920000,
    liquidity: 680000,
    endDate: '2026-06-30',
    tags: ['NVIDIA', 'NVDA', 'AI', 'Semiconductors'],
    currentPrice: 142.80,
    targetPrice: 200,
    priceChange24h: 2.4
  },
  {
    id: 'msft-500-2026',
    title: 'Microsoft to reach $500 by end of 2026?',
    description: 'With Azure and AI investments paying off, will MSFT hit $500?',
    category: 'stocks',
    yesPrice: 0.56,
    noPrice: 0.44,
    volume: 1450000,
    liquidity: 520000,
    endDate: '2026-12-31',
    tags: ['Microsoft', 'MSFT', 'Cloud', 'AI'],
    currentPrice: 412.30,
    targetPrice: 500,
    priceChange24h: 1.1
  },

  // Politics Markets
  {
    id: 'us-election-2026-midterm',
    title: 'Will Democrats win House majority in 2026 midterms?',
    description: 'Predictions for the 2026 US midterm elections - will Democrats maintain or regain House control?',
    category: 'politics',
    yesPrice: 0.47,
    noPrice: 0.53,
    volume: 3240000,
    liquidity: 1250000,
    endDate: '2026-11-03',
    tags: ['US Politics', 'Elections', 'Midterms'],
  },
  {
    id: 'uk-election-2026',
    title: 'Labour to win UK general election in 2026?',
    description: 'Will the Labour Party secure victory in the next UK general election?',
    category: 'politics',
    yesPrice: 0.68,
    noPrice: 0.32,
    volume: 1780000,
    liquidity: 640000,
    endDate: '2026-12-31',
    tags: ['UK Politics', 'Elections', 'Labour'],
  },

  // Sports Markets
  {
    id: 'super-bowl-2026',
    title: 'Will the Chiefs win Super Bowl LX?',
    description: 'Can Kansas City Chiefs secure another Super Bowl victory in 2026?',
    category: 'sports',
    yesPrice: 0.28,
    noPrice: 0.72,
    volume: 2150000,
    liquidity: 780000,
    endDate: '2026-02-08',
    tags: ['NFL', 'Super Bowl', 'Chiefs'],
  },
  {
    id: 'world-cup-2026-usa',
    title: 'USA to reach World Cup 2026 semifinals?',
    description: 'With home advantage, will USA make it to the World Cup semifinals?',
    category: 'sports',
    yesPrice: 0.35,
    noPrice: 0.65,
    volume: 1680000,
    liquidity: 590000,
    endDate: '2026-07-19',
    tags: ['FIFA', 'World Cup', 'Soccer', 'USA'],
  },
  {
    id: 'nba-finals-2026',
    title: 'Will Lakers win NBA Championship 2026?',
    description: 'Can the Los Angeles Lakers clinch the 2026 NBA title?',
    category: 'sports',
    yesPrice: 0.22,
    noPrice: 0.78,
    volume: 980000,
    liquidity: 340000,
    endDate: '2026-06-21',
    tags: ['NBA', 'Basketball', 'Lakers'],
  },

  // Weather Markets
  {
    id: 'kl-monsoon-2026',
    title: 'Will Kuala Lumpur receive over 300mm rainfall in January 2026?',
    description: 'Based on monsoon patterns and climate data, will KL see heavy rainfall exceeding 300mm?',
    category: 'weather',
    yesPrice: 0.72,
    noPrice: 0.28,
    volume: 450000,
    liquidity: 180000,
    endDate: '2026-01-31',
    tags: ['Malaysia', 'Weather', 'Monsoon', 'Kuala Lumpur'],
    currentTemp: 28.5,
    currentCondition: 'Rain'
  },
  {
    id: 'penang-temp-2026',
    title: 'Will Penang average temperature exceed 32°C in March 2026?',
    description: 'Climate predictions for Penang. Will average temps surpass 32°C during March?',
    category: 'weather',
    yesPrice: 0.58,
    noPrice: 0.42,
    volume: 320000,
    liquidity: 125000,
    endDate: '2026-03-31',
    tags: ['Malaysia', 'Weather', 'Temperature', 'Penang'],
    currentTemp: 29.3,
    currentCondition: 'Clouds'
  },
  {
    id: 'johor-flood-2026',
    title: 'Major flooding in Johor during monsoon season 2026?',
    description: 'Will Johor experience major flooding requiring evacuations during the 2026 monsoon?',
    category: 'weather',
    yesPrice: 0.65,
    noPrice: 0.35,
    volume: 580000,
    liquidity: 210000,
    endDate: '2026-03-31',
    tags: ['Malaysia', 'Weather', 'Flooding', 'Johor'],
    currentCondition: 'Rain'
  },

  // News/Tech Markets
  {
    id: 'chatgpt-billion-users',
    title: 'Will ChatGPT reach 1 billion users by end of 2026?',
    description: 'OpenAI\'s ChatGPT continues rapid growth. Can it hit 1B users by December 2026?',
    category: 'news',
    yesPrice: 0.64,
    noPrice: 0.36,
    volume: 1240000,
    liquidity: 450000,
    endDate: '2026-12-31',
    tags: ['AI', 'ChatGPT', 'OpenAI', 'Technology'],
  },
  {
    id: 'spacex-mars-2026',
    title: 'SpaceX to launch first crewed mission to Mars by 2026?',
    description: 'Will SpaceX successfully launch humans toward Mars before the end of 2026?',
    category: 'news',
    yesPrice: 0.15,
    noPrice: 0.85,
    volume: 1850000,
    liquidity: 670000,
    endDate: '2026-12-31',
    trending: true,
    tags: ['SpaceX', 'Mars', 'Space', 'Elon Musk'],
  },
  {
    id: 'apple-vr-headset-2026',
    title: 'Apple Vision Pro to sell 5M units in 2026?',
    description: 'Can Apple\'s Vision Pro achieve 5 million sales in its second year?',
    category: 'news',
    yesPrice: 0.41,
    noPrice: 0.59,
    volume: 920000,
    liquidity: 320000,
    endDate: '2026-12-31',
    tags: ['Apple', 'VR', 'Vision Pro', 'Technology'],
  },
];

export function getMarketById(id: string): Market | undefined {
  return sampleMarkets.find(market => market.id === id);
}

export function getMarketsByCategory(category: string): Market[] {
  if (category === 'all') return sampleMarkets;
  return sampleMarkets.filter(market => market.category === category);
}

export function getTrendingMarkets(): Market[] {
  return sampleMarkets.filter(market => market.trending);
}

