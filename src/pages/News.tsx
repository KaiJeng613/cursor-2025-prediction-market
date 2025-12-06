import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { Search, ArrowLeft, Bookmark, Flame, Tag, CloudSun, Newspaper, Youtube } from 'lucide-react';
import { fetchLindyNews, LindyArticle } from '../services/lindyService';
import { fetchTweetTopicNews, TweetNews } from '../services/tweetNewsService';
import { fetchYouTubeTopicNews, YouTubeNews, formatViews } from '../services/youtubeNewsService';

type Category = 'all' | BlogPost['category'];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'weather', label: 'Weather' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'politics', label: 'Politics' },
  { value: 'mystical', label: 'Mystical' },
  { value: 'general', label: 'General' },
];

const PostCard = ({ post, href }: { post: BlogPost; href: string }) => (
  <Link
    to={href}
    className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
  >
    <article>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
            {post.category.toUpperCase()}
          </span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-sm text-primary-600">
        <span className="font-semibold flex items-center gap-2">
          <Bookmark size={14} />
          Read More
        </span>
        <span className="text-gray-500 text-xs">Updated {post.date}</span>
      </div>
    </article>
  </Link>
);

export const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const [popularNews, setPopularNews] = useState<LindyArticle[]>([]);
  const [weatherNews, setWeatherNews] = useState<LindyArticle[]>([]);
  const [mysticalNews, setMysticalNews] = useState<TweetNews[]>([]);
  const [cryptoNews, setCryptoNews] = useState<TweetNews[]>([]);
  const [youtubeNews, setYoutubeNews] = useState<YouTubeNews[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchLindyNews();
        setPopularNews(res.popular);
        setWeatherNews(res.weather);

        const [mystical, crypto] = await Promise.all([
          fetchTweetTopicNews(
            ['aliens technosignature', 'ufo sighting', 'yeti dna evidence', 'unicorn triple rainbow']
          ),
          fetchTweetTopicNews(['crypto markets', 'bitcoin', 'ethereum price', 'layer2 volume']),
        ]);
        setMysticalNews(mystical.slice(0, 3));
        setCryptoNews(crypto.slice(0, 3));

        // Fetch YouTube news for crypto, politics, weather
        const ytNews = await fetchYouTubeTopicNews([
          'Bitcoin price prediction 2026',
          'Ethereum Layer 2 scaling',
          'US election 2026 predictions',
          'Malaysia weather forecast monsoon',
          'Climate change extreme weather'
        ]);
        setYoutubeNews(ytNews);
      } catch (e: any) {
        setError('Failed to load external news. Showing local articles instead.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, query]);

  const featured = filteredPosts.filter((p) => p.featured);
  const latest = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold">Back to Markets</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-2">📰 Popular News</h1>
          <p className="text-indigo-100 text-lg">
            Popular stories plus Weather highlights from our blog.
          </p>
          <div className="mt-4 text-sm text-indigo-100 flex items-center gap-2">
            <Newspaper size={16} /> Powered by Popular & Weather feeds
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news... (e.g., rainfall, ETH, elections)"
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                  selectedCategory === cat.value
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold">
              <Flame size={18} />
              <span>Featured</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((post) => (
                <PostCard key={post.id} post={post} href={`/news/${post.id}`} />
              ))}
            </div>
          </section>
        )}

        {/* Popular */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Newspaper size={18} />
            <span>Popular News</span>
            {isLoading && <span className="text-xs text-gray-500">Loading...</span>}
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
          {popularNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden p-5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                      {item.source || 'News'}
                    </span>
                    <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                  {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-sm">No popular news available right now.</p>
            </div>
          )}
        </section>

        {/* Mystical Tweets */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Newspaper size={18} />
            <span>Mystical Headlines (Twitter)</span>
          </div>
          {mysticalNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mysticalNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden p-5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                      {item.tags?.[0] || 'Mystical'}
                    </span>
                    <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                  {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
                  <div className="text-xs text-gray-500">
                    {item.author ? `by ${item.author}` : 'via Apify twitter scraper'}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-sm">No mystical headlines available right now.</p>
            </div>
          )}
        </section>

        {/* Crypto Tweets */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Newspaper size={18} />
            <span>Crypto Headlines (Twitter)</span>
          </div>
          {cryptoNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cryptoNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden p-5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                      {item.tags?.[0] || 'Crypto'}
                    </span>
                    <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                  {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
                  <div className="text-xs text-gray-500">
                    {item.author ? `by ${item.author}` : 'via Apify twitter scraper'}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-sm">No crypto headlines available right now.</p>
            </div>
          )}
        </section>

        {/* Weather */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <CloudSun size={18} />
            <span>Weather News</span>
          </div>
          {weatherNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weatherNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden p-5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 font-semibold">
                      {item.source || 'News'}
                    </span>
                    <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ''}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                  {item.summary && <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-sm">No weather news available right now.</p>
            </div>
          )}
        </section>

        {/* YouTube Videos */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Youtube size={18} />
            <span>Video Analysis (YouTube)</span>
          </div>
          {youtubeNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {youtubeNews.map((item) => (
                <a
                  key={item.id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="px-2 py-1 rounded-full bg-red-50 text-red-700 font-semibold">
                        YouTube
                      </span>
                      {item.views && <span>{formatViews(item.views)}</span>}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                    {item.summary && <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.channel}</span>
                      {item.publishedAt && (
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-sm">No video content available right now.</p>
            </div>
          )}
        </section>

        {/* Latest */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-semibold">
            <Bookmark size={18} />
            <span>All News</span>
          </div>
          {latest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map((post) => (
                <PostCard key={post.id} post={post} href={`/news/${post.id}`} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600 text-lg">No articles found for this filter.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

