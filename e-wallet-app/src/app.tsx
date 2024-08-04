import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import History from '../src/pages/history'
export function App() {
  return (
    <div class={`p-4 font-inter`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction/history" element={<History />} />
          <Route path="*" element={<Home />} /> 
        </Routes>
      </Router>
    </div>
  );
}
