import { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { MarketCard } from './components/MarketCard';
import { TradeModal } from './components/TradeModal';
import { sampleMarkets } from './data/markets';
import { Market, MarketCategory } from './types';
import { updateCryptoMarketPredictions } from './services/cryptoService';
import type { BlogPost } from './data/blogPosts';
import { blogPosts } from './data/blogPosts';
import { fetchLatestWeatherNews } from './services/weatherNewsService';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>(sampleMarkets);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [weatherNews, setWeatherNews] = useState<BlogPost[]>([]);

  // Fetch and update crypto prices on mount and periodically
  useEffect(() => {
    const updatePrices = async () => {
      setIsLoading(true);
      try {
        const updatedMarkets = await updateCryptoMarketPredictions(markets);
        setMarkets(updatedMarkets);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to update crypto prices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Update immediately on mount
    updatePrices();

    // Update every 5 minutes
    const interval = setInterval(updatePrices, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadWeatherNews = async () => {
      const latestNews = await fetchLatestWeatherNews();
      if (!isMounted) return;

      if (latestNews.length > 0) {
        setWeatherNews(latestNews);
      } else {
        const fallbackPosts = blogPosts
          .filter((post) => post.category === 'weather')
          .slice(0, 3);
        setWeatherNews(fallbackPosts);
      }
    };

    loadWeatherNews();

    return () => {
      isMounted = false;
    };
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const updatedMarkets = await updateCryptoMarketPredictions(markets);
      setMarkets(updatedMarkets);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to update crypto prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      const matchesCategory =
        selectedCategory === 'all' || market.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [markets, selectedCategory, searchQuery]);

  const trendingMarkets = useMemo(() => {
    return markets.filter((market) => market.trending);
  }, [markets]);

  const latestWeatherInsights = weatherNews.length
    ? weatherNews
    : blogPosts.filter((post) => post.category === 'weather').slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        lastUpdated={lastUpdated}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trending Section */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🔥 Trending Markets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onTrade={setSelectedMarket}
                />
              ))}
            </div>
          </section>
        )}

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary-600 font-semibold">
                Weather Intel
              </p>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🌦️ Latest Weather News Signals
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              Fused with LINDY code {import.meta.env.VITE_LINDY_CODE || '50AGENTS'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestWeatherInsights.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden>
                    {post.imageEmoji || '🌤️'}
                  </span>
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-MY', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide">
                      {post.author}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 overflow-hidden text-ellipsis max-h-20">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* All Markets */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Markets' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Markets`}
            </h2>
            <span className="text-gray-600">
              {filteredMarkets.length} market{filteredMarkets.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredMarkets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map((market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onTrade={setSelectedMarket}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No markets found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Trade Modal */}
      {selectedMarket && (
        <TradeModal
          market={selectedMarket}
          onClose={() => setSelectedMarket(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">PredictHub</h3>
              <p className="text-gray-600 text-sm">
                The leading prediction market platform for trading on future events.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Markets</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">Crypto</a></li>
                <li><a href="#" className="hover:text-primary-600">Stocks</a></li>
                <li><a href="#" className="hover:text-primary-600">Politics</a></li>
                <li><a href="#" className="hover:text-primary-600">Sports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">How it Works</a></li>
                <li><a href="#" className="hover:text-primary-600">Documentation</a></li>
                <li><a href="#" className="hover:text-primary-600">API</a></li>
                <li><a href="#" className="hover:text-primary-600">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-600">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">About Us</h4>
              <p className="text-gray-600 text-sm">
                We are a distributed team of researchers, traders, and product builders
                who believe prediction markets make the future more transparent. Follow
                along as we ship new data tools, curated insights, and trading
                experiences every week.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  Email:{' '}
                  <a
                    href="mailto:support@predicthub.io"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    support@predicthub.io
                  </a>
                </li>
                <li>
                  Partnerships:{' '}
                  <a
                    href="mailto:partners@predicthub.io"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    partners@predicthub.io
                  </a>
                </li>
                <li>
                  Community:{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Join Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 PredictHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

