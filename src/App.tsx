import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Markets } from './pages/Markets';
import { RainAnalysis } from './pages/RainAnalysis';
import { CryptoAnalysis } from './pages/CryptoAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/rain-analysis" element={<RainAnalysis />} />
        <Route path="/crypto-analysis" element={<CryptoAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;

