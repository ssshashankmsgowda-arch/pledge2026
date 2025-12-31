import React, { useState, useRef, useEffect } from 'react';
import { UserData } from '../types';
import Poster from './Poster';

interface SuccessProps {
  onReset: () => void;
  userData: UserData;
}

const Success: React.FC<SuccessProps> = ({ onReset, userData }) => {
  const [downloading, setDownloading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);
  const scaleWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

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

  // Generate poster image and return as File
  const generatePosterImage = async (): Promise<File | null> => {
    const posterElement = posterRef.current;
    const scaleWrapper = scaleWrapperRef.current;

    if (!posterElement || !scaleWrapper) return null;

    try {
      // Store original transform and temporarily remove it
      const originalTransform = scaleWrapper.style.transform;
      scaleWrapper.style.transform = 'none';

      await new Promise(resolve => setTimeout(resolve, 150));

      const canvas = await (window as any).html2canvas(posterElement, {
        scale: 4,
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
        y: 0
      });

      // Restore the original transform
      scaleWrapper.style.transform = originalTransform;

      const dataUrl = canvas.toDataURL('image/png');
      const blob = dataURItoBlob(dataUrl);
      const fileName = `resolution_2026_${userData.fullName?.replace(/\s+/g, '_') || 'poster'}.png`;
      return new File([blob], fileName, { type: 'image/png' });
    } catch (err) {
      console.error("Image generation error:", err);
      if (scaleWrapper) scaleWrapper.style.transform = `scale(${scale})`;
      return null;
    }
  };

  // Download the poster
  const handleDownload = async () => {
    setDownloading(true);

    const file = await generatePosterImage();
    if (file) {
      // Force octet-stream to prevent iOS from opening in preview
      const blob = new Blob([file], { type: 'application/octet-stream' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = file.name;
      link.href = blobUrl;
      link.style.display = 'none'; // Ensure it's hidden
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
    setDownloading(true);

    const shareCaption = `🎯 My 2026 Resolution is set!\n\nCreate yours at ${currentUrl}`;

    const file = await generatePosterImage();

    if (!file) {
      setDownloading(false);
      alert("Could not generate image. Please download it manually.");
      return;
    }

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My 2026 Resolution',
          text: shareCaption
        });
        setDownloading(false);
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log("Share failed:", err);
        }
      }
    } else {
      const blobUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.download = file.name;
      link.href = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      alert("Poster downloaded! Please share it manually from your gallery/files.");
    }

    setDownloading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Full-screen overlay during download/share */}
      {downloading && (
        <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-bold text-stone-700">Generating your poster...</p>
            <p className="text-sm text-stone-400 mt-1">Please wait</p>
          </div>
        </div>
      )}

      {/* Header - Minimal padding on mobile */}
      <div className="text-center pt-4 pb-3 sm:pt-6 sm:pb-4">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 outfit">Your 2026 Resolution</h2>
        <p className="text-red-600 font-medium text-sm">Ready to share with the world!</p>
      </div>

      {/* Poster Container */}
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
          {/* This div has the scale transform that we manipulate during capture */}
          <div
            ref={scaleWrapperRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: '1080px',
              height: '1440px'
            }}
          >
            <Poster
              id="preview-poster"
              innerRef={posterRef}
              userData={userData}
              pledge={{ id: 0, text: pledgeText, explanation: '' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons - Sticky at bottom */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-stone-100 p-4 sm:p-6 space-y-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15)]">

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
            {downloading ? (
              <span>Preparing...</span>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share Now</span>
              </>
            )}
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