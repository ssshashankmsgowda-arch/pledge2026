import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  // Dynamic font size calculation matching specification logic
  const calculateNameFontSize = (name: string) => {
    const containerHeight = 1300;
    const charCount = name.length || 1;
    // Formula: size = containerHeight / (charCount * 0.77)
    // Target is ~170px for average names (5-7 chars)
    let fontSize = Math.floor(containerHeight / (charCount * 0.77));
    const minSize = 60;
    const maxSize = 250;
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
        backgroundColor: 'white'
      }}
    >
      {/* Background Image - Full Cover */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <img
          src="/poster_2026_updated.png"
          alt="Certificate Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          crossOrigin="anonymous"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback if image fails */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#f5f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: -1
        }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Poster 2026</span>
        </div>
      </div>

      {/* Content Overlay */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>

        {/* 1. User Name - Vertical Text (Left Sidebar) */}
        {/* Container: 250px wide, 1440px tall, positioned top:0 left:0 */}
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '250px',
          height: '1440px',
          zIndex: 20,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          {/* Inner rotated container: 1440px wide (to span full height), 250px tall */}
          {/* Positioned at center of parent, then rotated -90deg */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1440px',
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            transformOrigin: 'center center'
          }}>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              color: '#e63946',
              textTransform: 'uppercase',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              fontSize: `${nameFontSize}px`,
              margin: 0,
              padding: 0
            }}>
              {userData.fullName || 'YOUR NAME'}
            </h2>
          </div>
        </div>

        {/* 2. User Photo (Circular) */}
        {/* 590x590px circle, top: 330px, horizontally centered + 30px offset right */}
        <div style={{
          position: 'absolute',
          width: '590px',
          height: '590px',
          top: '330px',
          left: '50%',
          transform: 'translateX(-50%)',
          marginLeft: '30px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid white',
          backgroundColor: '#e7e5e4',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          {userData.photo ? (
            <img
              src={userData.photo}
              alt="User"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              crossOrigin="anonymous"
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: '#f3f4f6'
            }}>
              <span style={{ color: '#9ca3af', fontWeight: 'bold', fontSize: '30px' }}>PHOTO</span>
            </div>
          )}
        </div>

        {/* 3. Pledge Text (Red Box) */}
        {/* 660px wide, min-height 200px, top: 980px, left: 320px */}
        <div style={{
          position: 'absolute',
          top: '980px',
          left: '320px',
          width: '660px',
          minHeight: '200px',
          backgroundColor: '#EF3E36',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          zIndex: 20
        }}>
          <p style={{
            fontFamily: '"Big Shoulders Display", sans-serif',
            fontWeight: 900,
            fontSize: '55px',
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            textAlign: 'left',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            wordBreak: 'break-word',
            width: '100%',
            margin: 0
          }}>
            "{pledge.text}"
          </p>
        </div>

      </div>
    </div>
  );
};

export default Poster;