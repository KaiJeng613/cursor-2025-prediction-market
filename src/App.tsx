import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Markets } from './pages/Markets';
import { RainAnalysis } from './pages/RainAnalysis';
import { CryptoAnalysis } from './pages/CryptoAnalysis';
import { News } from './pages/News';
import { NewsArticle } from './pages/NewsArticle';
import { LatestNews } from './pages/LatestNews';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path="/rain-analysis" element={<RainAnalysis />} />
          <Route path="/crypto-analysis" element={<CryptoAnalysis />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/latest-news" element={<LatestNews />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

