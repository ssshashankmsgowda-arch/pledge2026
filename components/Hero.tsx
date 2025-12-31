
import React, { useState, useEffect } from 'react';

interface HeroSlide {
  image: string | null;
  title1: string;
  title2: string;
  subtitle: string;
}

interface HeroProps {
  onStart: () => void;
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ onStart, slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#fcfcfb]">
      {/* Background Images - Using Opacity for clean cross-fade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image && (
              <img 
                src={slide.image} 
                alt="" 
                className="w-full h-full object-cover opacity-25"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fcfcfb]/40 via-transparent to-[#fcfcfb]"></div>
          </div>
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
        <div className="mb-8 inline-flex items-center space-x-3 px-4 py-1.5 bg-white/80 border border-red-100 rounded-full shadow-sm backdrop-blur-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-[10px] font-black text-red-800 uppercase tracking-[0.4em] outfit">Pathway 2025</span>
        </div>

        {/* Text Area - Cross-fading instead of sliding to avoid mobile overflow issues */}
        <div className="relative w-full h-[220px] sm:h-[280px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-[0.95] outfit">
                {slide.title1}<br />
                <span className="text-red-600 italic">{slide.title2}</span>
              </h1>
              <p className="text-sm sm:text-lg text-stone-600 max-w-lg mx-auto mt-6 leading-relaxed font-light">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center bg-stone-900 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95 shadow-xl shadow-stone-200 outfit text-lg"
          >
            Choose Your Path
          </button>
        </div>

        {/* Progress Dots */}
        <div className="mt-12 flex items-center justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-1.5 rounded-full bg-stone-200 transition-all duration-500 overflow-hidden"
              style={{ width: index === currentIndex ? '32px' : '8px' }}
            >
              {index === currentIndex && (
                <div className="h-full bg-red-600 animate-[progress_5s_linear_infinite] origin-left" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
