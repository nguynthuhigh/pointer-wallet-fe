import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';

export function App() {
  return (
    <div class={`p-4`}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Home />} /> 
        </Routes>
      </Router>
    </div>
  );
}
