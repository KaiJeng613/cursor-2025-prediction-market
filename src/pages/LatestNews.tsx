import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, Newspaper, CloudRain, Landmark, Sparkles, Heart, Search, X } from 'lucide-react';
import { fetchTweetTopicNews, TweetNews } from '../services/tweetNewsService';
import { fetchYouTubeTopicNews, YouTubeNews, formatViews } from '../services/youtubeNewsService';
import { fetchRedNoteTopicNews, RedNotePost, formatLikes } from '../services/redNoteService';

type NewsCategory = 'all' | 'crypto' | 'technology' | 'weather' | 'politics' | 'mystical' | 'lifestyle';

const categories: { value: NewsCategory; label: string; icon: any; topics: string[] }[] = [
  { 
    value: 'all', 
    label: 'All News', 
    icon: Newspaper,
    topics: []
  },
  { 
    value: 'crypto', 
    label: 'Crypto', 
    icon: TrendingUp,
    topics: ['Bitcoin price', 'Ethereum Layer 2', 'DeFi protocols', 'Crypto markets', 'NFT trends']
  },
  { 
    value: 'technology', 
    label: 'Technology', 
    icon: Sparkles,
    topics: ['AI developments', 'Tech innovations', 'Software updates', 'Silicon Valley', 'Tech startups']
  },
  { 
    value: 'weather', 
    label: 'Weather', 
    icon: CloudRain,
    topics: ['Malaysia weather', 'Climate change', 'Extreme weather', 'Monsoon forecast', 'Weather alerts']
  },
  { 
    value: 'politics', 
    label: 'Politics', 
    icon: Landmark,
    topics: ['US election 2026', 'Political analysis', 'Policy changes', 'Government news', 'Election polls']
  },
  { 
    value: 'mystical', 
    label: 'Mystical', 
    icon: Sparkles,
    topics: ['UFO sightings', 'Alien technosignature', 'Yeti evidence', 'Bigfoot DNA', 'Paranormal activity']
  },
  { 
    value: 'lifestyle', 
    label: 'Lifestyle', 
    icon: Heart,
    topics: ['Fashion trends China', 'Beauty products Asia', 'Travel destinations', 'Food culture', 'Investment tips']
  },
];

export const LatestNews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') || 'all') as NewsCategory;
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [tweets, setTweets] = useState<TweetNews[]>([]);
  const [videos, setVideos] = useState<YouTubeNews[]>([]);
  const [redNotePosts, setRedNotePosts] = useState<RedNotePost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update search query when URL params change
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let allTopics: string[] = [];
        
        if (category === 'all') {
          // Aggregate topics from all categories
          allTopics = categories
            .filter(c => c.value !== 'all')
            .flatMap(c => c.topics);
        } else {
          // Get topics for selected category
          const selectedCategory = categories.find(c => c.value === category);
          allTopics = selectedCategory?.topics || [];
        }
        
        const [tweetData, videoData, redNoteData] = await Promise.all([
          fetchTweetTopicNews(allTopics),
          fetchYouTubeTopicNews(allTopics),
          fetchRedNoteTopicNews(allTopics)
        ]);
        
        setTweets(tweetData);
        setVideos(videoData);
        setRedNotePosts(redNoteData);
      } catch (e: any) {
        setError('Failed to load news');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [category]);

  const allNews = [...tweets, ...videos, ...redNotePosts].sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0).getTime();
    const dateB = new Date(b.publishedAt || 0).getTime();
    return dateB - dateA;
  });

  // Filter news by search query
  const filteredNews = allNews.filter(item => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.summary?.toLowerCase().includes(query) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const clearSearch = () => {
    setSearchQuery('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (newCategory: NewsCategory) => {
    setSearchQuery(''); // Clear search when category changes
    const newParams = new URLSearchParams();
    if (newCategory !== 'all') {
      newParams.set('category', newCategory);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold">Back to Markets</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-2">📰 Latest News</h1>
          <p className="text-slate-100 text-lg">
            Aggregated news from Twitter, YouTube, and RedNote across all topics.
          </p>
          {searchQuery && (
            <div className="mt-4 flex items-center gap-2 text-slate-200">
              <Search size={16} />
              <span>Filtering for: <strong>{searchQuery}</strong></span>
              <button
                onClick={clearSearch}
                className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
                title="Clear search"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {isLoading && <div className="text-sm text-slate-200 mt-2">Loading...</div>}
          {error && <div className="text-sm text-red-200 mt-2">{error}</div>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search news... (e.g., 'Bitcoin', 'China', 'AI')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    category === cat.value
                      ? 'bg-slate-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {cat.label}
                  {category === cat.value && (
                    <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      {filteredNews.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 && !isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-600">
            <Newspaper size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg mb-2">
              {searchQuery ? `No news found for "${searchQuery}"` : 'No news available for this category right now.'}
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNews.map((item) => {
              const isVideo = 'thumbnail' in item;
              const isRedNote = 'likes' in item && !('views' in item);
              return (
                <a
                  key={item.id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 overflow-hidden"
                >
                  {isVideo && (item as YouTubeNews).thumbnail && (
                    <img
                      src={(item as YouTubeNews).thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className={`px-2 py-1 rounded-full font-semibold ${
                        isVideo 
                          ? 'bg-red-50 text-red-700' 
                          : isRedNote
                          ? 'bg-pink-50 text-pink-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {isVideo ? 'YouTube' : isRedNote ? 'RedNote' : 'Twitter'}
                      </span>
                      {isVideo && (item as YouTubeNews).views && (
                        <span className="flex items-center gap-1">
                          {formatViews((item as YouTubeNews).views!)}
                        </span>
                      )}
                      {isRedNote && (item as RedNotePost).likes && (
                        <span className="flex items-center gap-1">
                          <Heart size={12} className="fill-pink-500 text-pink-500" />
                          {formatLikes((item as RedNotePost).likes!)}
                        </span>
                      )}
                      {item.publishedAt && !isVideo && !isRedNote && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                    {item.summary && <p className="text-sm text-gray-600 line-clamp-3">{item.summary}</p>}
                    <div className="text-xs text-gray-500">
                      {isVideo 
                        ? `${(item as YouTubeNews).channel}` 
                        : isRedNote
                        ? `@${(item as RedNotePost).author}`
                        : (item as TweetNews).author ? `by ${(item as TweetNews).author}` : 'Community'
                      }
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

