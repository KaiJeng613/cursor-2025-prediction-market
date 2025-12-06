import React, { useState } from 'react';
import { Market } from '../types';
import { X, TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';

interface TradeModalProps {
  market: Market;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({ market, onClose }) => {
  const [tradeType, setTradeType] = useState<'yes' | 'no'>('yes');
  const [amount, setAmount] = useState<string>('100');
  const [shares, setShares] = useState<number>(0);

  const currentPrice = tradeType === 'yes' ? market.yesPrice : market.noPrice;

  const calculateShares = (investmentAmount: number) => {
    return investmentAmount / currentPrice;
  };

  const calculatePotentialReturn = (shareCount: number) => {
    return shareCount * 1; // Each share pays $1 if prediction is correct
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value) || 0;
    setShares(calculateShares(numValue));
  };

  const potentialReturn = calculatePotentialReturn(shares);
  const potentialProfit = potentialReturn - (parseFloat(amount) || 0);
  const profitPercentage = ((potentialProfit / (parseFloat(amount) || 1)) * 100).toFixed(2);

  const handleTrade = () => {
    // In a real app, this would submit the trade to the backend
    console.log('Trade executed:', {
      marketId: market.id,
      type: tradeType,
      amount: parseFloat(amount),
      shares,
      price: currentPrice,
    });
    
    alert(`Trade executed! You bought ${shares.toFixed(2)} ${tradeType.toUpperCase()} shares for $${amount}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Place Trade</h2>
              <p className="text-sm text-gray-600 line-clamp-2">{market.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Market Info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Category</span>
                <span className="font-semibold text-gray-900 capitalize">{market.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Volume</span>
                <span className="font-semibold text-gray-900">
                  ${(market.volume / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Liquidity</span>
                <span className="font-semibold text-gray-900">
                  ${(market.liquidity / 1000000).toFixed(2)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Closes</span>
                <span className="font-semibold text-gray-900">
                  {new Date(market.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Trade Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Choose Outcome
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTradeType('yes')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    tradeType === 'yes'
                      ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="text-green-600" size={24} />
                    <span className="text-lg font-bold text-green-600">YES</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {(market.yesPrice * 100).toFixed(0)}¢
                  </div>
                  <div className="text-xs text-gray-600">
                    {(market.yesPrice * 100).toFixed(1)}% probability
                  </div>
                </button>

                <button
                  onClick={() => setTradeType('no')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    tradeType === 'no'
                      ? 'border-red-500 bg-red-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingDown className="text-red-600" size={24} />
                    <span className="text-lg font-bold text-red-600">NO</span>
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {(market.noPrice * 100).toFixed(0)}¢
                  </div>
                  <div className="text-xs text-gray-600">
                    {(market.noPrice * 100).toFixed(1)}% probability
                  </div>
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Investment Amount
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  min="1"
                  step="1"
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                  placeholder="100"
                />
              </div>
              <div className="flex gap-2 mt-3">
                {[50, 100, 250, 500, 1000].map((presetAmount) => (
                  <button
                    key={presetAmount}
                    onClick={() => handleAmountChange(presetAmount.toString())}
                    className="flex-1 px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    ${presetAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Trade Summary */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 space-y-3">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Trade Summary</h3>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Shares to Buy</span>
                <span className="font-bold text-gray-900 text-lg">
                  {shares.toFixed(2)} {tradeType.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Price per Share</span>
                <span className="font-bold text-gray-900">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-primary-200 pt-3 mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">If you win</span>
                  <span className="font-bold text-green-600 text-xl">
                    +${potentialProfit.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-green-600 font-semibold">
                    {potentialProfit > 0 ? '+' : ''}{profitPercentage}% return
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">If you lose</span>
                <span className="font-bold text-red-600">
                  -${amount}
                </span>
              </div>
            </div>

            {/* Warning */}
            <div className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">Trading Risk Notice</p>
                <p>
                  Prediction markets involve risk. You may lose your entire investment. Only invest
                  what you can afford to lose.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleTrade}
                disabled={!amount || parseFloat(amount) <= 0}
                className={`flex-1 px-6 py-4 font-semibold rounded-xl transition-all shadow-lg ${
                  tradeType === 'yes'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-100`}
              >
                Buy {tradeType.toUpperCase()} for ${amount}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

