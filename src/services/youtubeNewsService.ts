export interface YouTubeNews {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  channel?: string;
  publishedAt?: string;
  views?: number;
  summary?: string;
  tags?: string[];
}

/**
 * Fetch YouTube videos for specific topics
 * Note: Apify client causes browser issues, using mock data for now
 */
/**
 * Generate thumbnail URL for topic
 */
function getThumbnailForTopic(topic: string): string {
  const lower = topic.toLowerCase();
  
  // Use placeholder images with relevant colors/text
  if (lower.includes('crypto') || lower.includes('bitcoin') || lower.includes('ethereum')) {
    return 'https://placehold.co/320x180/f7931a/ffffff?text=Crypto+News&font=roboto';
  }
  if (lower.includes('politic') || lower.includes('election')) {
    return 'https://placehold.co/320x180/1e40af/ffffff?text=Politics&font=roboto';
  }
  if (lower.includes('weather') || lower.includes('climate') || lower.includes('rain')) {
    return 'https://placehold.co/320x180/0ea5e9/ffffff?text=Weather&font=roboto';
  }
  if (lower.includes('tech') || lower.includes('ai')) {
    return 'https://placehold.co/320x180/7c3aed/ffffff?text=Technology&font=roboto';
  }
  if (lower.includes('alien') || lower.includes('ufo') || lower.includes('mystical') || lower.includes('yeti') || lower.includes('bigfoot')) {
    return 'https://placehold.co/320x180/8b5cf6/ffffff?text=Mystical&font=roboto';
  }
  
  return 'https://placehold.co/320x180/6366f1/ffffff?text=Latest+News&font=roboto';
}

export async function fetchYouTubeTopicNews(topics: string[]): Promise<YouTubeNews[]> {
  try {
    console.warn('⚠️ YouTube scraping disabled in browser. Using mock data with relevant thumbnails.');
    
    // Generate mock YouTube news for each topic
    const now = new Date();
    const mockNews: YouTubeNews[] = [];
    
    topics.forEach((topic, idx) => {
      const baseDate = new Date(now.getTime() - idx * 3600000); // 1 hour apart
      
      mockNews.push({
        id: `yt-${topic.replace(/\s+/g, '-')}-${idx}-${Date.now()}`,
        title: `${topic}: Latest Insights and Analysis`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`,
        thumbnail: getThumbnailForTopic(topic),
        channel: getChannelForTopic(topic),
        publishedAt: baseDate.toISOString(),
        views: Math.floor(Math.random() * 500000) + 10000,
        summary: `Comprehensive coverage of ${topic}. Watch for expert commentary and breaking developments.`,
        tags: topic.split(' '),
      });
    });
    
    return mockNews;
  } catch (error) {
    console.error('❌ YouTube news fetch failed:', error);
    return [];
  }
}

/**
 * Get representative channel name for topic
 */
function getChannelForTopic(topic: string): string {
  const lower = topic.toLowerCase();
  
  if (lower.includes('crypto') || lower.includes('bitcoin') || lower.includes('ethereum')) {
    return 'Crypto Insider';
  }
  if (lower.includes('politic') || lower.includes('election') || lower.includes('trump')) {
    return 'Political Analysis';
  }
  if (lower.includes('weather') || lower.includes('climate') || lower.includes('rain')) {
    return 'Weather Network';
  }
  if (lower.includes('tech') || lower.includes('ai')) {
    return 'Tech Trends';
  }
  return 'News Today';
}

/**
 * Format view count for display
 */
export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
}

