import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortenPage from './components/ShortenPage';
import StatsPage from './components/StatsPage';
import RedirectPage from './components/RedirectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:code" element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;