
import React, { useState, useRef, useEffect } from 'react';
import { getCroppedImg } from '../utils/imageUtils';

interface SimpleImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: () => void;
}

const SimpleImageCropper: React.FC<SimpleImageCropperProps> = ({ imageSrc, onCropComplete, onCancel }) => {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Constants
    const CROP_SIZE = 280; // Size of the visible circle on screen

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        // Capture pointer to track moving outside element
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    const cropImage = async () => {
        if (!imageRef.current) return;

        // Calculate the crop logic
        // We visually see a circle of CROP_SIZE in the center of the container.
        // The image has been scaled by 'zoom' and moved by 'position'.

        const imageElement = imageRef.current;

        // Original (Natural) dimensions
        const naturalWidth = imageElement.naturalWidth;
        const naturalHeight = imageElement.naturalHeight;

        // Displayed dimensions (before our manual CSS transform/zooming logic is considered for the crop rect math, 
        // we need to know how big it is Rendered).
        // Actually, simple math:
        // Scale factor between "Natural" and "Rendered on screen at zoom=1"
        // Let's assume the image fits 'contain' initially or something similar.
        // But here we are just putting the image in a div.

        const renderedWidth = imageElement.width * zoom;
        const renderedHeight = imageElement.height * zoom;

        // The center of the container
        const containerW = containerRef.current?.offsetWidth || 0;
        const containerH = containerRef.current?.offsetHeight || 0;

        // Center of the crop circle relative to container [is basically center]
        const cropCenterX = containerW / 2;
        const cropCenterY = containerH / 2;

        // Top-Left of the crop circle relative to container
        const cropX_in_Container = cropCenterX - (CROP_SIZE / 2);
        const cropY_in_Container = cropCenterY - (CROP_SIZE / 2);

        // Image Top-Left relative to container
        // We center the image initially, then add 'position'
        const imageNonZoomedWidth = containerW * 0.8; // We initially limit max-width
        // Wait, CSS styling below is clearer.
        // Let's say image centers itself. The transform is translate(defaultCenter + pos).

        // Let's rely on getBoundingClientRect for what user sees
        const imageRect = imageElement.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();

        // Where is the crop box on the screen?
        const cropRect = {
            left: containerRect.left + (containerRect.width - CROP_SIZE) / 2,
            top: containerRect.top + (containerRect.height - CROP_SIZE) / 2,
        };

        // Relative cut
        const relativeX = cropRect.left - imageRect.left;
        const relativeY = cropRect.top - imageRect.top;

        // Scale back to natural size
        const scaleX = naturalWidth / imageRect.width;
        const scaleY = naturalHeight / imageRect.height;

        const pixelCrop = {
            x: relativeX * scaleX,
            y: relativeY * scaleY,
            width: CROP_SIZE * scaleX,
            height: CROP_SIZE * scaleY
        };

        try {
            const croppedBlob = await getCroppedImg(imageSrc, pixelCrop);
            onCropComplete(croppedBlob);
        } catch (e) {
            console.error(e);
            alert('Could not crop image');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-stone-900 rounded-2xl p-6 space-y-6">
                <h3 className="text-white font-bold text-center uppercase tracking-widest text-sm">Adjust Photo</h3>

                {/* Viewport */}
                <div
                    ref={containerRef}
                    className="relative w-full h-[350px] bg-black overflow-hidden rounded-xl border border-stone-700 cursor-move touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                >
                    {/* Image Layer */}
                    <div className="flex items-center justify-center w-full h-full pointer-events-none">
                        {/* pointer-events-none on wrapper so the PARENT gets the events for easier tracking */}
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Crop target"
                            className="max-w-[80%] max-h-[80%] object-contain origin-center transition-transform duration-0"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                touchAction: 'none'
                            }}
                            draggable={false}
                        />
                    </div>

                    {/* Overlay Mask - Don't block events */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div
                            style={{
                                width: `${CROP_SIZE}px`,
                                height: `${CROP_SIZE}px`,
                                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)', // Darken everything outside
                                borderRadius: '50%',
                                border: '2px solid white'
                            }}
                        ></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-stone-400 text-xs font-bold">-</span>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.05"
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                        <span className="text-stone-400 text-xs font-bold">+</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onCancel}
                            className="py-3 rounded-xl font-bold text-stone-400 bg-stone-800 hover:bg-stone-700 uppercase tracking-widest text-xs"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={cropImage}
                            className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 uppercase tracking-widest text-xs shadow-lg shadow-red-900/20"
                        >
                            Confirm Crop
                        </button>
                    </div>
                </div>

                <p className="text-center text-stone-500 text-[10px] uppercase tracking-widest">
                    Drag to Move • Pinch/Slide to Zoom
                </p>
            </div>
        </div>
    );
};

export default SimpleImageCropper;
