
import React, { useState, useRef, useEffect } from 'react';
import { UserData } from '../types';
import Poster from './Poster';

interface SuccessProps {
  onReset: () => void;
  userData: UserData;
}

const Success: React.FC<SuccessProps> = ({ onReset, userData }) => {
  const [downloading, setDownloading] = useState(false);

  // Independent refs for preview and hidden capture source
  const hiddenPosterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [preGeneratedFile, setPreGeneratedFile] = useState<File | null>(null);

  const currentUrl = window.location.origin;
  const pledgeText = userData.customPledge || '';

  // Calculate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newScale = (containerWidth * 0.95) / 1080;
        setScale(Math.min(newScale, 0.65));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const scaledHeight = 1440 * scale;

  // Helper to convert dataURI to Blob
  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Generate poster image from the hidden high-res element
  const generatePosterImage = async (): Promise<File | null> => {
    const posterElement = hiddenPosterRef.current;
    if (!posterElement) return null;

    try {
      // Small delay to ensure render
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await (window as any).html2canvas(posterElement, {
        scale: 4, // High quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 1080,
        height: 1440,
        windowWidth: 1080,
        windowHeight: 1440,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0,
        onclone: (clonedDoc: Document) => {
          // Callback to ensure fonts/images are ready in clone
        }
      });

      const dataUrl = canvas.toDataURL('image/png');
      const blob = dataURItoBlob(dataUrl);
      const fileName = `resolution_2026_${userData.fullName?.replace(/\s+/g, '_') || 'poster'}.png`;
      return new File([blob], fileName, { type: 'image/png' });
    } catch (err) {
      console.error("Image generation error:", err);
      return null;
    }
  };

  // Pre-generate image on mount
  useEffect(() => {
    let mounted = true;

    const prepareFile = async () => {
      // Reduced Wait Time: 400ms (was 800ms) to unlock faster
      await new Promise(r => setTimeout(r, 400));
      if (!mounted) return;

      const file = await generatePosterImage();
      if (mounted && file) {
        setPreGeneratedFile(file);
      }
    };

    prepareFile();

    return () => { mounted = false; };
  }, [userData]);


  // Download the poster
  const handleDownload = async () => {
    // Only show loader if needed
    if (!preGeneratedFile) setDownloading(true);

    const file = preGeneratedFile || await generatePosterImage();

    if (file) {
      // Force octet-stream to prevent iOS from opening in preview
      const blob = new Blob([file], { type: 'application/octet-stream' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = file.name;
      link.href = blobUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } else {
      alert("Sorry, we couldn't generate the image. Please take a screenshot!");
    }

    setDownloading(false);
  };

  // SINGLE SHARE BUTTON - Uses native Web Share API
  const handleShare = async () => {
    // ONLY show loading spinner if we fall back to generating on the fly
    // If preReferenceFile exists, we skip this to make it feel INSTANT.
    if (!preGeneratedFile) {
      setDownloading(true);
    }

    const shareCaption = `🎯 My 2026 Resolution is set!\n\nCreate yours at ${currentUrl}`;

    if (!navigator.share) {
      alert("Sharing not supported on this browser. Please download the image.");
      setDownloading(false);
      return;
    }

    try {
      // Use pre-generated file if ready, otherwise generate now
      const fileToShare = preGeneratedFile || await generatePosterImage();

      if (!fileToShare) throw new Error("Could not generate file");

      // Try file sharing
      if (navigator.canShare && navigator.canShare({ files: [fileToShare] })) {
        await navigator.share({
          files: [fileToShare],
          title: 'My 2026 Resolution',
          text: shareCaption
        });
      } else {
        // Fallback to text sharing
        await navigator.share({
          title: 'My 2026 Resolution',
          text: shareCaption,
          url: currentUrl
        });
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.log("Share failed:", err);
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 overflow-x-hidden">

      {/* 
        HIDDEN OFFLINE RENDER TARGET 
        This is exactly 1080x1440, absolute positioned off screen.
        Used for high-res capture without affecting UI.
      */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '1080px',
          height: '1440px',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      >
        <div ref={hiddenPosterRef} style={{ width: 1080, height: 1440, position: 'relative', backgroundColor: 'white' }}>
          <Poster
            id="hidden-poster-source"
            userData={userData}
            pledge={{ id: 0, text: pledgeText, explanation: '' }}
          />
        </div>
      </div>

      {/* Full-screen overlay during download/share */}
      {downloading && (
        <div className="fixed inset-0 bg-white/90 z-[100] flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-stone-700">One moment...</p>
          </div>
        </div>
      )}

      {/* Header - Minimal padding on mobile */}
      <div className="text-center pt-4 pb-3 sm:pt-6 sm:pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 outfit">Your 2026 Resolution</h2>
        <p className="text-red-600 font-medium text-sm">Ready to share with the world!</p>
      </div>

      {/* Poster Container (Visual Preview) */}
      <div
        ref={containerRef}
        className="flex-1 flex items-start justify-center px-2 sm:px-4 mb-24"
      >
        <div
          className="relative shadow-2xl rounded-lg overflow-hidden bg-white"
          style={{
            width: 1080 * scale,
            height: scaledHeight
          }}
        >
          {/* Visual Preview - Scaled using transform */}
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: '1080px',
              height: '1440px'
            }}
          >
            <Poster
              id="preview-poster"
              userData={userData}
              pledge={{ id: 0, text: pledgeText, explanation: '' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons - Sticky at bottom */}
      <div className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-100 p-4 sm:p-6 space-y-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15)] z-50">

        {/* Two Button Row */}
        <div className="flex gap-3 max-w-md mx-auto">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 h-12 sm:h-14 bg-stone-100 text-stone-800 font-bold uppercase tracking-wider rounded-xl hover:bg-stone-200 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download</span>
          </button>

          {/* Share Now Button */}
          <button
            onClick={handleShare}
            disabled={downloading}
            className="flex-[2] h-12 sm:h-14 bg-red-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share Now</span>
          </button>
        </div>

        {/* Create New Link */}
        <button
          onClick={onReset}
          className="w-full text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors py-1"
        >
          Create New Resolution
        </button>
      </div>
    </div>
  );
};

export default Success;