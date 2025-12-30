
import React from 'react';
import { CATEGORIES } from '../constants';
import { Pledge } from '../types';

interface PledgeSelectionProps {
  selectedCategory: string | null;
  onCategorySelect: (id: string) => void;
  onPledgeSelect: (pledge: Pledge) => void;
  onResetCategory: () => void;
  backgroundImages?: Record<string, string>;
}

const PledgeSelection: React.FC<PledgeSelectionProps> = ({ 
  selectedCategory, 
  onCategorySelect, 
  onPledgeSelect,
  onResetCategory,
  backgroundImages
}) => {
  
  // High-end Editorial Background Component
  const BackgroundAtmosphere = ({ image, label }: { image?: string, label?: string }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dynamic AI Background Image - Blurred Backdrop */}
      {image && (
        <div 
          className="absolute inset-0 opacity-[0.12] blur-[120px] scale-125 transition-all duration-1000"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}
      
      {/* Large Outlined Watermark (Vertical) */}
      {label && (
        <div className="absolute -right-40 top-0 bottom-0 font-black outfit text-[40rem] leading-none text-stone-900 opacity-[0.015] mix-blend-multiply whitespace-nowrap writing-vertical-lr select-none uppercase">
          {label.split(' ').slice(-1)[0]}
        </div>
      )}

      {/* Floating Light Accents */}
      <div className="absolute -top-20 -left-20 w-[60rem] h-[60rem] bg-emerald-100/20 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-stone-100/40 rounded-full blur-[120px]"></div>
      
      {/* Film Grain / Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.04] contrast-125 brightness-125" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );

  if (!selectedCategory) {
    return (
      <div className="w-full animate-fade-in px-6 py-24 lg:py-48 relative min-h-screen">
        <BackgroundAtmosphere image={backgroundImages?.main} label="2025" />

        <div className="max-w-6xl mx-auto space-y-32 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-0.5 bg-emerald-600"></div>
              <span className="text-emerald-600 font-black text-[11px] uppercase tracking-[0.6em] outfit">Pathway 01: Core Intent</span>
            </div>
            <h2 className="text-7xl sm:text-[11rem] font-black text-stone-900 outfit tracking-tighter leading-[0.85] uppercase">
              Define Your <br/><span className="italic text-emerald-600">Resolution.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-32">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className="group text-left space-y-12 flex flex-col relative"
              >
                <div className="relative">
                  <span className="text-9xl font-black text-emerald-500/10 group-hover:text-emerald-500/20 transition-all duration-700 outfit absolute -top-16 -left-6 -z-10 group-hover:scale-110">
                    0{idx + 1}
                  </span>
                  <h3 className="text-5xl font-black text-stone-900 outfit tracking-tighter group-hover:translate-x-4 transition-transform duration-500 uppercase">
                    {cat.label.split(' ').slice(1).join(' ')}
                  </h3>
                </div>

                <div className="space-y-8">
                  <p className="text-stone-400 text-xl font-light leading-relaxed max-w-xs group-hover:text-stone-700 transition-colors">
                    Commitments built for {cat.label.toLowerCase().split(' ').slice(1).join(' ')} and collective well-being.
                  </p>
                  
                  <div className="flex items-center space-x-6">
                    <div className="h-px w-12 bg-stone-200 group-hover:w-24 group-hover:bg-emerald-500 transition-all duration-700"></div>
                    <span className="text-emerald-600 font-black text-[10px] uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                      Step Inside
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);
  const catIndex = CATEGORIES.findIndex(c => c.id === selectedCategory) + 1;
  const catImage = backgroundImages?.[selectedCategory || ''];

  return (
    <div className="w-full animate-fade-in px-6 py-24 lg:py-48 relative min-h-screen">
      <BackgroundAtmosphere image={catImage} label={activeCategory?.label} />

      <div className="max-w-5xl mx-auto space-y-32 relative z-10">
        <div className="flex flex-col space-y-20">
          <button 
            onClick={onResetCategory}
            className="w-fit flex items-center space-x-5 text-stone-400 hover:text-emerald-600 transition-all group"
          >
            <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-white transition-all">
              <span className="text-2xl font-light">←</span>
            </div>
            <span className="font-black text-[11px] uppercase tracking-[0.4em] outfit">Return to Pillar Index</span>
          </button>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-8">
              <span className="text-8xl font-black text-emerald-500/20 outfit">0{catIndex}</span>
              <div className="h-px flex-1 bg-stone-100 max-w-[200px]"></div>
            </div>
            <h2 className="text-7xl sm:text-[10rem] font-black text-stone-900 outfit tracking-tighter leading-none uppercase">
              {activeCategory?.label.split(' ').slice(1).join(' ')}
            </h2>
            <p className="text-stone-400 font-light text-3xl max-w-2xl border-l-4 border-emerald-500/20 pl-10 italic leading-relaxed">
              "Every great transformation is powered by the small, consistent promises we keep to ourselves."
            </p>
          </div>
        </div>

        {/* Typographic Pledge List */}
        <div className="divide-y divide-stone-100/50">
          {activeCategory?.pledges.map((pledge, idx) => (
            <button
              key={pledge.id}
              onClick={() => onPledgeSelect(pledge)}
              className="group w-full py-20 flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-700 text-left"
            >
              <div className="flex items-start space-x-16 flex-1">
                <span className="text-stone-200 text-2xl font-black outfit group-hover:text-emerald-500 transition-colors pt-2">
                  #{idx + 1}
                </span>
                <div className="space-y-6">
                  <h3 className="text-5xl sm:text-7xl font-black text-stone-900 outfit tracking-tighter group-hover:text-emerald-800 transition-all duration-500 leading-tight">
                    {pledge.text}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-stone-400 text-2xl font-light translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                      Impact: {pledge.explanation}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 sm:mt-0 opacity-0 group-hover:opacity-100 group-hover:-translate-x-10 transition-all duration-700">
                <div className="w-24 h-24 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-3xl group-hover:bg-emerald-600 transition-colors">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PledgeSelection;
