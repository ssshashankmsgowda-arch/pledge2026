
import React from 'react';

const ImpactSection: React.FC = () => {
  const stats = [
    { label: 'Resolutions Set', value: '42,850', sub: 'Goals Defined' },
    { label: 'Dreams Manifested', value: '120k', sub: 'Success Stories' },
    { label: 'Positive Days', value: '500k', sub: 'Mindful Living' },
    { label: 'Habits Changed', value: '25k', sub: 'Transformations' },
  ];

  return (
    <section id="impact" className="py-32 bg-[#fcfcfb] relative overflow-hidden border-y border-stone-100">
      {/* Background Watermark Numbers (Subtle) */}
      <div className="absolute inset-0 flex items-center justify-around opacity-[0.03] select-none pointer-events-none font-black outfit text-[40rem] leading-none overflow-hidden">
        <span>2</span>
        <span>0</span>
        <span>2</span>
        <span>5</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-4">
          <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.5em] outfit">Why It Works</span>
          <h2 className="text-5xl sm:text-7xl font-black text-stone-900 outfit tracking-tighter leading-none">Power of Intention</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
              <div className="space-y-2">
                <p className="text-6xl sm:text-7xl font-black text-stone-900 outfit tracking-tighter transition-transform duration-500 group-hover:scale-110 group-hover:text-emerald-600">
                  {stat.value}
                </p>
                <div className="h-1 w-12 bg-emerald-100 mx-auto rounded-full group-hover:w-24 group-hover:bg-emerald-500 transition-all duration-500"></div>
              </div>
              <div className="space-y-1">
                <h3 className="text-[11px] font-black text-stone-800 uppercase tracking-[0.4em] outfit">{stat.label}</h3>
                <p className="text-stone-400 text-xs font-light">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
