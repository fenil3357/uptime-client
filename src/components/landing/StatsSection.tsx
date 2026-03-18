type Stat = {
  value: string;
  label: string;
  description: string;
};

const STATS: Stat[] = [
  {
    value: '99.9%',
    label: 'Average Uptime Tracked',
    description: 'Across all monitored services',
  },
  {
    value: '<60s',
    label: 'Alert Response Time',
    description: 'From detection to notification',
  },
  {
    value: '10K+',
    label: 'Active Monitors',
    description: 'Websites and APIs monitored',
  },
  {
    value: '50+',
    label: 'Check Locations',
    description: 'Global monitoring network',
  },
];

const StatsSection = () => (
  <section className="bg-[#0d0d15] border-y border-white/5 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center group">
            <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1 group-hover:from-blue-300 group-hover:to-indigo-300 transition-all">
              {stat.value}
            </div>
            <div className="text-white font-semibold text-sm sm:text-base mb-1">
              {stat.label}
            </div>
            <div className="text-gray-600 text-xs sm:text-sm hidden sm:block">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
