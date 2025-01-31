import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Home from './routes/Home';
import GoogleAuthCallback from './routes/GoogleAuth';
import Monitor from './routes/Monitor';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import Dashboard from './routes/Dashboard';
import { UserProvider } from './contexts/user.context';
import AuthorizationContainer from './components/AuthorizationContainer';
import CreateMonitor from './routes/CreateMonitor';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <Router>
          <AuthorizationContainer>
            <Routes>
              {/* Define Layout with Navbar */}
              <Route path="/" element={<Layout />}>
                {/* Nested Routes */}
                <Route index element={<Home />} />
                <Route path="/auth/google" element={<GoogleAuthCallback />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/monitor' element={<Monitor />} />
                <Route path='/monitor/create' element={<CreateMonitor />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthorizationContainer>
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
}

export default App;
