import { useState } from 'react';
import { useUserContext } from '../contexts/user.context';
import useToast from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { getGoogleAuthUrl } from '../api/auth.api';
import useApi from '../hooks/useApi';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useUserContext();
  const showToast = useToast();
  const navigate = useNavigate();
  const axiosInstance = useApi();

  const [navigation] = useState([
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About Us', href: '/about' },
    { name: isLoggedIn ? 'Logout' : 'Login', href: '/' },
  ]);

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start">
            <a href="/" className="text-2xl font-bold">
              UPTIME
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                className="text-lg font-medium hover:text-blue-400"
                onClick={async () => {
                  if (item.name === 'Logout') {
                    logout();
                    showToast('Logged out successfully!', 'success');
                    navigate('/');
                    window.location.reload();
                    return;
                  }

                  if (item.name == 'Login') {
                    const url: string = await getGoogleAuthUrl(axiosInstance);
                    window.location.href = url;
                    return;
                  }

                  navigate(item?.href || '/');
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="space-y-2 px-4 py-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={async () => {
                  if (item.name === 'Logout') {
                    logout();
                    showToast('Logged out successfully!', 'success');
                    navigate('/');
                    window.location.reload()
                    return;
                  }

                  if (item.name == 'Login') {
                    const url: string = await getGoogleAuthUrl(axiosInstance);
                    window.location.href = url;
                    return;
                  }

                  navigate(item.href || '/');
                }}
                className="block text-lg font-medium text-gray-300 hover:text-blue-400"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
