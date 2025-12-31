
import React from 'react';

interface FooterProps {
  onPrivacyClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  return (
    <footer className="bg-stone-50 pt-20 pb-12 px-6 border-t border-stone-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">

        {/* Brand Section */}
        <div className="space-y-6 max-w-sm">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tighter text-stone-800 outfit">2026 Resolution</span>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            Empowering individuals to make a difference through commitment and community.
            Small changes today, for a sustainable 2026 and beyond.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex gap-12">
          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-800">Support</h4>
            <ul className="text-stone-400 text-sm space-y-3">
              <li>
                <button
                  onClick={onPrivacyClick}
                  className="hover:text-red-600 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/919940142349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-stone-300 text-[10px] font-bold uppercase tracking-[0.4em]">
        {/* Copyright removed per user request */}
      </div>
    </footer>
  );
};

export default Footer;
