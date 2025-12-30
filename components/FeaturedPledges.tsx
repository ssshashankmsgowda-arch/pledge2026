import React, { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../constants';
import { Pledge } from '../types';

interface FeaturedPledgesProps {
  onSelect: (pledge: Pledge) => void;
}

const FeaturedPledges: React.FC<FeaturedPledgesProps> = ({ onSelect }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  const featured = [
    CATEGORIES[0].pledges[2], // Plastic
    CATEGORIES[1].pledges[1], // Exercise
    CATEGORIES[2].pledges[0], // Screen time
    CATEGORIES[0].pledges[0], // Public transport
    CATEGORIES[1].pledges[2], // Water
    CATEGORIES[2].pledges[2], // Routine
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const interval = setInterval(() => {
      const cardWidth = 280 + 20; // Width + gap
      const currentScroll = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (currentScroll >= maxScroll - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollTo({ left: currentScroll + cardWidth, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-1">
          <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em] outfit">Rolling Commitments</span>
          <h2 className="text-3xl font-black text-stone-900 outfit tracking-tighter">Featured Pledges</h2>
        </div>
        <p className="text-stone-400 font-medium max-w-xs text-xs leading-relaxed">
          The community is making these promises right now. Select one to join.
        </p>
      </div>

      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex overflow-x-auto pb-6 gap-5 no-scrollbar scroll-smooth snap-x"
      >
        {featured.map((pledge, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(pledge)}
            className="flex-shrink-0 w-[260px] md:w-[280px] h-[220px] bg-white rounded-[2rem] p-8 flex flex-col justify-between text-left group transition-all duration-300 hover:bg-emerald-600 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100 snap-center border border-stone-100"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-white/20 group-hover:text-white transition-all">
                {idx % 3 === 0 ? '🌊' : idx % 3 === 1 ? '🏃' : '📱'}
              </div>
              <h3 className="text-lg font-black text-stone-800 outfit group-hover:text-white transition-colors leading-tight line-clamp-3">
                {pledge.text}
              </h3>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-[9px] font-black uppercase tracking-widest group-hover:text-emerald-100">
                Pledge Now
              </span>
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPledges;