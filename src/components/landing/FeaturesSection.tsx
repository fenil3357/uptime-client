import React from 'react';

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Real-Time Monitoring',
    description:
      "Check your websites every 30 seconds from multiple global locations. Get an accurate, instant picture of your site's availability and performance.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: 'Instant Alerts',
    description:
      'Get notified the moment your site goes down via email, SMS, Slack, or webhooks. Never be the last to know about an outage again.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    badge: 'Popular',
  },
  {
    title: 'Uptime Reports',
    description:
      'Visualize your uptime history with beautiful charts. Identify patterns, track SLA compliance, and share polished reports with stakeholders.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
  },
  {
    title: 'SSL Certificate Monitoring',
    description:
      'Stay ahead of certificate expirations. Receive timely alerts before your SSL cert expires and avoid embarrassing browser security warnings.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'API Monitoring',
    description:
      'Monitor REST and GraphQL APIs with custom request configurations, headers, payloads, and expected response validation rules.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    badge: 'New',
  },
  {
    title: 'AI-Powered Insights',
    description:
      'Leverage machine learning to detect anomalies and predict potential issues before they impact your users. Stay one step ahead of problems.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
];

const FeaturesSection = () => (
  <section id="features" className="bg-[#0a0a0f] py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
          Everything You Need
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Monitoring built for modern teams
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From simple uptime checks to advanced API monitoring, Uptime gives you the tools
          to keep your services running at peak performance.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="group bg-[#111118] border border-white/8 rounded-2xl p-6 hover:border-blue-500/30 hover:bg-[#111120] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-blue-600/15 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600/25 transition-colors flex-shrink-0">
                {feature.icon}
              </div>
              {/* Optional badge */}
              {feature.badge && (
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    feature.badge === 'New'
                      ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                      : 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {feature.badge}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
