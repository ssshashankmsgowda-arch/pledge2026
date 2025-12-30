
import React from 'react';
import { Category } from '../types';

interface CategoryHeroProps {
  category: Category;
  image: string | null;
  onAction: () => void;
  reversed?: boolean;
}

const CategoryHero: React.FC<CategoryHeroProps> = ({ category, image, onAction, reversed }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <section 
        onClick={onAction}
        className={`cursor-pointer group relative flex flex-col md:flex-row items-stretch overflow-hidden bg-white rounded-[2.5rem] border border-stone-200 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-50/50 ${reversed ? 'md:flex-row-reverse' : ''}`}
      >
        {/* Visual side */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-auto relative overflow-hidden bg-stone-100">
          {image && (
            <img 
              src={image} 
              alt={category.label} 
              className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        {/* Content side */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-emerald-600 font-black text-[9px] uppercase tracking-[0.4em] outfit">Pathway 2025</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 outfit tracking-tighter leading-none">
              {category.label.replace(/^.*?\s/, '')}
            </h2>
            <p className="text-stone-500 font-light text-base leading-relaxed max-w-md">
              Focus on {category.label.toLowerCase()} through community-proven, sustainable commitments that drive real impact.
            </p>
          </div>

          <div className="inline-flex items-center space-x-4 bg-stone-900 text-white px-8 py-4 rounded-2xl group-hover:bg-emerald-600 transition-all duration-300 w-fit">
            <span className="font-bold text-[11px] uppercase tracking-widest">Explore Category</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryHero;
