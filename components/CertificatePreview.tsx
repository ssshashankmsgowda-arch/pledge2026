import React, { useRef, useState, useEffect } from 'react';
import { Pledge, UserData } from '../types';
import Poster from './Poster';

interface CertificatePreviewProps {
  pledge: Pledge;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onBack: () => void;
  onConfirm: () => void;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ pledge, userData, onBack, onConfirm }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Poster width is 1080px - use 95% of container width
        const newScale = (containerWidth * 0.95) / 1080;
        setScale(Math.min(newScale, 0.65)); // Cap at 0.65 for desktop
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Calculate the scaled height for proper layout
  const scaledHeight = 1440 * scale;

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Header - Minimal padding on mobile */}
      <div className="text-center pt-4 pb-3 sm:pt-6 sm:pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 outfit tracking-tight">Your 2026 Resolution</h2>
        <p className="text-emerald-600 font-medium text-sm">Confirm your details before generating.</p>
      </div>

      {/* Poster Container - Takes up available space */}
      <div
        ref={containerRef}
        className="flex-1 flex items-start justify-center px-2 sm:px-4"
      >
        <div
          className="relative shadow-2xl rounded-lg overflow-hidden bg-white"
          style={{
            width: 1080 * scale,
            height: scaledHeight
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: '1080px',
              height: '1440px'
            }}
          >
            <Poster pledge={pledge} userData={userData} />
          </div>
        </div>
      </div>

      {/* Bottom Buttons - Fixed at bottom with minimal padding */}
      <div className="sticky bottom-0 bg-white border-t border-stone-100 p-4 sm:p-6 space-y-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <button
          onClick={onConfirm}
          className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:bg-emerald-600 shadow-lg active:scale-95 outfit text-base"
        >
          Confirm & Finalize
        </button>
        <button
          onClick={onBack}
          className="w-full text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-600 transition-colors py-2"
        >
          Modify Details
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;