import { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { MarketCard } from '../components/MarketCard';
import { TradeModal } from '../components/TradeModal';
import { sampleMarkets } from '../data/markets';
import { Market, MarketCategory } from '../types';
import { updateCryptoMarketPredictions } from '../services/cryptoService';
import { fetchMalaysianRainData, calculateTotalMalaysianRainfall } from '../services/rainService';
import { fetchEthData, calculateTotalCryptoMarketCap } from '../services/etherscanService';

export const Markets = () => {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [markets, setMarkets] = useState<Market[]>(sampleMarkets);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [totalRainfall, setTotalRainfall] = useState(0);
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [ethPrice, setEthPrice] = useState<number>(0);

  // Fetch and update crypto prices from Etherscan every minute
  useEffect(() => {
    const updatePrices = async () => {
      setIsLoading(true);
      try {
        // Fetch ETH data from Etherscan
        const ethData = await fetchEthData();
        setEthPrice(ethData.price);
        
        // Update crypto markets with CoinGecko data
        const updatedMarkets = await updateCryptoMarketPredictions(markets);
        
        // Update ETH-related markets with Etherscan data
        const finalMarkets = updatedMarkets.map(market => {
          if (market.title.toLowerCase().includes('ethereum') || market.title.toLowerCase().includes('eth')) {
            return {
              ...market,
              currentPrice: ethData.price,
              priceChange24h: ethData.change24h,
              lastUpdated: new Date().toISOString()
            };
          }
          return market;
        });
        
        setMarkets(finalMarkets);
        setLastUpdated(new Date());
        
        // Calculate total market cap from Etherscan
        const marketCap = await calculateTotalCryptoMarketCap();
        setTotalMarketCap(marketCap);
        
        console.log(`✅ Updated prices - ETH: $${ethData.price.toFixed(2)} | Market Cap: $${(marketCap / 1e9).toFixed(2)}B`);
      } catch (error) {
        console.error('Failed to update crypto prices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch rainfall data
    const updateRainfall = async () => {
      try {
        const rainData = await fetchMalaysianRainData();
        const total = calculateTotalMalaysianRainfall(rainData);
        setTotalRainfall(total);
      } catch (error) {
        console.error('Failed to fetch rainfall data:', error);
      }
    };

    // Update immediately on mount
    updatePrices();
    updateRainfall();

    // Update crypto prices every 1 minute (using Etherscan)
    const priceInterval = setInterval(updatePrices, 60 * 1000);
    
    // Update rainfall every 5 minutes
    const rainInterval = setInterval(updateRainfall, 5 * 60 * 1000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(rainInterval);
    };
  }, []);

  // Manual refresh function
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Fetch ETH data from Etherscan
      const ethData = await fetchEthData();
      setEthPrice(ethData.price);
      
      const updatedMarkets = await updateCryptoMarketPredictions(markets);
      
      // Update ETH-related markets
      const finalMarkets = updatedMarkets.map(market => {
        if (market.title.toLowerCase().includes('ethereum') || market.title.toLowerCase().includes('eth')) {
          return {
            ...market,
            currentPrice: ethData.price,
            priceChange24h: ethData.change24h,
            lastUpdated: new Date().toISOString()
          };
        }
        return market;
      });
      
      setMarkets(finalMarkets);
      setLastUpdated(new Date());
      
      const rainData = await fetchMalaysianRainData();
      const total = calculateTotalMalaysianRainfall(rainData);
      setTotalRainfall(total);
      
      const marketCap = await calculateTotalCryptoMarketCap();
      setTotalMarketCap(marketCap);
      
      console.log(`🔄 Manual refresh - ETH: $${ethData.price.toFixed(2)}`);
    } catch (error) {
      console.error('Failed to update data:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        lastUpdated={lastUpdated}
        totalMarketCap={totalMarketCap}
        totalRainfall={totalRainfall}
        ethPrice={ethPrice}
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
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 PredictHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

