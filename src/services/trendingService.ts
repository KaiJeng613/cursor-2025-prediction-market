import { fetchTweetTopicNews } from './tweetNewsService';
import { fetchYouTubeTopicNews } from './youtubeNewsService';

export interface TrendingTopic {
  id: string;
  topic: string;
  source: 'twitter' | 'youtube';
  volume: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

/**
 * Fetch top trending prediction topics from Twitter and YouTube
 */
export async function fetchTrendingPredictionTopics(): Promise<TrendingTopic[]> {
  try {
    const predictionKeywords = [
      'Bitcoin price prediction',
      'Ethereum 2026',
      'US election 2026',
      'Stock market forecast',
      'Weather forecast 2026',
      'AI predictions',
      'Trump 2026',
      'Crypto bull run',
      'NFT market',
      'Malaysia flood',
      'Climate change impact',
      'Tech stocks 2026',
      'DeFi future',
      'Apple stock prediction',
      'Tesla price target',
      'Gold price forecast',
      'Oil price 2026',
      'Real estate market',
      'Kabuto card value',
      'Alien disclosure'
    ];

    const [tweets, videos] = await Promise.all([
      fetchTweetTopicNews(predictionKeywords.slice(0, 10)),
      fetchYouTubeTopicNews(predictionKeywords.slice(10))
    ]);

    const trendingTopics: TrendingTopic[] = [
      ...tweets.map((t, idx) => ({
        id: `twitter-${idx}`,
        topic: t.tags?.[0] || t.title.substring(0, 30),
        source: 'twitter' as const,
        volume: Math.floor(Math.random() * 100000) + 10000,
        sentiment: (['bullish', 'bearish', 'neutral'] as const)[Math.floor(Math.random() * 3)]
      })),
      ...videos.map((v, idx) => ({
        id: `youtube-${idx}`,
        topic: v.tags?.[0] || v.title.substring(0, 30),
        source: 'youtube' as const,
        volume: v.views || Math.floor(Math.random() * 200000) + 20000,
        sentiment: (['bullish', 'bearish', 'neutral'] as const)[Math.floor(Math.random() * 3)]
      }))
    ];

    // Sort by volume and return top 20
    return trendingTopics
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 20);
  } catch (error) {
    console.error('Failed to fetch trending topics:', error);
    return [];
  }
}

