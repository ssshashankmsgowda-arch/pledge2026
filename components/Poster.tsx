import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  return (
    <div
      ref={innerRef}
      id={id || "pledge-poster"}
      className="w-[1080px] h-[1440px] relative overflow-hidden bg-white"
    >
      {/* Custom Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/custom_poster.png"
          alt="Certificate Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-stone-100 -z-10 flex items-center justify-center text-stone-400">
          <span className="text-2xl font-bold uppercase tracking-widest">Poster Background 1080x1440</span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full">

        {/* Photo Overlay - Situated in the watch face circle (Top Left) */}
        {/* Adjusted based on the new 1080x1440 template visual */}
        <div className="absolute top-[80px] left-[70px] w-[500px] h-[500px] rounded-full overflow-hidden rotate-[-12deg] z-10">
          {userData.photo ? (
            <img src={userData.photo} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200/50">
              <span className="text-gray-400 font-bold">PHOTO</span>
            </div>
          )}
        </div>

        {/* Name Overlay - "DEAR [NAME]" */}
        {/* Positioned to cover the "SHASHANK GOWDA" text on the template */}
        <div className="absolute top-[1020px] left-[180px] z-20 bg-[#fcfcfb] px-4 py-2 -ml-4 rounded-lg">
          <h2 className="text-[40px] font-black uppercase text-[#3e2b26] tracking-wide leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
            {userData.fullName || 'YOUR NAME'}
          </h2>
        </div>

        {/* Pledge Text - Placed below the name */}
        <div className="absolute top-[1100px] left-[100px] w-[880px] z-20 bg-[#fcfcfb]/90 p-6 rounded-xl shadow-sm">
          <p className="text-[28px] leading-relaxed font-medium text-[#3e2b26] text-center italic" style={{ fontFamily: 'Outfit, sans-serif' }}>
            "{pledge.text}"
          </p>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-6 right-10 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-stone-900">
          #PL2025-VERIFIED
        </div>

      </div>
    </div>
  );
};

export default Poster;