import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  // === EXACT SPECIFICATION ===
  // Canvas: 1080px x 1440px
  // All coordinates are FIXED PIXELS

  // Dynamic font size calculation for vertical name
  // Target: ~170px for average names, Min: 60px, Max: 250px
  const calculateNameFontSize = (name: string): number => {
    const charCount = name.length || 1;
    const containerHeight = 1300; // usable height for text
    let fontSize = Math.floor(containerHeight / (charCount * 0.77));
    return Math.max(60, Math.min(250, fontSize));
  };

  const nameFontSize = calculateNameFontSize(userData.fullName);

  return (
    <div
      ref={innerRef}
      id={id || "pledge-poster"}
      style={{
        // FIXED SIZE - exactly 1080x1440
        width: '1080px',
        height: '1440px',
        minWidth: '1080px',
        minHeight: '1440px',
        maxWidth: '1080px',
        maxHeight: '1440px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff'
      }}
    >
      {/* BACKGROUND IMAGE - Full Cover */}
      <img
        src="/poster_2026_updated.png"
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
      {/* 1. USER NAME - Vertical Text (Left Sidebar)  */}
      {/* ============================================= */}
      {/* Container: 250px x 1440px, Position: top:0, left:0 */}
      {/* Rotation: -90 degrees (counter-clockwise) */}
      {/* Alignment: Centered within sidebar */}
      <div
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '250px',
          height: '1440px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible'
        }}
      >
        {/* Inner container for rotation - 1440px wide (becomes height after rotation) */}
        <div
          style={{
            width: '1440px',
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center center'
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: `${nameFontSize}px`,
              color: '#e63946',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
          >
            {userData.fullName || 'YOUR NAME'}
          </span>
        </div>
      </div>

      {/* ============================================= */}
      {/* 2. USER PHOTO - Circular                     */}
      {/* ============================================= */}
      {/* Size: 590px x 590px */}
      {/* Position: top: 330px, left: 50% + 30px offset */}
      {/* CSS: top: 330px; left: 50%; transform: translateX(-50%); margin-left: 30px; */}
      <div
        style={{
          position: 'absolute',
          top: '330px',
          left: '50%',
          transform: 'translateX(-50%)',
          marginLeft: '30px',
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
      {/* 3. PLEDGE TEXT - Red Box                     */}
      {/* ============================================= */}
      {/* Size: 660px x min 200px */}
      {/* Position: top: 980px, left: 320px */}
      {/* Background: #EF3E36, border-radius: 24px, padding: 40px */}
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