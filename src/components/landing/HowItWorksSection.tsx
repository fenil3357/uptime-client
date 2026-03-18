import React from 'react';

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Add Your Website',
    description:
      'Enter your website URL or API endpoint. Choose check intervals from 30 seconds to 60 minutes and configure the regions you want to monitor from.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Configure Your Alerts',
    description:
      'Choose your notification channels — email, SMS, Slack, or webhooks. Set escalation policies and on-call schedules so the right person is always notified.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Monitor & Stay Informed',
    description:
      'Sit back while Uptime watches over your services round the clock. Receive instant notifications, explore real-time dashboards, and analyse historical data.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="bg-[#0d0d15] py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
          Simple Setup
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Up and running in minutes
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          No complex configuration required. Start monitoring your first website
          in under two minutes.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Horizontal connector (desktop only) */}
        <div className="hidden md:block absolute top-10 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-blue-500/40" />

        {STEPS.map((step, index) => (
          <div key={step.number} className="relative text-center group">
            {/* Icon circle */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-blue-600/15 rounded-2xl group-hover:bg-blue-600/25 transition-colors" />
              <div className="relative z-10 text-blue-400">{step.icon}</div>
              {/* Step number badge */}
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-600/30">
                {index + 1}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
