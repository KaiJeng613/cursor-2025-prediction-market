import axios from 'axios';

// Weather API configuration (using OpenWeatherMap as an example)
// You can replace this with weather-fetcher or another service
const WEATHER_API_KEY = process.env.VITE_WEATHER_API_KEY || 'demo_key';
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  precipitation: number;
}

/**
 * Fetch current weather data for Malaysian locations
 */
export async function fetchMalaysianWeather(city: string = 'Kuala Lumpur'): Promise<WeatherData | null> {
  try {
    console.log(`🌤️ Fetching weather for ${city}, Malaysia...`);
    
    const response = await axios.get(`${WEATHER_API_BASE}/weather`, {
      params: {
        q: `${city},MY`,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;
    
    return {
      location: city,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      forecast: []
    };
  } catch (error) {
    console.error('❌ Error fetching weather:', error);
    return null;
  }
}

/**
 * Fetch weather forecast for Malaysian locations
 */
export async function fetchMalaysianForecast(city: string = 'Kuala Lumpur'): Promise<WeatherForecast[]> {
  try {
    const response = await axios.get(`${WEATHER_API_BASE}/forecast`, {
      params: {
        q: `${city},MY`,
        appid: WEATHER_API_KEY,
        units: 'metric',
        cnt: 40 // 5 days
      }
    });

    const forecasts: WeatherForecast[] = [];
    const dailyData = response.data.list;

    for (let i = 0; i < dailyData.length; i += 8) {
      const dayData = dailyData.slice(i, i + 8);
      const temps = dayData.map((d: any) => d.main.temp);
      
      forecasts.push({
        date: dayData[0].dt_txt.split(' ')[0],
        tempMax: Math.max(...temps),
        tempMin: Math.min(...temps),
        condition: dayData[0].weather[0].main,
        precipitation: dayData[0].pop * 100
      });
    }

    return forecasts;
  } catch (error) {
    console.error('❌ Error fetching forecast:', error);
    return [];
  }
}

/**
 * Malaysian cities for weather tracking
 */
export const malaysianCities = [
  'Kuala Lumpur',
  'Penang',
  'Johor Bahru',
  'Kuching',
  'Kota Kinabalu',
  'Malacca',
  'Ipoh',
  'Shah Alam',
  'Petaling Jaya',
  'Kuantan'
];

/**
 * Calculate probability for weather-based predictions
 */
export function calculateWeatherProbability(
  currentTemp: number,
  targetTemp: number,
  daysUntilEnd: number,
  historicalData?: number[]
): { yesPrice: number; noPrice: number } {
  const tempDiff = Math.abs(targetTemp - currentTemp);
  const seasonalFactor = Math.max(0.5, Math.min(1.5, daysUntilEnd / 30));
  
  let yesProbability: number;
  
  if (tempDiff < 2) {
    yesProbability = 0.75;
  } else if (tempDiff < 5) {
    yesProbability = 0.55;
  } else if (tempDiff < 10) {
    yesProbability = 0.35;
  } else {
    yesProbability = 0.15;
  }
  
  // Apply seasonal factor
  yesProbability *= seasonalFactor;
  
  // Ensure probabilities are within valid range
  yesProbability = Math.max(0.05, Math.min(0.95, yesProbability));
  const noProbability = 1 - yesProbability;
  
  return {
    yesPrice: parseFloat(yesProbability.toFixed(2)),
    noPrice: parseFloat(noProbability.toFixed(2))
  };
}

/**
 * Update weather-based market predictions
 */
export async function updateWeatherMarketPredictions(markets: any[]): Promise<any[]> {
  try {
    console.log('🌤️ Updating weather market predictions...');
    
    const updatedMarkets = await Promise.all(
      markets.map(async (market) => {
        if (market.category !== 'weather') {
          return market;
        }

        // Extract city from market title
        const cityMatch = malaysianCities.find(city => 
          market.title.toLowerCase().includes(city.toLowerCase())
        );

        if (!cityMatch) {
          return market;
        }

        const weatherData = await fetchMalaysianWeather(cityMatch);
        
        if (weatherData) {
          const daysUntilEnd = Math.ceil(
            (new Date(market.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );

          // Extract target temperature from market title
          const tempMatch = market.title.match(/(\d+)°C/);
          if (tempMatch) {
            const targetTemp = parseInt(tempMatch[1]);
            const probabilities = calculateWeatherProbability(
              weatherData.temperature,
              targetTemp,
              daysUntilEnd
            );

            console.log(`🌤️ Updated ${cityMatch}: ${weatherData.temperature}°C → ${targetTemp}°C (${probabilities.yesPrice * 100}% YES)`);

            return {
              ...market,
              yesPrice: probabilities.yesPrice,
              noPrice: probabilities.noPrice,
              currentTemp: weatherData.temperature,
              currentCondition: weatherData.condition,
              lastUpdated: new Date().toISOString()
            };
          }
        }

        return market;
      })
    );

    return updatedMarkets;
  } catch (error) {
    console.error('❌ Error updating weather predictions:', error);
    return markets;
  }
}

/**
 * Format temperature for display
 */
export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

/**
 * Get weather icon based on condition
 */
export function getWeatherIcon(condition: string): string {
  const icons: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️'
  };
  return icons[condition] || '🌤️';
}

