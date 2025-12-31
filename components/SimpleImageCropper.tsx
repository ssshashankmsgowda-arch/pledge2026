
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

    // Refs for gesture tracking
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const pointersRef = useRef<Map<number, { x: number, y: number }>>(new Map());
    const prevDistanceRef = useRef<number | null>(null);
    const startPosRef = useRef<{ x: number, y: number } | null>(null);
    const lastPosRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 }); // To track position between drags

    // Constants
    const CROP_SIZE = 280;
    const MIN_ZOOM = 1;
    const MAX_ZOOM = 5;

    // Helper: Calculate distance between two points
    const getDistance = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    };

    // Helper: Calculate center of multiple points
    const getCenter = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
        return {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2
        };
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        // If starting a drag (1 finger), remember where we started relative to current position
        if (pointersRef.current.size === 1) {
            startPosRef.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y
            };
        }
        // If 2 fingers, reset distance tracking for pinch
        else if (pointersRef.current.size === 2) {
            const points = Array.from(pointersRef.current.values());
            prevDistanceRef.current = getDistance(points[0], points[1]);
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!pointersRef.current.has(e.pointerId)) return;

        // Update this pointer's position
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        const points = Array.from(pointersRef.current.values());

        if (points.length === 1 && startPosRef.current) {
            // --- PANNING ---
            setPosition({
                x: e.clientX - startPosRef.current.x,
                y: e.clientY - startPosRef.current.y
            });
        }
        else if (points.length === 2) {
            // --- PINCH ZOOMING ---
            const currentDistance = getDistance(points[0], points[1]);

            if (prevDistanceRef.current) {
                const delta = currentDistance - prevDistanceRef.current;
                // Sensible zoom speed factor
                const zoomFactor = delta * 0.005;

                setZoom(prev => {
                    const newZoom = Math.min(Math.max(prev + zoomFactor, MIN_ZOOM), MAX_ZOOM);
                    return newZoom;
                });
            }
            prevDistanceRef.current = currentDistance;
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        pointersRef.current.delete(e.pointerId);

        // Reset pinch tracking
        if (pointersRef.current.size < 2) {
            prevDistanceRef.current = null;
        }

        // If 1 finger remains, reset pan anchor to prevent jumping
        if (pointersRef.current.size === 1) {
            const remaining = pointersRef.current.values().next().value;
            startPosRef.current = {
                x: remaining.x - position.x,
                y: remaining.y - position.y
            };
        } else {
            startPosRef.current = null;
        }
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        setZoom(prev => Math.min(Math.max(prev + delta, MIN_ZOOM), MAX_ZOOM));
    };

    const cropImage = async () => {
        if (!imageRef.current) return;

        // --- CROP CALCULATION LOGIC (Same as before) ---
        const imageElement = imageRef.current;
        const naturalWidth = imageElement.naturalWidth;
        const naturalHeight = imageElement.naturalHeight;
        const containerW = containerRef.current?.offsetWidth || 0;
        const containerH = containerRef.current?.offsetHeight || 0;
        const imageRect = imageElement.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();

        const cropRect = {
            left: containerRect.left + (containerRect.width - CROP_SIZE) / 2,
            top: containerRect.top + (containerRect.height - CROP_SIZE) / 2,
        };

        const relativeX = cropRect.left - imageRect.left;
        const relativeY = cropRect.top - imageRect.top;

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
                    onWheel={handleWheel}
                >
                    {/* Image Layer */}
                    <div className="flex items-center justify-center w-full h-full pointer-events-none">
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Crop target"
                            className="max-w-[80%] max-h-[80%] object-contain origin-center transition-transform duration-0 will-change-transform"
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
                                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
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
                            min={MIN_ZOOM}
                            max={MAX_ZOOM}
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
                    Drag to Move • Pinch or Scroll to Zoom
                </p>
            </div>
        </div>
    );
};

export default SimpleImageCropper;
