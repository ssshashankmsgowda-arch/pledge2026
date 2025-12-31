
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#fcfcfb] pb-8">
      {/* Simple clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50/30 via-transparent to-[#fcfcfb]"></div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">

        {/* Main Headline - Using Outfit font */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-stone-900 tracking-tighter leading-[0.95] outfit">
          One honest promise<br />
          <span className="text-red-600 italic">for the year ahead</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-stone-500 max-w-xl mx-auto mt-6 leading-relaxed outfit">
          Not a resolution list. Just one thing you truly want to commit to in 2026.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 hover:bg-red-700 hover:scale-105 active:scale-95 shadow-xl shadow-red-100 outfit text-lg"
          >
            Create My Promise
          </button>
        </div>

        {/* Micro text below CTA */}
        <p className="mt-4 text-xs text-stone-400 tracking-wide outfit">
          Simple · Takes under a minute
        </p>

        {/* Below Hero Text - Moved down */}
        <div className="mt-20 max-w-md mx-auto">
          <p className="text-sm text-stone-400 leading-relaxed outfit">
            You don't need big goals here.<br />
            Just write something you'd like to stay true to this year.<br />
            <span className="font-medium text-stone-500">That's it.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
