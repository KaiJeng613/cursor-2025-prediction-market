import axios from 'axios';
import type { BlogPost } from '../data/blogPosts';

const WEATHER_NEWS_ENDPOINT = 'https://newsapi.org/v2/everything';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const LINDY_CODE = import.meta.env.VITE_LINDY_CODE || '50AGENTS';

interface NewsApiResponse {
  articles: NewsArticle[];
}

interface NewsArticle {
  title?: string;
  description?: string;
  content?: string;
  author?: string;
  publishedAt?: string;
  url?: string;
  source?: {
    name?: string;
  };
}

const FALLBACK_WEATHER_NEWS: BlogPost[] = [
  {
    id: 'weather-news-fallback-1',
    title: 'METMalaysia issues orange alert for monsoon surge',
    date: new Date().toISOString(),
    author: 'PredictHub Weather Desk',
    category: 'weather',
    featured: true,
    imageEmoji: '🛰️',
    excerpt:
      'Continuous heavy rainfall is expected across Kelantan, Terengganu, and Pahang over the next 72 hours as a fresh monsoon surge develops over the South China Sea.',
    content:
      'Satellite observations indicate a strengthening monsoon surge that will keep rainfall totals elevated across the east coast of Peninsular Malaysia. Disaster agencies are coordinating with local councils to pre-position flood mitigation assets and community shelters.',
    tags: ['Malaysia', 'Monsoon', 'Flood Risk']
  },
  {
    id: 'weather-news-fallback-2',
    title: 'Kuching braces for king tide and severe thunderstorms',
    date: new Date().toISOString(),
    author: 'PredictHub Weather Desk',
    category: 'weather',
    featured: false,
    imageEmoji: '🌩️',
    excerpt:
      'Sarawak authorities warn of localized flash floods as king tide overlaps with a mesoscale convective system moving inland from the Natuna Sea.',
    content:
      'Water levels along Sungai Sarawak are already elevated. Residents in low-lying areas are advised to relocate valuables and monitor official advisories closely over the coming weekend.',
    tags: ['Sarawak', 'Thunderstorms', 'Flash Flood']
  },
  {
    id: 'weather-news-fallback-3',
    title: 'Penang ramps up drainage clearing ahead of record rainfall outlook',
    date: new Date().toISOString(),
    author: 'PredictHub Weather Desk',
    category: 'weather',
    featured: false,
    imageEmoji: '🌧️',
    excerpt:
      'Engineers estimate a 35% probability that Penang Island will exceed 400mm of rainfall this December due to stacked atmospheric rivers.',
    content:
      'The state government is expediting drainage maintenance and mobile pumping deployments to reduce urban flooding risk. Prediction markets are pricing a higher likelihood of infrastructure disruptions.',
    tags: ['Penang', 'Rainfall', 'Atmospheric River']
  }
];

function normalizeArticleToBlogPost(article: NewsArticle, index: number): BlogPost {
  const publishedAt = article.publishedAt || new Date().toISOString();
  return {
    id: `weather-news-${publishedAt}-${index}`,
    title: article.title || 'Weather update',
    date: publishedAt,
    author: article.author || article.source?.name || 'Weather Desk',
    category: 'weather',
    featured: index === 0,
    imageEmoji: index === 0 ? '🌀' : '🌦️',
    excerpt:
      article.description ||
      article.content?.slice(0, 140) ||
      'Realtime weather intelligence provided by trusted news sources.',
    content:
      article.content ||
      article.description ||
      'Realtime weather intelligence provided by trusted news sources.',
    tags: ['Weather', 'Malaysia', 'Nowcasting']
  };
}

export async function fetchLatestWeatherNews(
  query: string = 'Malaysia weather',
  limit: number = 3
): Promise<BlogPost[]> {
  if (!NEWS_API_KEY) {
    return FALLBACK_WEATHER_NEWS.slice(0, limit);
  }

  try {
    const response = await axios.get<NewsApiResponse>(WEATHER_NEWS_ENDPOINT, {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: limit,
        apiKey: NEWS_API_KEY
      },
      headers: {
        'X-Lindy-Code': LINDY_CODE,
        'User-Agent': 'PredictHub/1.0 (+weather-intel)'
      }
    });

    if (!response.data?.articles?.length) {
      return FALLBACK_WEATHER_NEWS.slice(0, limit);
    }

    return response.data.articles.map((article, index) =>
      normalizeArticleToBlogPost(article, index)
    );
  } catch (error) {
    console.error('❌ Error fetching weather news:', error);
    return FALLBACK_WEATHER_NEWS.slice(0, limit);
  }
}
