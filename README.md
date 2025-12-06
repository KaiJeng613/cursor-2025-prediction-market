# PredictHub - Prediction Market Platform

A modern, real-time prediction market platform for trading on future events including cryptocurrency prices, stock movements, political outcomes, sports events, and weather predictions.

## 🚀 Features

- **Real-time Crypto Price Integration**: Live cryptocurrency prices from CoinGecko API
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

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API Integration**: Axios
- **Data Sources**: 
  - CoinGecko API (crypto prices)
  - OpenWeatherMap API (weather data)

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
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

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

