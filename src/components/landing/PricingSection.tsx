type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  ctaLabel: string;
};

const TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for personal projects and small websites.',
    features: [
      '5 monitors',
      '5-minute check intervals',
      'Email alerts',
      '7-day uptime history',
      'Public status page',
    ],
    highlighted: false,
    ctaLabel: 'Get Started Free',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For professionals who need more power and flexibility.',
    features: [
      '50 monitors',
      '1-minute check intervals',
      'Email, SMS & Slack alerts',
      '90-day uptime history',
      'Custom status page',
      'Full API access',
      'Priority support',
    ],
    highlighted: true,
    ctaLabel: 'Start Pro Trial',
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    description: 'For teams that require enterprise-grade reliability.',
    features: [
      'Unlimited monitors',
      '30-second check intervals',
      'All alert channels',
      'Unlimited history',
      'White-label status page',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
    ],
    highlighted: false,
    ctaLabel: 'Contact Sales',
  },
];

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const PricingSection = () => (
  <section id="pricing" className="bg-[#0a0a0f] py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
          Transparent Pricing
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Start free, scale as you grow
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          No hidden fees. No long-term contracts. Upgrade or cancel at any time.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
              tier.highlighted
                ? 'bg-blue-600/10 border-2 border-blue-500/50 shadow-xl shadow-blue-500/10'
                : 'bg-[#111118] border border-white/8 hover:border-white/15'
            }`}
          >
            {/* Popular badge */}
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/30">
                  Most Popular
                </span>
              </div>
            )}

            {/* Tier info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span
                  className={`text-4xl font-extrabold ${
                    tier.highlighted ? 'text-blue-400' : 'text-white'
                  }`}
                >
                  {tier.price}
                </span>
                <span className="text-gray-500 text-sm">{tier.period}</span>
              </div>
              <p className="text-gray-400 text-sm">{tier.description}</p>
            </div>

            {/* Feature list */}
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                tier.highlighted
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {tier.ctaLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
