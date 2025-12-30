import React from 'react';

const MissionSection: React.FC = () => {
  return (
    <section id="mission" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.5em] outfit">Our Vision</span>
              <h2 className="text-5xl md:text-7xl font-black text-stone-900 outfit tracking-tighter leading-none">
                Transforming Intent into <span className="italic text-emerald-600">Action.</span>
              </h2>
            </div>
            
            <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              Pledge2025 was built on a simple belief: the collective weight of small, personal commitments is the greatest force for change in the world. 
              We provide a platform for citizens to publicly declare their resolutions, creating a ripple effect of accountability and inspiration.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <h4 className="font-black text-stone-900 outfit text-xl tracking-tight">Authenticity</h4>
                <p className="text-stone-400 text-sm">Every pledge is verified and tied to a unique digital identity.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-stone-900 outfit text-xl tracking-tight">Community</h4>
                <p className="text-stone-400 text-sm">Join a global network of changemakers sharing the same goal.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-stone-50 rounded-[4rem] overflow-hidden border border-stone-100 p-12 flex flex-col justify-center">
               <div className="space-y-8">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl">✨</div>
                  <h3 className="text-3xl font-black text-stone-900 outfit">A Sustainable Legacy</h3>
                  <p className="text-stone-500 leading-relaxed italic">
                    "We don't inherit the earth from our ancestors, we borrow it from our children. 2025 is the year we start paying back with better habits."
                  </p>
                  <div className="pt-4 flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-stone-200"></div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">David Chen</p>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Lead Strategist, Pledge Foundation</p>
                    </div>
                  </div>
               </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-stone-100 rounded-full -z-10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;