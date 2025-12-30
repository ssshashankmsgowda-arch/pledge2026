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
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Poster width is 1080px
        const newScale = containerWidth / 1080;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-6 sm:p-10 space-y-10 bg-white/50 h-full max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-stone-900 outfit tracking-tight">Preview Your Affirmation</h2>
        <p className="text-stone-500 font-light">Confirm your details before manifesting.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div ref={containerRef} className="relative group w-full max-w-sm mx-auto overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white aspect-[1080/1350] bg-white">
          <div
            className="origin-top-left"
            style={{
              transform: `scale(${scale})`,
              width: '1080px',
              height: '1350px',
            }}
          >
            <Poster pledge={pledge} userData={userData} id="pledge-poster-preview" />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-6 border-t border-stone-100">
        <button
          onClick={onConfirm}
          className="w-full bg-stone-900 text-white font-black py-5 rounded-[1.5rem] transition-all duration-300 hover:bg-emerald-600 shadow-xl shadow-stone-100 active:scale-95 outfit text-lg"
        >
          Confirm & Finalize
        </button>
        <button
          onClick={onBack}
          className="text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-600 transition-colors"
        >
          Modify Details
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;