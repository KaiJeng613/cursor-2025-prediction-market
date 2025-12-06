import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, TrendingDown, DollarSign, 
  Activity, BarChart3, RefreshCw, ExternalLink 
} from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { fetchEthData } from '../services/etherscanService';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export const CryptoAnalysis = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [total24hVolume, setTotal24hVolume] = useState(0);
  const [btcDominance, setBtcDominance] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadCryptoData();
    const interval = setInterval(loadCryptoData, 60 * 1000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadCryptoData = async () => {
    setIsLoading(true);
    try {
      // Fetch top 10 cryptocurrencies from CoinGecko
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
            price_change_percentage: '24h,7d'
          }
        }
      );

      const data = response.data;
      
      // Update ETH data from Etherscan if available
      try {
        const ethData = await fetchEthData();
        const ethIndex = data.findIndex((c: CryptoData) => c.symbol.toLowerCase() === 'eth');
        if (ethIndex !== -1) {
          data[ethIndex].current_price = ethData.price;
          data[ethIndex].market_cap = ethData.marketCap;
        }
      } catch (error) {
        console.error('Failed to update ETH from Etherscan:', error);
      }

      setCryptoData(data);
      
      // Calculate totals
      const totalMC = data.reduce((sum: number, coin: CryptoData) => sum + coin.market_cap, 0);
      const totalVol = data.reduce((sum: number, coin: CryptoData) => sum + coin.total_volume, 0);
      
      setTotalMarketCap(totalMC);
      setTotal24hVolume(totalVol);
      
      // Calculate BTC dominance
      const btcMarketCap = data[0]?.market_cap || 0;
      setBtcDominance((btcMarketCap / totalMC) * 100);
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load crypto data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(decimals)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatSupply = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(0);
  };

  const COLORS = ['#F7931A', '#627EEA', '#26A17B', '#345D9D', '#F0B90B', '#2775CA', '#000000', '#E84142', '#1E3A8A', '#8247E5'];

  const pieChartData = cryptoData.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    value: coin.market_cap,
    percentage: ((coin.market_cap / totalMarketCap) * 100).toFixed(2)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold">Back to Markets</span>
            </Link>
            <button
              onClick={loadCryptoData}
              disabled={isLoading}
              className="bg-white/10 px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">💰 Cryptocurrency Market Analysis</h1>
            <p className="text-yellow-100 text-lg">
              Top 10 cryptocurrencies by market capitalization with real-time data
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={20} />
                <span className="text-sm text-yellow-100">Total Market Cap</span>
              </div>
              <div className="text-3xl font-bold">{formatNumber(totalMarketCap)}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={20} />
                <span className="text-sm text-yellow-100">24h Volume</span>
              </div>
              <div className="text-3xl font-bold">{formatNumber(total24hVolume)}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={20} />
                <span className="text-sm text-yellow-100">BTC Dominance</span>
              </div>
              <div className="text-3xl font-bold">{btcDominance.toFixed(2)}%</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} />
                <span className="text-sm text-yellow-100">Last Updated</span>
              </div>
              <div className="text-sm font-medium">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Loading...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Market Cap Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Market Cap Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name} ${entry.percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((_entry, _index) => (
                    <Cell key={`cell-${_index}`} fill={COLORS[_index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatNumber(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Price Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">24h Price Change (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cryptoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="symbol" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price_change_percentage_24h" fill="#8884d8"                >
                  {cryptoData.map((entry) => (
                    <Cell key={`cell-${entry.id}`} fill={entry.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crypto Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Top 10 Cryptocurrencies</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h %</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume 24h</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Circulating Supply</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cryptoData.map((coin) => (
                  <tr key={coin.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {coin.market_cap_rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="font-semibold text-gray-900">{coin.name}</div>
                          <div className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="font-semibold text-gray-900">
                        ${coin.current_price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`flex items-center justify-end gap-1 font-semibold ${
                        coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {coin.price_change_percentage_24h > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {formatNumber(coin.market_cap)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {formatNumber(coin.total_volume)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {formatSupply(coin.circulating_supply)} {coin.symbol.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <a
                        href={`https://www.coingecko.com/en/coins/${coin.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">View</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">📊 About This Data</h3>
          <p className="text-gray-700 mb-4">
            This cryptocurrency market analysis displays real-time data for the top 10 cryptocurrencies 
            by market capitalization. Data is sourced from CoinGecko API with Ethereum prices enhanced 
            by Etherscan for maximum accuracy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-orange-700">Data Sources:</strong>
              <p className="text-gray-600">CoinGecko API, Etherscan API</p>
            </div>
            <div>
              <strong className="text-orange-700">Update Frequency:</strong>
              <p className="text-gray-600">Every 60 seconds (1 minute)</p>
            </div>
            <div>
              <strong className="text-orange-700">Cryptocurrencies:</strong>
              <p className="text-gray-600">Top 10 by market cap</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

