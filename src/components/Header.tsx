import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Droplets, Newspaper } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  lastUpdated?: Date | null;
  totalRainfall?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  lastUpdated,
  totalRainfall = 0
}) => {
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <TrendingUp size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">PredictHub</h1>
              <p className="text-primary-100 text-sm">Trade on Future Events</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {lastUpdated && (
              <div className="text-right">
                <div className="text-sm text-primary-100">Last Updated</div>
                <div className="text-sm font-medium">{formatLastUpdated()}</div>
              </div>
            )}
            <div className="text-right">
              <div className="text-sm text-primary-100">Total Volume</div>
              <div className="text-xl font-bold">$32.4M</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-100">Active Markets</div>
              <div className="text-xl font-bold">1,247</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search markets... (e.g., 'Bitcoin', 'Trump', 'Apple stock')"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="border border-white/20 rounded-lg p-4 bg-transparent">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} />
              <span className="text-sm text-primary-100">Trending News</span>
            </div>
            <Link
              to="/news"
              className="flex items-center justify-between px-3 py-3 bg-transparent text-white rounded-lg text-sm font-semibold border border-white/20 hover:border-white/40 transition-colors"
            >
              <span>Popular Stories</span>
              <Newspaper size={16} />
            </Link>
          </div>
          
          <div className="border border-white/20 rounded-lg p-4 bg-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Newspaper size={16} />
              <span className="text-sm text-primary-100">Latest News</span>
            </div>
            <Link
              to="/latest-news"
              className="inline-flex items-center justify-center w-full px-3 py-3 bg-transparent text-white rounded-lg text-sm font-semibold border border-white/20 hover:border-white/40 transition-colors"
            >
              View feeds
            </Link>
          </div>
          
          <Link 
            to="/rain-analysis" 
            className="border border-white/20 rounded-lg p-4 bg-transparent hover:border-white/40 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={16} className="group-hover:animate-bounce" />
              <span className="text-sm text-primary-100">Weather</span>
            </div>
            <div className="text-xl font-bold">{totalRainfall.toFixed(1)}mm</div>
            <div className="text-xs text-cyan-300 group-hover:underline">Click for analysis →</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

