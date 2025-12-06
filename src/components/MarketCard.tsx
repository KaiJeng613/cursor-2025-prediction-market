import React from 'react';
import { Market } from '../types';
import { TrendingUp, TrendingDown, Clock, DollarSign, Users, Flame } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onTrade: (market: Market) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market, onTrade }) => {
  const daysUntilEnd = Math.ceil(
    (new Date(market.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      crypto: 'bg-orange-100 text-orange-700 border-orange-200',
      stocks: 'bg-blue-100 text-blue-700 border-blue-200',
      politics: 'bg-purple-100 text-purple-700 border-purple-200',
      sports: 'bg-green-100 text-green-700 border-green-200',
      weather: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      news: 'bg-pink-100 text-pink-700 border-pink-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      crypto: '₿',
      stocks: '📈',
      politics: '🏛️',
      sports: '⚽',
      weather: '🌤️',
      news: '📰',
    };
    return icons[category] || '📊';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-300 group">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
              market.category
            )}`}
          >
            {getCategoryIcon(market.category)} {market.category.toUpperCase()}
          </span>
          {market.trending && (
            <span className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full animate-pulse">
              <Flame size={12} />
              Trending
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {market.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">{market.description}</p>

        {/* Price Info for Crypto/Stocks */}
        {(market.category === 'crypto' || market.category === 'stocks') && market.currentPrice && (
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Current:</span>
              <span className="font-bold text-gray-900">
                ${market.currentPrice.toLocaleString()}
              </span>
            </div>
            {market.priceChange24h !== undefined && (
              <div
                className={`flex items-center gap-1 ${
                  market.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {market.priceChange24h >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                <span className="font-semibold">{Math.abs(market.priceChange24h).toFixed(2)}%</span>
              </div>
            )}
          </div>
        )}

        {/* Weather Info */}
        {market.category === 'weather' && market.currentTemp && (
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Current:</span>
              <span className="font-bold text-gray-900">{market.currentTemp}°C</span>
            </div>
            {market.currentCondition && (
              <span className="text-gray-600">• {market.currentCondition}</span>
            )}
          </div>
        )}
      </div>

      {/* Probability Section */}
      <div className="p-5 bg-gray-50">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer">
            <div className="text-xs text-gray-600 mb-1">YES</div>
            <div className="text-2xl font-bold text-green-600">
              {(market.yesPrice * 100).toFixed(0)}¢
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {(market.yesPrice * 100).toFixed(1)}% chance
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border-2 border-red-200 hover:border-red-400 transition-colors cursor-pointer">
            <div className="text-xs text-gray-600 mb-1">NO</div>
            <div className="text-2xl font-bold text-red-600">
              {(market.noPrice * 100).toFixed(0)}¢
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {(market.noPrice * 100).toFixed(1)}% chance
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <DollarSign size={12} />
            <span className="font-medium">{formatVolume(market.volume)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span className="font-medium">{formatVolume(market.liquidity)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span className="font-medium">{daysUntilEnd}d left</span>
          </div>
        </div>

        {/* Trade Button */}
        <button
          onClick={() => onTrade(market)}
          className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 hover:scale-105 active:scale-100 shadow-md hover:shadow-lg"
        >
          Trade Now
        </button>
      </div>

      {/* Tags */}
      {market.tags && market.tags.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 bg-white">
          <div className="flex flex-wrap gap-1">
            {market.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {market.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{market.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

