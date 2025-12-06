import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { Markets } from './pages/Markets';
import { RainAnalysis } from './pages/RainAnalysis';
import { CryptoAnalysis } from './pages/CryptoAnalysis';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Markets />} />
            <Route path="/rain-analysis" element={<RainAnalysis />} />
            <Route path="/crypto-analysis" element={<CryptoAnalysis />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

