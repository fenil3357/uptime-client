import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGoogleAuthUrl } from '../../api/auth.api';
import { useUserContext } from '../../contexts/user.context';
import useToast from '../../hooks/useToast';
import useApi from '../../hooks/useApi';

const CTASection = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();
  const showToast = useToast();
  const axiosInstance = useApi();

  const handleGetStarted = async () => {
    setLoading(true);
    try {
      if (isLoggedIn) {
        navigate('/dashboard');
        return;
      }
      const url = await getGoogleAuthUrl(axiosInstance);
      window.location.href = url;
    } catch (error: any) {
      showToast(
        error?.response?.data?.message || 'Something went wrong. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#0a0a0f] py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-indigo-600/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Start monitoring your website{' '}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            right now
          </span>
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of developers who trust Uptime to keep their services running.
          Get started for free — no credit card needed.
        </p>

        <button
          onClick={handleGetStarted}
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started for Free'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        <p className="text-gray-600 text-sm mt-4">
          Free plan includes 5 monitors forever. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
