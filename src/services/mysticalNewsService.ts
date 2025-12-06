import { ApifyClient } from 'apify-client';

export interface MysticalArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary?: string;
  tags?: string[];
}

const APIFY_API_KEY = import.meta.env.VITE_APIFY_API_KEY || '';

// Actors to try (documented only; will fall back to mock if unavailable)
// - apify/google-search-scraper
// - apify/actor-http-scraper (generic)
// - dtrungtin/serpapi-scraper (if configured)
const SEARCH_QUERIES = [
  'aliens sighting 2026',
  'ufo technosignature new evidence',
  'yeti dna evidence',
  'unicorn triple rainbow viral video',
  'dragon firestorm documentary',
];

export async function fetchMysticalNews(): Promise<MysticalArticle[]> {
  try {
    if (!APIFY_API_KEY) throw new Error('No Apify key configured');

    const client = new ApifyClient({ token: APIFY_API_KEY });

    // Use Google Search scraper actor as a generic fallback
    const run = await client.actor('apify/google-search-scraper').call({
      queries: SEARCH_QUERIES,
      maxPagesPerQuery: 1,
      proxyConfig: { useApifyProxy: true },
    });

    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return (items || []).slice(0, 12).map((item: any, idx: number) => ({
      id: item.url || `mystical-${idx}`,
      title: item.title || 'Mystical headline',
      url: item.url || '#',
      source: item.snippetSource || 'Search',
      publishedAt: item.date || new Date().toISOString(),
      summary: item.snippet || '',
      tags: ['mystical', 'speculative'],
    }));
  } catch (error) {
    console.error('❌ Apify mystical news failed, using mock data:', error);
    return [
      {
        id: 'mock-aliens',
        title: 'Scientists revisit Wow! signal — renewed debates on technosignatures',
        url: '#',
        source: 'Mock',
        publishedAt: new Date().toISOString(),
        summary: 'SETI teams reanalyze historical data looking for repeatable alien signals.',
        tags: ['aliens', 'seti'],
      },
      {
        id: 'mock-yeti',
        title: 'Expedition plans genetic survey of Himalayan “Yeti” habitats',
        url: '#',
        source: 'Mock',
        publishedAt: new Date().toISOString(),
        summary: 'Researchers to collect environmental DNA to test cryptid claims.',
        tags: ['yeti', 'dna'],
      },
      {
        id: 'mock-unicorn',
        title: 'Triple rainbow video gains traction on social platforms',
        url: '#',
        source: 'Mock',
        publishedAt: new Date().toISOString(),
        summary: 'Rare atmospheric optics spark mythical unicorn memes.',
        tags: ['unicorn', 'viral'],
      },
    ];
  }
}

