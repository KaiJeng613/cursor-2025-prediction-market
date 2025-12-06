export interface RedNotePost {
  id: string;
  title: string;
  url: string;
  author?: string;
  publishedAt?: string;
  likes?: number;
  summary?: string;
  tags?: string[];
}

/**
 * Fetch RedNote (Xiaohongshu/小红书) posts for specific topics
 * Note: Actual scraping requires backend proxy
 */
export async function fetchRedNoteTopicNews(topics: string[]): Promise<RedNotePost[]> {
  try {
    console.warn('⚠️ RedNote scraping disabled in browser. Using mock data with RedNote search links.');
    
    // Generate mock RedNote posts for each topic
    const now = new Date();
    const mockPosts: RedNotePost[] = [];
    
    topics.forEach((topic, idx) => {
      const baseDate = new Date(now.getTime() - idx * 7200000); // 2 hours apart
      
      mockPosts.push({
        id: `rednote-${topic.replace(/\s+/g, '-')}-${idx}-${Date.now()}`,
        title: `${topic} - RedNote Community Discussion`,
        url: `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(topic)}`,
        author: getAuthorForTopic(topic),
        publishedAt: baseDate.toISOString(),
        likes: Math.floor(Math.random() * 50000) + 1000,
        summary: `Trending discussion on ${topic} from RedNote community. See what creators are saying.`,
        tags: topic.split(' '),
      });
    });
    
    return mockPosts;
  } catch (error) {
    console.error('❌ RedNote news fetch failed:', error);
    return [];
  }
}

/**
 * Get representative author name for topic
 */
function getAuthorForTopic(topic: string): string {
  const lower = topic.toLowerCase();
  
  if (lower.includes('crypto') || lower.includes('bitcoin')) {
    return 'CryptoExpert_CN';
  }
  if (lower.includes('tech') || lower.includes('ai')) {
    return 'TechInsider_SH';
  }
  if (lower.includes('fashion') || lower.includes('beauty')) {
    return 'StyleCreator_BJ';
  }
  if (lower.includes('food') || lower.includes('travel')) {
    return 'LifestyleBlogger_GZ';
  }
  if (lower.includes('invest') || lower.includes('stock')) {
    return 'FinanceGuru_CN';
  }
  
  return 'RedNoteUser';
}

/**
 * Format likes count for display
 */
export function formatLikes(likes: number): string {
  if (likes >= 10000) {
    return `${(likes / 10000).toFixed(1)}万 likes`;
  }
  if (likes >= 1000) {
    return `${(likes / 1000).toFixed(1)}K likes`;
  }
  return `${likes} likes`;
}

