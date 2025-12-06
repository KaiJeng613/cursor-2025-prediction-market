// Note: ApifyClient causes browser errors due to Node.js dependencies
// Using mock data for browser compatibility

export interface MalaysianStateRainData {
  state: string;
  currentRainfall: number; // mm
  last24hRainfall: number; // mm
  last7daysRainfall: number; // mm
  last30daysRainfall: number; // mm
  averageMonthlyRainfall: number; // mm
  temperature: number; // Celsius
  humidity: number; // percentage
  condition: string;
  forecast: RainForecast[];
  lastUpdated: string;
}

export interface RainForecast {
  date: string;
  expectedRainfall: number; // mm
  probability: number; // 0-100%
  temperature: number;
  condition: string;
}

export interface RainPrediction {
  state: string;
  probability: number; // 0-100%
  expectedAmount: number; // mm
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
}

// Malaysian states
export const malaysianStates = [
  'Kuala Lumpur',
  'Selangor',
  'Penang',
  'Johor',
  'Perak',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Pahang',
  'Negeri Sembilan',
  'Malacca',
  'Perlis',
  'Sabah',
  'Sarawak',
];

/**
 * Fetch weather and rainfall data for Malaysian states using Apify
 */
export async function fetchMalaysianRainData(): Promise<MalaysianStateRainData[]> {
  try {
    console.log('🌧️ Using mock Malaysian rainfall data (Apify disabled for browser compatibility)');
    return generateMockRainData();
  } catch (error) {
    console.error('❌ Error generating rain data:', error);
    return generateMockRainData();
  }
}

/**
 * Generate forecast data based on current conditions
 */
function generateForecast(baseRainfall: number, baseTemp: number): RainForecast[] {
  const forecast: RainForecast[] = [];
  
  for (let i = 1; i <= 7; i++) {
    const variation = (Math.random() - 0.5) * 2;
    forecast.push({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      expectedRainfall: Math.max(0, baseRainfall * (0.8 + Math.random() * 0.4)),
      probability: Math.min(95, Math.max(5, 50 + (baseRainfall * 2) + (Math.random() * 20))),
      temperature: baseTemp + variation,
      condition: baseRainfall > 20 ? 'Rainy' : baseRainfall > 10 ? 'Cloudy' : 'Partly Cloudy',
    });
  }
  
  return forecast;
}

/**
 * Generate mock rain data (fallback)
 */
function generateMockRainData(): MalaysianStateRainData[] {
  return malaysianStates.map(state => {
    const baseRain = 15 + Math.random() * 50;
    const temp = 26 + Math.random() * 6;
    
    return {
      state,
      currentRainfall: Math.random() * 5,
      last24hRainfall: baseRain * 0.9,
      last7daysRainfall: baseRain * 6,
      last30daysRainfall: baseRain * 25,
      averageMonthlyRainfall: baseRain * 30,
      temperature: temp,
      humidity: 70 + Math.random() * 20,
      condition: baseRain > 40 ? 'Heavy Rain' : baseRain > 25 ? 'Rainy' : 'Partly Cloudy',
      forecast: generateForecast(baseRain, temp),
      lastUpdated: new Date().toISOString(),
    };
  });
}

/**
 * Calculate rain probability predictions for each state
 */
export function calculateRainPredictions(rainData: MalaysianStateRainData[]): RainPrediction[] {
  return rainData.map(data => {
    const { state, last7daysRainfall, last30daysRainfall, humidity, forecast } = data;
    
    // Calculate probability based on historical data and current conditions
    let probability = 50; // base probability
    
    // Factor in recent rainfall trends
    if (last7daysRainfall > last30daysRainfall / 4) {
      probability += 20;
    }
    
    // Factor in humidity
    if (humidity > 80) probability += 15;
    else if (humidity > 70) probability += 10;
    else if (humidity < 50) probability -= 15;
    
    // Factor in forecast trends
    const avgForecastRain = forecast.reduce((sum, f) => sum + f.expectedRainfall, 0) / forecast.length;
    if (avgForecastRain > 30) probability += 15;
    else if (avgForecastRain > 15) probability += 10;
    
    // Normalize probability
    probability = Math.max(5, Math.min(95, probability));
    
    // Determine confidence
    let confidence: 'low' | 'medium' | 'high' = 'medium';
    if (probability > 75 || probability < 25) confidence = 'high';
    else if (probability > 60 || probability < 40) confidence = 'medium';
    else confidence = 'low';
    
    // Determine factors
    const factors: string[] = [];
    if (humidity > 80) factors.push('High humidity');
    if (last7daysRainfall > last30daysRainfall / 4) factors.push('Recent rainfall trend');
    if (avgForecastRain > 20) factors.push('Forecast indicates rain');
    if (factors.length === 0) factors.push('Historical patterns');
    
    return {
      state,
      probability,
      expectedAmount: avgForecastRain,
      confidence,
      factors,
    };
  });
}

/**
 * Calculate total rainfall across all Malaysian states
 */
export function calculateTotalMalaysianRainfall(rainData: MalaysianStateRainData[]): number {
  return rainData.reduce((total, state) => total + state.last30daysRainfall, 0);
}

/**
 * Get states with highest and lowest rainfall
 */
export function getRainfallExtremes(rainData: MalaysianStateRainData[]): {
  wettest: MalaysianStateRainData;
  driest: MalaysianStateRainData;
} {
  const sorted = [...rainData].sort((a, b) => b.last30daysRainfall - a.last30daysRainfall);
  return {
    wettest: sorted[0],
    driest: sorted[sorted.length - 1],
  };
}

