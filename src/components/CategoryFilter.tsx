import React from 'react';
import { MarketCategory } from '../types';

interface CategoryFilterProps {
  selectedCategory: MarketCategory | 'all';
  onCategoryChange: (category: MarketCategory | 'all') => void;
}

const categories: { value: MarketCategory | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: 'All Markets', icon: '🌐' },
  { value: 'crypto', label: 'Crypto', icon: '₿' },
  { value: 'stocks', label: 'Stocks', icon: '📈' },
  { value: 'politics', label: 'Politics', icon: '🏛️' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'weather', label: 'Weather', icon: '🌤️' },
  { value: 'news', label: 'News & Tech', icon: '📰' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200
            flex items-center gap-2
            ${
              selectedCategory === category.value
                ? 'bg-primary-600 text-white shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }
          `}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.label}</span>
          {selectedCategory === category.value && (
            <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

