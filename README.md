# PredictHub - Prediction Market Platform

A modern, real-time prediction market platform for trading on future events including cryptocurrency prices, stock movements, political outcomes, sports events, and weather predictions with **comprehensive Malaysian rainfall analysis**.

## 🌐 Live Demo

Live on Vercel: [https://cursor-2025-prediction-market.vercel.app](https://cursor-2025-prediction-market.vercel.app)

## 🚀 Features

- **🔗 Etherscan API Integration**: Real-time Ethereum price updates every minute
- **💼 Wallet Connect**: Connect with MetaMask, Coinbase Wallet, and Rabby
- **Real-time Crypto Price Integration**: Live cryptocurrency prices from CoinGecko API + Etherscan
- **📊 Malaysian Rainfall Analysis**: Comprehensive rain tracking and predictions across all Malaysian states
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Multiple Market Categories**: 
  - 💰 Crypto Markets
  - 📈 Stock Markets
  - 🏛️ Political Events
  - ⚽ Sports Predictions
  - 🌤️ Weather Forecasts
  - 📰 News & Technology
- **Beautiful UI**: Modern, responsive design built with React and Tailwind CSS
- **Live Updates**: Auto-refresh market data every 5 minutes
- **Interactive Trading**: Intuitive trade modal with profit/loss calculations
- **Trending Markets**: Highlighted popular markets
- **Search & Filter**: Easy navigation through market categories

## 🔗 Etherscan Integration

The platform features comprehensive Etherscan API integration for real-time Ethereum data:

### Features:
- **Live ETH Price**: Updates every 60 seconds
- **Market Cap Calculation**: Real-time ETH supply × current price
- **Gas Price Tracking**: SafeLow, Standard, Fast, and Fastest gas prices
- **Network Activity**: Transaction count and active addresses
- **Network Utilization**: Real-time network usage metrics

### API Endpoints Used:
- `ethprice` - Current ETH/USD price
- `ethsupply` - Total ETH supply
- `gasoracle` - Current gas prices
- `tokenbalance` - ERC-20 token balances (for whale tracking)

### Update Frequency:
- **ETH Price**: Every 1 minute (60 seconds)
- **Market Data**: Every 5 minutes
- **Rainfall Data**: Every 5 minutes

The header displays live ETH price with "(Etherscan)" badge to indicate the data source.

## 🌧️ Rain Analysis Features

The platform includes a dedicated **Malaysian Rainfall Analysis** page featuring:

- **Real-time Data**: Fetches weather data using Apify's weather-fetcher
- **State-by-State Analysis**: Detailed rainfall data for all 14 Malaysian states
- **Interactive Charts**:
  - Bar chart showing rainfall by state
  - Line chart for rain probability predictions
  - Temperature and humidity comparisons
  - Pie chart for rainfall distribution
- **7-Day Forecasts**: Future rainfall predictions for each state
- **Smart Predictions**: AI-powered rain probability calculations based on:
  - Historical rainfall patterns
  - Current humidity levels
  - Temperature trends
  - Meteorological forecasts
- **Extremes Tracking**: Identifies wettest and driest states
- **Total Rainfall Metrics**: Aggregated data across Malaysia

Access the rainfall analysis by clicking the **"Total Rainfall MY"** stat in the header or navigating to `/rain-analysis`.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **Wallet Integration**: Wagmi v3 + Viem
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API Integration**: Axios
- **Data Sources**: 
  - **Etherscan API** (Ethereum price, gas prices, network activity)
  - CoinGecko API (crypto prices)
  - Apify weather-fetcher (rainfall data)
  - OpenWeatherMap API (weather data - optional)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cursor-2025-prediction-market
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up environment variables:
Create a `.env` file in the root directory:
```env
# Etherscan API Key (for real-time ETH price updates)
VITE_ETHERSCAN_API_KEY=X4BPCXS9KYCRECS5S34PEAUA6YXYGJ9727

# For rainfall analysis with real data
VITE_APIFY_API_KEY=your_apify_api_key

# Optional - for additional weather data
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

**Note**: The app works without API keys using mock data. The Etherscan API key is included in the code for immediate use.

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Header.tsx
│   ├── CategoryFilter.tsx
│   ├── MarketCard.tsx
│   └── TradeModal.tsx
├── data/              # Static data
│   ├── markets.ts
│   └── blogPosts.ts
├── services/          # API services
│   ├── cryptoService.ts
│   └── weatherService.ts
├── types/             # TypeScript types
│   └── index.ts
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Key Features Explained

### Real-time Crypto Updates
The app fetches live cryptocurrency prices from CoinGecko and automatically updates market probabilities based on:
- Current price vs target price
- Time remaining until market closes
- 24-hour price change

### Dynamic Probability Calculation
Market probabilities are calculated using:
- Price percentage change needed
- Time factor (more time = higher probability)
- Historical volatility patterns

### Weather Predictions
Weather markets integrate with OpenWeatherMap to provide:
- Current temperature and conditions
- Forecast data
- Probability calculations for weather events

## 🌐 API Integration

### CoinGecko (Crypto Prices)
- Free tier: 50 calls/minute
- No API key required
- Supported cryptocurrencies: BTC, ETH, SOL, XRP, and more

### OpenWeatherMap (Weather Data)
- Free tier: 1000 calls/day
- API key required
- Coverage: Malaysian cities and global locations

## 🎨 Customization

### Adding New Markets
Edit `src/data/markets.ts` to add new prediction markets:

```typescript
{
  id: 'unique-market-id',
  title: 'Your Market Question',
  description: 'Detailed description',
  category: 'crypto', // or 'stocks', 'politics', etc.
  yesPrice: 0.65,
  noPrice: 0.35,
  volume: 1000000,
  liquidity: 500000,
  endDate: '2026-12-31',
  tags: ['Tag1', 'Tag2']
}
```

### Changing Colors
Update Tailwind colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

## 📊 Market Categories

1. **Crypto**: Predictions on cryptocurrency prices (BTC, ETH, SOL, etc.)
2. **Stocks**: Stock market predictions (AAPL, TSLA, NVDA, etc.)
3. **Politics**: Election outcomes and political events
4. **Sports**: Sports championship and tournament predictions
5. **Weather**: Weather events and climate predictions
6. **News**: Technology and news event predictions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

ISC License

## 🙏 Acknowledgments

- CoinGecko for cryptocurrency price data
- OpenWeatherMap for weather data
- Lucide for beautiful icons
- Tailwind CSS for styling utilities

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

