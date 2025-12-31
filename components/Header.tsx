
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onCtaClick: () => void;
  isPledging: boolean;
  onExit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick, isPledging, onExit }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isPledging ? 'bg-white/80 backdrop-blur-lg border-b border-stone-100 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={onExit} className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold transition-transform group-hover:rotate-12">P</div>
          <span className="font-bold text-xl tracking-tighter text-stone-800 outfit">2026 Resolution</span>
        </button>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-stone-500 uppercase tracking-widest">
          {/* Navigation links removed per user request */}
        </nav>

        {!isPledging ? (
          <button
            onClick={onCtaClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform active:scale-95 shadow-lg shadow-emerald-100"
          >
            Start Manifesting
          </button>
        ) : (
          <button
            onClick={onExit}
            className="text-stone-400 hover:text-stone-800 font-bold text-xs uppercase tracking-widest transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            <span>Exit Flow</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
