# PredictHub

A modern, real-time prediction market for trading on crypto, equities, politics, sports, news, and Malaysian rainfall insights—all backed by live data integrations and a polished React + Tailwind experience.

## Live Demo
- **Production**: [https://cursor-2025-prediction-market.vercel.app](https://cursor-2025-prediction-market.vercel.app)
- Deployed on Vercel with automatic builds from `main`

## Product Highlights
- **Real-time trading desk** with live probabilities, liquidity, and volume tracking across every market type
- **Wallet-first UX** using WalletConnect (MetaMask, Coinbase Wallet, Rabby) with onboarding guardrails
- **Etherscan + CoinGecko data fusion** for ETH pricing, gas metrics, and trending crypto markets refreshed every minute
- **Malaysian rainfall intelligence hub** delivering state-level telemetry, AI-driven predictions, and multi-chart storytelling
- **Actionable news and research**: curated feeds, category filters, and quick links keep traders informed without leaving the app
- **Responsive, accessible UI** built with React 18, TypeScript, Tailwind CSS, and Recharts for data visualization

## Core Experiences
### Multi-Market Trading
Markets cover crypto, equities, politics, sports, weather, and tech news. Each card surfaces price targets, odds, liquidity, and settlement dates, while the trade modal exposes profit/loss projections before order submission.

### Malaysian Rainfall Analysis
A dedicated `/rain-analysis` route aggregates Apify + OpenWeather data into bar, line, and pie charts, outlines 7-day forecasts for 14 states, and calls out wettest/driest regions to support commodities and climate-linked markets.

### Research Layer
`/news`, `/latest-news`, and `/crypto-analysis` pages consolidate blog posts, trending alerts, and video summaries sourced from custom services so users can move from insight to trade in one flow.

## Integrations & Data Sources
| Domain | Provider | Usage |
| --- | --- | --- |
| Ethereum metrics | Etherscan API | ETH price, total supply, gas oracle, whale tracking |
| Crypto pricing | CoinGecko API | Live prices and volatility inputs for markets |
| Weather & rainfall | Apify weather-fetcher, OpenWeatherMap | Real-time rainfall, humidity, temperature forecasts |
| News feeds | Custom services (`lindy`, `mysticalNews`, `tweetNews`, `youtubeNews`) | Curated news, sentiment, and trending topics |

## Architecture & Tech Stack
- **Framework**: React 18 + TypeScript, Vite build system, React Router v6
- **Styling & UI**: Tailwind CSS, Lucide React icons, custom chart components
- **State & Data**: Wagmi v3 + Viem for wallet integrations, Axios for HTTP services
- **Tooling**: ESLint, PostCSS, Vite preview/build scripts, Vercel deployment

## Project Structure
```
src/
├─ App.tsx               # Page composition + layout shell
├─ main.tsx              # Entry point with router + providers
├─ index.css             # Global Tailwind layer
├─ components/           # Header, CategoryFilter, MarketCard, TradeModal, WalletConnectModal
├─ pages/                # Markets, News, RainAnalysis, LatestNews, CryptoAnalysis
├─ data/                 # Static seeds for markets and blog posts
├─ services/             # API clients (crypto, weather, news, rainfall, etc.)
├─ types/                # Shared TypeScript contracts
├─ config/wagmi.ts       # Wallet connector configuration
```

## Getting Started
1. **Clone & install**
   ```bash
   git clone <repository-url>
   cd cursor-2025-prediction-market
   npm install
   ```
2. **Set environment variables** (optional if you prefer mock data):
   ```env
   VITE_ETHERSCAN_API_KEY=<your-etherscan-api-key>
   VITE_APIFY_API_KEY=<your-apify-api-key>
   VITE_WEATHER_API_KEY=<your-openweather-api-key>
   ```
3. **Run locally**
   ```bash
   npm run dev
   ```
   The dev server defaults to `http://localhost:3000`.

## Production Build & Preview
```bash
npm run build
npm run preview
```

## Available Scripts
- `npm run dev` – launch Vite dev server
- `npm run build` – produce an optimized production bundle
- `npm run preview` – serve the production build locally
- `npm run lint` – run ESLint with the configured ruleset

## Contributing
Issues and pull requests are welcome. Please include context, screenshots (if UI-related), and a short test plan when proposing changes.

## License
ISC License. See `LICENSE` (or the license header in package.json) for details.

## Support
For questions or feedback, please open an issue or reach out via the contact method listed in the repository.
