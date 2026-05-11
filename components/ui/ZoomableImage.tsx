"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { ZoomIn, ZoomOut, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ZoomableImageProps {
  /** Primary image src */
  src: string;
  /** Alt text */
  alt?: string;
  /** Optional extra images for thumbnail strip */
  images?: string[];
  className?: string;
}

export function ZoomableImage({ src, alt = "Product", images = [], className = "" }: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // All available images (primary + extras)
  const allImages = [src, ...images.filter(i => i !== src)];
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSrc = allImages[activeIdx] ?? src;

  // Zoom / pan state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  // Clamp pan so image never drifts fully out of container
  const clampTranslate = useCallback((tx: number, ty: number, s: number) => {
    if (!containerRef.current) return { x: tx, y: ty };
    const { width, height } = containerRef.current.getBoundingClientRect();
    const maxX = Math.max(0, (width * s - width) / 2);
    const maxY = Math.max(0, (height * s - height) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, tx)),
      y: Math.max(-maxY, Math.min(maxY, ty)),
    };
  }, []);

  const applyZoom = useCallback((newScale: number, originX = 0, originY = 0) => {
    const s = Math.max(1, Math.min(5, newScale));
    setScale(prev => {
      const ratio = s / prev;
      setTranslate(t => {
        const nx = (t.x - originX) * ratio + originX;
        const ny = (t.y - originY) * ratio + originY;
        return clampTranslate(nx, ny, s);
      });
      return s;
    });
  }, [clampTranslate]);

  const resetZoom = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  // Reset zoom on image change
  useEffect(() => { resetZoom(); }, [activeIdx]);

  // ── Mouse wheel zoom ──────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const ox = e.clientX - rect.left - rect.width / 2;
      const oy = e.clientY - rect.top - rect.height / 2;
      applyZoom(scale + (e.deltaY < 0 ? 0.2 : -0.2), ox, oy);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [scale, applyZoom]);

  // ── Touch pinch-to-zoom ────────────────────────────────────────────────────
  const lastPinchDist = useRef<number | null>(null);
  const lastPinchMid  = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      lastPinchDist.current = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      lastPinchMid.current  = { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastPinchDist.current !== null && containerRef.current) {
      e.preventDefault();
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist   = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      const factor = dist / lastPinchDist.current;
      const rect   = containerRef.current.getBoundingClientRect();
      const mid    = { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
      const ox     = mid.x - rect.left - rect.width  / 2;
      const oy     = mid.y - rect.top  - rect.height / 2;
      applyZoom(scale * factor, ox, oy);
      lastPinchDist.current = dist;
      lastPinchMid.current  = mid;
    }
  };

  const onTouchEnd = () => {
    lastPinchDist.current = null;
    lastPinchMid.current  = null;
  };

  // ── Mouse drag to pan ──────────────────────────────────────────────────────
  const dragStart = useRef<{ mx: number; my: number; tx: number; ty: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { mx: e.clientX, my: e.clientY, tx: translate.x, ty: translate.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    setTranslate(clampTranslate(dragStart.current.tx + dx, dragStart.current.ty + dy, scale));
  };

  const onMouseUp = () => { setIsDragging(false); dragStart.current = null; };

  // Double-tap to toggle zoom
  const lastTap = useRef(0);
  const onTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      scale > 1 ? resetZoom() : applyZoom(2.5);
    }
    lastTap.current = now;
  };

  return (
    <>
      <div className={`flex flex-col w-full h-full select-none ${className}`}>

        {/* ── Main Image Viewport ── */}
        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden bg-gray-50 rounded-xl"
          style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={onTap}
        >
          <img
            ref={imgRef}
            src={activeSrc}
            alt={alt}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-100"
            style={{
              transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              willChange: "transform",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />

          {/* Controls overlay */}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <button
              suppressHydrationWarning
              onClick={(e) => { e.stopPropagation(); applyZoom(scale + 0.5); }}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition shadow-sm"
              title="Zoom In"
            ><ZoomIn size={14} /></button>
            <button
              suppressHydrationWarning
              onClick={(e) => { e.stopPropagation(); applyZoom(scale - 0.5); }}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white transition shadow-sm"
              title="Zoom Out"
            ><ZoomOut size={14} /></button>

          </div>

          {/* Zoom level badge */}
          {scale > 1 && (
            <div
              onClick={(e) => { e.stopPropagation(); resetZoom(); }}
              className="absolute bottom-3 left-3 z-10 text-[11px] font-medium bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-sm cursor-pointer"
            >
              {Math.round(scale * 100)}% · tap to reset
            </div>
          )}

          {/* Hint on first load */}
          {scale === 1 && (
            <div suppressHydrationWarning className="absolute bottom-3 left-3 z-10 text-[10px] text-gray-400 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none select-none">
              Scroll or pinch to zoom
            </div>
          )}
        </div>

        {/* ── Thumbnail Strip ── */}
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-3 px-1 overflow-x-auto hide-scrollbar">
            {allImages.map((img, i) => (
              <button
                key={i}
                suppressHydrationWarning
                onClick={() => setActiveIdx(i)}
                className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === activeIdx
                    ? "border-[#A34E0D] shadow-md scale-105"
                    : "border-gray-200 opacity-60 hover:opacity-90"
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Close button */}
          <button
            suppressHydrationWarning
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition z-10"
            onClick={() => setLightbox(false)}
          ><X size={20} /></button>

          {/* Prev / Next */}
          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition z-10"
                onClick={(e) => { e.stopPropagation(); setActiveIdx(i => (i - 1 + allImages.length) % allImages.length); }}
              ><ChevronLeft size={20} /></button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition z-10"
                onClick={(e) => { e.stopPropagation(); setActiveIdx(i => (i + 1) % allImages.length); }}
              ><ChevronRight size={20} /></button>
            </>
          )}

          <img
            src={activeSrc}
            alt={alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Dot indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeIdx ? "bg-white w-5" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </>
  );
}
