import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  // Dynamic font size calculation
  const calculateNameFontSize = (name: string) => {
    const charCount = name.length || 1;
    // Adjust for vertical text - slightly different formula
    let fontSize = Math.floor(1200 / (charCount * 0.9));
    const minSize = 60;
    const maxSize = 220;
    return Math.max(minSize, Math.min(maxSize, fontSize));
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
        backgroundColor: 'white',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Background Image - Full Cover */}
      <img
        src="/poster_2026_updated.png"
        alt="Certificate Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1080px',
          height: '1440px',
          objectFit: 'cover',
          zIndex: 0
        }}
        crossOrigin="anonymous"
      />

      {/* 1. User Name - Vertical Text using writing-mode (NO ROTATION) */}
      {/* This approach is more reliable for html2canvas */}
      <div
        style={{
          position: 'absolute',
          top: '70px',
          left: '30px',
          width: '190px',
          height: '1300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          overflow: 'visible'
        }}
      >
        <div
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)', // Flip so text reads bottom-to-top
            fontFamily: 'Inter, sans-serif',
            fontWeight: 900,
            color: '#e63946',
            textTransform: 'uppercase',
            fontSize: `${nameFontSize}px`,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            letterSpacing: '0.02em'
          }}
        >
          {userData.fullName || 'YOUR NAME'}
        </div>
      </div>

      {/* 2. User Photo (Circular) */}
      {/* 590x590px circle, top: 330px, centered + 30px offset */}
      <div
        style={{
          position: 'absolute',
          width: '590px',
          height: '590px',
          top: '330px',
          left: '570px', // 540 (center) + 30px offset
          marginLeft: '-295px', // half of width to center
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid white',
          backgroundColor: '#e7e5e4',
          zIndex: 10
        }}
      >
        {userData.photo ? (
          <img
            src={userData.photo}
            alt="User"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              backgroundColor: '#f3f4f6'
            }}
          >
            <span style={{ color: '#9ca3af', fontWeight: 'bold', fontSize: '30px' }}>PHOTO</span>
          </div>
        )}
      </div>

      {/* 3. Pledge Text (Red Box) */}
      {/* 660px wide, min-height 200px, top: 980px, left: 320px */}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          zIndex: 20
        }}
      >
        <p
          style={{
            fontFamily: '"Big Shoulders Display", sans-serif',
            fontWeight: 900,
            fontSize: '55px',
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            textAlign: 'left',
            wordBreak: 'break-word',
            width: '100%',
            margin: 0
          }}
        >
          "{pledge.text}"
        </p>
      </div>
    </div>
  );
};

export default Poster;