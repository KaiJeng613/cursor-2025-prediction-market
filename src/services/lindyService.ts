import axios from 'axios';
import { BlogPost, getFeaturedPosts } from '../data/blogPosts';

export interface LindyArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary?: string;
  category?: string;
  tags?: string[];
}

type LindyResponse = {
  articles: LindyArticle[];
};

const LINDY_API_KEY = '50AGENTS';
const LINDY_API_BASE = 'https://api.lindy.ai/v1/news';

/**
 * Fetch popular and weather news from Lindy.
 * Falls back to local blog posts if API fails.
 */
export async function fetchLindyNews(): Promise<{
  popular: LindyArticle[];
  weather: LindyArticle[];
}> {
  try {
    const [popularRes, weatherRes] = await Promise.all([
      axios.get<LindyResponse>(`${LINDY_API_BASE}/popular`, {
        headers: { Authorization: `Bearer ${LINDY_API_KEY}` },
        params: { limit: 10 },
      }),
      axios.get<LindyResponse>(`${LINDY_API_BASE}/search`, {
        headers: { Authorization: `Bearer ${LINDY_API_KEY}` },
        params: { q: 'weather OR rainfall OR monsoon', limit: 10 },
      }),
    ]);

    return {
      popular: popularRes.data.articles || [],
      weather: weatherRes.data.articles || [],
    };
  } catch (error) {
    console.error('❌ Lindy API failed, using fallback blog posts:', error);
    // Fallback: map featured/local blog posts into LindyArticle shape
    const fallbackPosts: BlogPost[] = getFeaturedPosts().slice(0, 5);
    const mapped = fallbackPosts.map((p) => ({
      id: p.id,
      title: p.title,
      url: '#',
      source: 'PredictHub Blog',
      publishedAt: p.date,
      summary: p.excerpt,
      category: p.category,
      tags: p.tags,
    }));
    return {
      popular: mapped,
      weather: mapped.filter((p) => p.category === 'weather'),
    };
  }
}

