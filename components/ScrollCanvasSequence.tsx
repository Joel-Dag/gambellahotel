'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Compass, Eye, EyeOff } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;

export default function ScrollCanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  // Keep references to images and cached render index
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);

  const renderFrame = useCallback((index: number, force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const safeIndex = Math.min(Math.max(0, Math.floor(index)), TOTAL_FRAMES - 1);
    if (!force && safeIndex === lastRenderedIndexRef.current) return;

    const img = imagesRef.current[safeIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastRenderedIndexRef.current = safeIndex;

    // Enable high-quality smoothing
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const cWidth = canvas.width;
    const cHeight = canvas.height;

    context.clearRect(0, 0, cWidth, cHeight);

    // Exact aspect-ratio cover using physical canvas dimensions
    const hRatio = cWidth / img.naturalWidth;
    const vRatio = cHeight / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);
    const drawWidth = Math.round(img.naturalWidth * ratio);
    const drawHeight = Math.round(img.naturalHeight * ratio);
    const centerShiftX = Math.round((cWidth - drawWidth) / 2);
    const centerShiftY = Math.round((cHeight - drawHeight) / 2);

    context.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      centerShiftX,
      centerShiftY,
      drawWidth,
      drawHeight
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!canvas || !container || !pinWrapper) return;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };
    let loadedCount = 0;
    let initialized = false;
    const loadedFlags = new Array(TOTAL_FRAMES).fill(false);

    // Razor-sharp Retina pixel-ratio configuration
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resizeCanvas();

    function initGSAP() {
      if (initialized) return;
      initialized = true;
      setIsLoaded(true);

      // Force render first frame at native sharpness
      renderFrame(0, true);

      // Explicit GSAP pinning: holds the pinWrapper firmly in the viewport while scrolling container
      gsap.to(airpods, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinWrapper,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.1,
          onUpdate: (self) => {
            if (self.progress >= 0.99) {
              renderFrame(TOTAL_FRAMES - 1, true);
              setCurrentFrame(TOTAL_FRAMES);
              setScrollProgress(1);
            } else {
              const frameVal = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(airpods.frame))
              );
              renderFrame(frameVal);
              setCurrentFrame(frameVal + 1);
              setScrollProgress(self.progress);
            }
          },
          onLeave: () => {
            // Keep the last frame locked in place cleanly without turning black
            renderFrame(TOTAL_FRAMES - 1, true);
            setCurrentFrame(TOTAL_FRAMES);
            setScrollProgress(1);
          },
          onEnterBack: () => {
            renderFrame(TOTAL_FRAMES - 1, true);
          },
        },
      });

      // Refresh ScrollTrigger to calculate accurate pin offsets
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }

    const markLoaded = (idx: number) => {
      if (!loadedFlags[idx]) {
        loadedFlags[idx] = true;
        loadedCount++;

        // Immediately draw frame 0 as soon as available
        if (idx === 0) {
          renderFrame(0, true);
        }

        // Activate GSAP once frames are ready
        if (loadedCount >= TOTAL_FRAMES) {
          initGSAP();
        }
      }
    };

    // Preload all 120 frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameIndex = String(i).padStart(3, '0');
      const idx = i - 1;

      img.onload = () => markLoaded(idx);
      img.onerror = () => markLoaded(idx);

      img.src = `/frames/frame-${frameIndex}.jpg`;

      // If already cached in browser
      if (img.complete && img.naturalWidth > 0) {
        markLoaded(idx);
      }

      images.push(img);
    }
    imagesRef.current = images;

    // Safety fallback to activate GSAP even on slow connections
    const timeout = setTimeout(() => {
      if (!initialized) {
        initGSAP();
      }
    }, 2500);

    const handleResize = () => {
      resizeCanvas();
      renderFrame(airpods.frame, true);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [renderFrame]);

  // Checkpoint active flags:
  // Frames 1–35: Welcome & Cultural Heritage
  // Frames 36–75: Architectural Woodwork & Modern Comfort
  // Frames 76–120: World-Class Hospitality & Reservation
  const isCheckpoint1 = currentFrame <= 35;
  const isCheckpoint2 = currentFrame > 35 && currentFrame <= 75;
  const isCheckpoint3 = currentFrame > 75;

  return (
    <div ref={containerRef} id="canvas-container" className="relative w-full h-[380vh] bg-[#12100E]">
      {/* GSAP-Pinned Viewport Wrapper: Stays locked in view while scrolling */}
      <div
        ref={pinWrapperRef}
        className="w-full h-screen relative overflow-hidden select-none bg-[#12100E]"
      >
        {/* Crisp High-DPI Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Subtle Top Header Scrim Only (Zero bottom scrim so the canvas never turns black) */}
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none bg-gradient-to-b from-[#12100E]/70 to-transparent" />

        {/* Loading overlay indicator while images load */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#12100E] text-[#D4AF37] font-serif transition-opacity duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1410] border border-[#C88A35]/40 mb-3 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                Gambela Hotel • Addis Ababa
              </span>
            </div>
            <span className="text-sm sm:text-base tracking-[0.25em] uppercase text-[#F4EFEA]">
              Loading Heritage Experience...
            </span>
            <div className="mt-4 w-48 h-1 bg-[#1C1410] border border-[#3D2B1F] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#C88A35] via-[#D4AF37] to-[#F4EFEA] animate-pulse" />
            </div>
          </div>
        )}

        {/* Unobtrusive Bottom-Left Narrative Card (Fades cleanly near sequence completion so final frame stays clean) */}
        {showOverlay && scrollProgress < 0.96 && (
          <div className="absolute bottom-20 left-4 sm:left-10 z-20 max-w-sm sm:max-w-md pointer-events-none transition-all duration-500">
            {/* Checkpoint 1: Frames 1-35 */}
            {isCheckpoint1 && (
              <div className="transition-all duration-500 transform opacity-100 translate-y-0 pointer-events-auto">
                <div className="border border-[#C88A35]/40 bg-[#1C1410]/85 backdrop-blur-md rounded-lg p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100E]/90 border border-[#C88A35]/30 mb-2.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      Addis Ababa Sanctuary
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl text-[#F4EFEA] leading-tight mb-2">
                    Carved in Tradition, <br />
                    <span className="italic text-[#D4AF37]">Crafted for Luxury</span>
                  </h1>
                  <p className="text-xs text-[#F4EFEA]/80 font-light leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
                    Welcome to Gambela Hotel in Addis Ababa. Experience an earthy luxury retreat shaped by Ethiopian architectural woodwork and tranquility.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/rooms"
                      className="px-4 py-2.5 font-serif text-xs tracking-[0.18em] uppercase text-[#F4EFEA] bg-[#2A1E17] border border-[#C88A35]/60 hover:border-[#D4AF37] transition-all rounded-sm font-medium"
                    >
                      Suites & Quarters
                    </Link>
                    <Link
                      href="/booking"
                      className="px-4 py-2.5 font-serif text-xs tracking-[0.18em] uppercase text-[#D4AF37] bg-[#12100E] border border-[#3D2B1F] hover:border-[#C88A35] transition-all rounded-sm font-medium"
                    >
                      Direct Booking
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Checkpoint 2: Frames 36-75 */}
            {isCheckpoint2 && (
              <div className="transition-all duration-500 transform opacity-100 translate-y-0 pointer-events-auto">
                <div className="border border-[#C88A35]/40 bg-[#1C1410]/85 backdrop-blur-md rounded-lg p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100E]/90 border border-[#C88A35]/30 mb-2.5">
                    <Shield className="w-3 h-3 text-[#D4AF37]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      Artisanal Wood Carving
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F4EFEA] leading-tight mb-2">
                    Architectural Elegance <br />
                    <span className="italic text-[#D4AF37]">Meets Modern Comfort</span>
                  </h2>
                  <p className="text-xs text-[#F4EFEA]/80 font-light leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
                    Rich walnut paneling, hand-hewn ceiling timbers, and sunlit verandas overlooking lush private courtyards in Addis Ababa.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/rooms"
                      className="px-4 py-2.5 font-serif text-xs tracking-[0.18em] uppercase text-[#F4EFEA] bg-[#2A1E17] border border-[#C88A35]/60 hover:border-[#D4AF37] transition-all rounded-sm font-medium"
                    >
                      Explore Suites
                    </Link>
                    <Link
                      href="/dining"
                      className="px-4 py-2.5 font-serif text-xs tracking-[0.18em] uppercase text-[#D4AF37] bg-[#12100E] border border-[#3D2B1F] hover:border-[#C88A35] transition-all rounded-sm font-medium"
                    >
                      Veranda Lounge
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Checkpoint 3: Frames 76-120 */}
            {isCheckpoint3 && (
              <div className="transition-all duration-500 transform opacity-100 translate-y-0 pointer-events-auto">
                <div className="border border-[#C88A35]/40 bg-[#1C1410]/85 backdrop-blur-md rounded-lg p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.85)]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100E]/90 border border-[#C88A35]/30 mb-2.5">
                    <Compass className="w-3 h-3 text-[#D4AF37]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      World-Class Hospitality
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F4EFEA] leading-tight mb-2">
                    Ethiopian Warmth <br />
                    <span className="italic text-[#D4AF37]">And Diplomatic Prestige</span>
                  </h2>
                  <p className="text-xs text-[#F4EFEA]/80 font-light leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
                    Artisanal coffee ceremonies, gourmet regional gastronomy, and presidential suites tailored for leaders and international travelers.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/booking"
                      className="px-4 py-2.5 font-serif text-xs tracking-[0.18em] uppercase text-[#F4EFEA] bg-[#2A1E17] border border-[#C88A35]/60 hover:border-[#D4AF37] transition-all rounded-sm font-medium"
                    >
                      Reserve Stay
                    </Link>
                    <Link
                      href="/dining"
                      className="px-4 py-2.5 font-serif text-xs tracking-[0.18em] uppercase text-[#D4AF37] bg-[#12100E] border border-[#3D2B1F] hover:border-[#C88A35] transition-all rounded-sm font-medium"
                    >
                      Dining & Bar
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Control & Status Bar (Fades cleanly when scrolling past the sequence) */}
        <div
          className={`absolute bottom-5 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-10 transition-opacity duration-300 ${
            scrollProgress >= 0.98 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
        >
          {/* Left: Frame Badge & Rotating Medallion */}
          <div className="flex items-center gap-3 bg-[#1C1410]/80 border border-[#3D2B1F] px-3.5 py-1.5 rounded-sm backdrop-blur-md shadow-lg">
            <div
              className="w-4 h-4 relative shrink-0 transition-transform duration-75"
              style={{ transform: `rotate(${scrollProgress * 360}deg)` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D4AF37]">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                <path
                  d="M12 2C12 7 7 12 2 12C7 12 12 17 12 22C12 17 17 12 22 12C17 12 12 7 12 2Z"
                  fill="#C88A35"
                  opacity="0.8"
                />
                <circle cx="12" cy="12" r="2.5" fill="#F4EFEA" />
              </svg>
            </div>

            <div className="text-[11px] font-mono tracking-wider text-[#D4AF37]">
              FRAME {String(currentFrame).padStart(3, '0')} / {TOTAL_FRAMES}
            </div>
          </div>

          {/* Right Controls: Clear View Toggle & Progress Bar */}
          <div className="flex items-center gap-3">
            {/* Clear View / Show Info Toggle */}
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="flex items-center gap-1.5 bg-[#1C1410]/80 hover:bg-[#2A1E17] border border-[#3D2B1F] hover:border-[#C88A35]/60 text-[#F4EFEA] px-3 py-1.5 rounded-sm text-[11px] font-serif tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer"
              title={showOverlay ? 'Hide text overlay for clear view' : 'Show text overlay'}
            >
              {showOverlay ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Clear View</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden sm:inline">Show Info</span>
                </>
              )}
            </button>

            {/* Scroll Progress Indicator */}
            <div className="hidden md:flex items-center gap-2.5 bg-[#1C1410]/80 border border-[#3D2B1F] px-3.5 py-1.5 rounded-sm backdrop-blur-md shadow-lg">
              <div className="w-24 h-1.5 bg-[#12100E] border border-[#3D2B1F] rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#C88A35] via-[#D4AF37] to-[#F4EFEA] transition-all duration-75"
                  style={{ width: `${(currentFrame / TOTAL_FRAMES) * 100}%` }}
                />
              </div>
              <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#D4AF37]">
                Scroll To Explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
