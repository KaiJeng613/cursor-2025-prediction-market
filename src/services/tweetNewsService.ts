export interface TweetNews {
  id: string;
  title: string;
  url: string;
  author?: string;
  publishedAt?: string;
  summary?: string;
  tags?: string[];
}

export async function fetchTweetTopicNews(topics: string[]): Promise<TweetNews[]> {
  try {
    console.warn('⚠️ Twitter scraping disabled in browser. Using mock data with Twitter search links.');
    // Provide category-aware mocks
    const now = new Date().toISOString();
    return topics.slice(0, Math.min(3, topics.length)).map((t, idx) => ({
      id: `mock-${idx}-${Date.now()}`,
      title: `Trending: ${t}`,
      url: `https://twitter.com/search?q=${encodeURIComponent(t)}&src=typed_query&f=live`,
      author: 'Community Feed',
      publishedAt: now,
      summary: `Latest discussions on ${t}. Real-time scraping requires backend proxy.`,
      tags: [t],
    }));
  } catch (error) {
    console.error('❌ Tweet news failed:', error);
    return [];
  }
}

