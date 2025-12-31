import React from 'react';

const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-red-600 font-black text-[10px] uppercase tracking-[0.5em] outfit">Our Philosophy</span>
              <h2 className="text-5xl md:text-7xl font-black text-stone-900 outfit tracking-tighter leading-none">
                Design Your <span className="italic text-red-600">Destiny.</span>
              </h2>
            </div>

            <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Success isn't accidental; it's declared. By writing down your affirmations and resolutions for 2026, you are planting the seeds of your future reality. We provide the canvas for you to announce your journey to the world.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <h4 className="font-black text-stone-900 outfit text-xl tracking-tight">Accountability</h4>
                <p className="text-stone-400 text-sm">Making a public promise increases your chance of success by 65%.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-stone-900 outfit text-xl tracking-tight">Inspiration</h4>
                <p className="text-stone-400 text-sm">See what others are manifesting and find your own path.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-stone-50 rounded-[3rem] overflow-visible border border-stone-100 p-8 sm:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white text-2xl">✨</div>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 outfit">Your Best Self</h3>
                <p className="text-stone-500 leading-relaxed italic text-sm sm:text-base">
                  "The only limit to our realization of tomorrow will be our doubts of today. Believe in your vision for 2026."
                </p>
                <div className="pt-2 flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-stone-200 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">Hafiz Khan</p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Creator</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-50 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-stone-100 rounded-full -z-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;