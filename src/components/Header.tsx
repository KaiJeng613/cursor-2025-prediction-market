import React from 'react';
import { Search, TrendingUp, BarChart3, Activity, RefreshCw } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  lastUpdated?: Date | null;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onRefresh,
  isLoading = false,
  lastUpdated 
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
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
              <Activity size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">PredictHub</h1>
              <p className="text-primary-100 text-sm">Trade on Future Events</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {lastUpdated && (
              <div className="text-right">
                <div className="text-sm text-primary-100">Last Updated</div>
                <div className="text-sm font-medium">{formatLastUpdated()}</div>
              </div>
            )}
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'Updating...' : 'Refresh'}
              </button>
            )}
            <div className="text-right">
              <div className="text-sm text-primary-100">Total Volume</div>
              <div className="text-xl font-bold">$32.4M</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-primary-100">Active Markets</div>
              <div className="text-xl font-bold">1,247</div>
            </div>
            <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Connect Wallet
            </button>
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
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} />
              <span className="text-sm text-primary-100">24h Volume</span>
            </div>
            <div className="text-xl font-bold">$4.2M</div>
            <div className="text-xs text-green-300">+12.5%</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={16} />
              <span className="text-sm text-primary-100">Total Liquidity</span>
            </div>
            <div className="text-xl font-bold">$18.7M</div>
            <div className="text-xs text-green-300">+8.3%</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} />
              <span className="text-sm text-primary-100">Active Traders</span>
            </div>
            <div className="text-xl font-bold">12,453</div>
            <div className="text-xs text-green-300">+5.7%</div>
          </div>
        </div>
      </div>
    </header>
  );
};

