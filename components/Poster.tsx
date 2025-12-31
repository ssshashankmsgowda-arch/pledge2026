import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  // === TRANSFORM-FREE IMPLEMENTATION ===
  // All positions are ABSOLUTE PIXELS - no transform, no translate
  // Canvas: 1080px x 1440px

  // Dynamic font size calculation for vertical name
  const calculateNameFontSize = (name: string): number => {
    const charCount = name.length || 1;
    const containerHeight = 1300;
    let fontSize = Math.floor(containerHeight / (charCount * 0.77));
    return Math.max(60, Math.min(250, fontSize));
  };

  const nameFontSize = calculateNameFontSize(userData.fullName);

  return (
    <div
      ref={innerRef}
      id={id || "pledge-poster"}
      style={{
        width: '1080px',
        height: '1440px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff'
      }}
    >
      {/* BACKGROUND IMAGE */}
      <img
        src="/poster_final2.png"
        alt="Background"
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '1080px',
          height: '1440px',
          objectFit: 'cover',
          zIndex: 1
        }}
        crossOrigin="anonymous"
      />

      {/* ============================================= */}
      {/* 1. USER NAME - Vertical Text using SVG       */}
      {/* ============================================= */}
      {/* SVG handles rotation more reliably in html2canvas */}
      <svg
        style={{
          position: 'absolute',
          top: '0px',
          left: '2px',
          width: '250px',
          height: '1440px',
          zIndex: 10,
          overflow: 'visible'
        }}
      >
        <text
          x="125"
          y="720"
          textAnchor="middle"
          dominantBaseline="middle"
          transform="rotate(-90, 125, 720)"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            fontSize: `${nameFontSize}px`,
            fill: '#e63946',
            textTransform: 'uppercase',
            letterSpacing: '0.02em'
          }}
        >
          {(userData.fullName || 'YOUR NAME').toUpperCase()}
        </text>
      </svg>

      {/* ============================================= */}
      {/* 2. USER PHOTO - Circular (ABSOLUTE POSITION) */}
      {/* ============================================= */}
      {/* Size: 590px x 590px */}
      {/* Center X = 540 + 30 = 570px */}
      {/* Left edge = 570 - 295 = 275px (NO TRANSFORM) */}
      <div
        style={{
          position: 'absolute',
          top: '330px',
          left: '275px', // Calculated: 570 - (590/2) = 275
          width: '590px',
          height: '590px',
          borderRadius: '50%',
          border: '4px solid #ffffff',
          overflow: 'hidden',
          backgroundColor: '#e5e5e5',
          zIndex: 5
        }}
      >
        {userData.photo ? (
          <img
            src={userData.photo}
            alt="User Photo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            crossOrigin="anonymous"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0'
            }}
          >
            <span style={{ color: '#999999', fontWeight: 'bold', fontSize: '28px' }}>PHOTO</span>
          </div>
        )}
      </div>

      {/* ============================================= */}
      {/* 3. PLEDGE TEXT - Red Box (ABSOLUTE POSITION) */}
      {/* ============================================= */}
      {/* Size: 660px x min 200px */}
      {/* Position: top: 980px, left: 320px */}
      <div
        style={{
          position: 'absolute',
          top: '980px',
          left: '320px',
          width: '660px',
          minHeight: '200px',
          backgroundColor: '#EF3E36',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
          boxSizing: 'border-box'
        }}
      >
        <p
          style={{
            fontFamily: '"Big Shoulders Display", sans-serif',
            fontWeight: 900,
            fontSize: '55px',
            letterSpacing: '0.05em',
            lineHeight: 1.15,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            textAlign: 'left',
            margin: 0,
            padding: 0,
            wordBreak: 'break-word'
          }}
        >
          "{pledge.text}"
        </p>
      </div>
    </div>
  );
};

export default Poster;