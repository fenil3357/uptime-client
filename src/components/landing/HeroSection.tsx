import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGoogleAuthUrl } from '../../api/auth.api';
import { useUserContext } from '../../contexts/user.context';
import useToast from '../../hooks/useToast';
import useApi from '../../hooks/useApi';

// ─── Mock dashboard preview ────────────────────────────────────────────────
const MOCK_MONITORS = [
  { name: 'api.myapp.com',  code: 200, uptime: '99.9%', time: '142ms', up: true  },
  { name: 'app.myapp.com',  code: 200, uptime: '100%',  time: '98ms',  up: true  },
  { name: 'cdn.myapp.com',  code: 503, uptime: '98.2%', time: '—',     up: false },
  { name: 'blog.myapp.com', code: 200, uptime: '99.7%', time: '201ms', up: true  },
];

const CHART_BARS = [4, 7, 5, 8, 6, 9, 7, 8, 5, 7, 9, 8, 6, 9, 7, 8, 9, 8, 7, 9, 8, 9];

const DashboardPreview = () => (
  <div className="relative animate-float">
    {/* Glow halo */}
    <div className="absolute inset-0 bg-blue-600/15 blur-3xl rounded-3xl scale-95" />

    {/* Main card */}
    <div className="relative bg-[#111118] border border-white/10 rounded-2xl p-5 shadow-2xl min-w-[340px]">
      {/* Window controls */}
      <div className="flex items-center gap-1.5 mb-5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-auto text-xs text-gray-600 font-mono">uptime.monitor</span>
      </div>

      {/* Status header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-white">Monitor Status</span>
        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          3/4 Operational
        </span>
      </div>

      {/* Monitor rows */}
      <div>
        {MOCK_MONITORS.map((m, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  m.up ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              <span className="text-xs text-gray-300 font-mono">{m.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span
                className={`px-1.5 py-0.5 rounded font-mono ${
                  m.up
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {m.code}
              </span>
              <span className="text-gray-400 w-10 text-right">{m.uptime}</span>
              <span className="text-gray-600 w-10 text-right">{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div className="mt-4">
        <div className="flex items-end gap-0.5 h-10">
          {CHART_BARS.map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-blue-500/30 hover:bg-blue-400/50 transition-colors"
              style={{ height: `${(v / 10) * 100}%` }}
            />
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-1.5">Response time · Last 24h</p>
      </div>
    </div>

    {/* Floating alert badge */}
    <div className="absolute -bottom-6 -right-4 bg-[#111118] border border-white/10 rounded-xl p-3 shadow-xl w-44">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-xs font-semibold text-white">Alert Sent</span>
      </div>
      <p className="text-xs text-gray-400">
        cdn.myapp.com is <span className="text-red-400">down</span>
      </p>
      <p className="text-xs text-gray-600 mt-0.5">Just now · via Email</p>
    </div>
  </div>
);

// ─── Hero Section ──────────────────────────────────────────────────────────
const HeroSection = () => {
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] min-h-screen flex items-center">
      {/* Ambient background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: copy ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              AI-Powered Website Monitoring
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              Never Let{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Downtime
              </span>
              <br />
              Go Unnoticed
            </h1>

            {/* Sub-copy */}
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
              Monitor your websites and APIs 24/7 with intelligent uptime tracking. Get instant
              alerts when issues arise — before your customers ever notice.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleGetStarted}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:scale-105"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    {isLoggedIn ? 'Go to Dashboard' : 'Start Monitoring Free'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-gray-300 border border-white/15 rounded-xl hover:border-white/30 hover:text-white transition-all duration-200 font-semibold"
              >
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                See How It Works
              </button>
            </div>

            {/* Trust line */}
            <p className="text-sm text-gray-600">
              No credit card required&nbsp;·&nbsp;Free forever plan&nbsp;·&nbsp;Setup in 2 minutes
            </p>
          </div>

          {/* ── Right: dashboard preview ── */}
          <div className="hidden lg:flex justify-center items-center pr-6 pb-12">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
