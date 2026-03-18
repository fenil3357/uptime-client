import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../contexts/user.context';
import useToast from '../hooks/useToast';
import { getGoogleAuthUrl } from '../api/auth.api';
import useApi from '../hooks/useApi';

const NAV_LINKS = [
  { label: 'Features', id: 'features' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Pricing', id: 'pricing' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, logout, user } = useUserContext();
  const showToast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useApi();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogin = async () => {
    try {
      const url = await getGoogleAuthUrl(axiosInstance);
      window.location.href = url;
    } catch {
      showToast('Unable to login. Please try again.', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully!', 'success');
    navigate('/');
    window.location.reload();
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/40 transition-shadow">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight group-hover:text-blue-400 transition-colors">
              UPTIME
            </span>
          </button>

          {/* Desktop nav links — shown only on home page */}
          {isHome && (
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-400 hover:text-white font-medium text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Desktop right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  Dashboard
                </button>
                <div className="relative group">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 hover:ring-blue-500/60 transition-all cursor-pointer"
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#111118] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1.5">
                    <div className="px-4 py-2.5 border-b border-white/8">
                      <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors px-3 py-2"
                >
                  Log in
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-105"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0f]/98 backdrop-blur-md">
          <nav className="px-4 py-3 space-y-1">
            {isHome &&
              NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                  className="block w-full text-left px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-2 pb-1">
                <button
                  onClick={handleLogin}
                  className="block w-full text-center py-2.5 text-gray-300 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={handleLogin}
                  className="block w-full text-center py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
