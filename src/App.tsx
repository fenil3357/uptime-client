import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import GoogleAuthCallback from './routes/GoogleAuth';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Dashboard from './routes/Dashboard';
import { UserProvider } from './contexts/user.context';

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
