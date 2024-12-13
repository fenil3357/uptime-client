import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';
import GoogleAuthCallback from './routes/GoogleAuth';
import NotFound from './components/NotFound';
import Dashboard from './routes/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define Layout with Navbar */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes */}
          <Route index element={<Home />} />
          <Route path="/auth/google" element={<GoogleAuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
