type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarGradient: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Uptime has been a game-changer for our engineering team. We used to find out about outages from frustrated customers on Twitter. Now we're notified within seconds and can start fixing issues immediately.",
    name: 'Sarah Mitchell',
    role: 'CTO',
    company: 'TechStartup Inc.',
    initials: 'SM',
    avatarGradient: 'from-blue-500 to-cyan-500',
  },
  {
    quote:
      'We were losing potential revenue due to undetected downtime. Since switching to Uptime, our average incident response time has dropped from 45 minutes to under 2 minutes. The ROI has been incredible.',
    name: 'James Kim',
    role: 'DevOps Lead',
    company: 'ShopFlow',
    initials: 'JK',
    avatarGradient: 'from-violet-500 to-purple-600',
  },
  {
    quote:
      "The AI-powered insights are genuinely impressive. It predicted a performance degradation 20 minutes before our server went down. That kind of proactive monitoring is invaluable when you're running at scale.",
    name: 'Maya Rodriguez',
    role: 'Senior Developer',
    company: 'CloudSaaS',
    initials: 'MR',
    avatarGradient: 'from-emerald-500 to-teal-600',
  },
];

const Stars = () => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="bg-[#0d0d15] py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-sm font-medium mb-4">
          Loved by Developers
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Trusted by thousands of teams
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          See what engineering teams around the world say about Uptime.
        </p>
      </div>

      {/* Testimonial cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-[#111118] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all duration-300 flex flex-col"
          >
            <Stars />

            {/* Quote */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">"{t.quote}"</p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/8">
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
