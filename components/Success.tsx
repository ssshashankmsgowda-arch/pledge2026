import React, { useState, useRef } from 'react';
import { UserData } from '../types';
import Poster from './Poster';

interface SuccessProps {
  onReset: () => void;
  userData: UserData;
}

const Success: React.FC<SuccessProps> = ({ onReset, userData }) => {
  const [downloading, setDownloading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentUrl = window.location.origin;
  const pledgeText = userData.customPledge || '';

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
    const wrapperElement = wrapperRef.current;

    if (!posterElement || !wrapperElement) return null;

    try {
      const originalTransform = wrapperElement.style.transform;
      wrapperElement.style.transform = 'none';
      wrapperElement.style.transformOrigin = 'top left';

      await new Promise(resolve => setTimeout(resolve, 150));

      const canvas = await (window as any).html2canvas(posterElement, {
        scale: 2,
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

      wrapperElement.style.transform = originalTransform;

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const blob = dataURItoBlob(dataUrl);
      const fileName = `resolution_2026_${userData.fullName?.replace(/\s+/g, '_') || 'poster'}.jpg`;
      return new File([blob], fileName, { type: 'image/jpeg' });
    } catch (err) {
      console.error("Image generation error:", err);
      if (wrapperElement) wrapperElement.style.transform = '';
      return null;
    }
  };

  // Download the poster
  const handleDownload = async () => {
    setDownloading(true);

    const file = await generatePosterImage();
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.download = file.name;
      link.href = blobUrl;
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

    // Generate the poster image
    const file = await generatePosterImage();

    if (!file) {
      setDownloading(false);
      alert("Could not generate image. Please download it manually.");
      return;
    }

    // Check if native sharing with files is supported
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My 2026 Resolution',
          text: shareCaption
        });
        setDownloading(false);
        return; // Success
      } catch (err: any) {
        // User cancelled or error
        if (err.name !== 'AbortError') {
          console.log("Share failed:", err);
        }
      }
    } else {
      // Fallback: Download the file and alert user
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
    <div className="pt-24 pb-48 px-6 min-h-screen flex flex-col items-center w-full">
      {/* Header Text */}
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl font-black text-stone-900 outfit">Your 2026 Resolution</h2>
        <p className="text-emerald-600 font-medium">Ready to share with the world!</p>
      </div>

      {/* Poster Preview (Scaled) */}
      <div
        ref={wrapperRef}
        className="transform scale-[0.35] sm:scale-[0.5] md:scale-[0.6] origin-top shadow-2xl border-[10px] border-white rounded-lg"
      >
        <Poster
          id="preview-poster"
          innerRef={posterRef}
          userData={userData}
          pledge={{ id: 0, text: pledgeText, explanation: '' }}
        />
      </div>

      {/* Fixed Bottom Action Bar - SIMPLIFIED */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md p-6 flex flex-col items-center gap-4 border-t border-stone-100 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.15)]">

        {/* Two Button Row: Download & Share */}
        <div className="w-full max-w-md flex gap-3">

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 h-14 bg-stone-100 text-stone-800 font-bold uppercase tracking-wider rounded-2xl hover:bg-stone-200 text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download</span>
          </button>

          {/* Share Now Button - Primary Action */}
          <button
            onClick={handleShare}
            disabled={downloading}
            className="flex-[2] h-14 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 text-sm flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70"
          >
            {downloading ? (
              <span>Preparing...</span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-stone-600 transition-colors"
        >
          Create New Resolution
        </button>

      </div>
    </div>
  );
};

export default Success;