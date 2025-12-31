
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#fcfcfb] pt-16 pb-4">
      {/* Simple clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50/30 via-transparent to-[#fcfcfb]"></div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center">

        {/* Main Headline - Using Outfit font */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-stone-900 tracking-tighter leading-[0.95] outfit">
          One honest intention<br />
          <span className="text-red-600 italic">for 2026</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-stone-500 max-w-xl mx-auto mt-4 leading-relaxed outfit">
          Share your resolution. Get personalised poster
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center bg-red-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 hover:bg-red-700 hover:scale-105 active:scale-95 shadow-xl shadow-red-100 outfit text-lg"
          >
            My 2026 Resolution
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
