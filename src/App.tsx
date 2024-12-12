import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/Home';
// import FeaturesPage from './components/Features'; // Placeholder for Features
// import PricingPage from './components/Pricing'; // Placeholder for Pricing
// import AboutPage from './components/About'; // Placeholder for About

function App() {
  return (
    <Router>
      <Routes>
        {/* Define Layout with Navbar */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes */}
          <Route index element={<HomePage />} />
          {/* <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="about" element={<AboutPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
