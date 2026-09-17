'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Shield, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;

export default function ScrollCanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };
    let loadedCount = 0;
    let initialized = false;
    const loadedFlags = new Array(TOTAL_FRAMES).fill(false);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const renderFrame = (index: number) => {
      const safeIndex = Math.min(Math.max(0, Math.floor(index)), TOTAL_FRAMES - 1);
      const img = images[safeIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Object-fit cover math
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (canvas.width - img.width * ratio) / 2;
      const centerShiftY = (canvas.height - img.height * ratio) / 2;

      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );
    };

    function initGSAP() {
      if (initialized) return;
      initialized = true;
      setIsLoaded(true);

      // Render first frame on activation
      renderFrame(0);

      gsap.to(airpods, {
        frame: TOTAL_FRAMES - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            const frameVal = Math.round(airpods.frame);
            renderFrame(frameVal);
            setCurrentFrame(frameVal + 1);
            setScrollProgress(frameVal / (TOTAL_FRAMES - 1));
          },
        },
      });
    }

    const markLoaded = (idx: number) => {
      if (!loadedFlags[idx]) {
        loadedFlags[idx] = true;
        loadedCount++;

        // Immediately render frame 0 as soon as it arrives
        if (idx === 0) {
          renderFrame(0);
        }

        // Once all frames are cached, activate GSAP ScrollTrigger
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

      // Check if image is already cached
      if (img.complete && img.naturalWidth > 0) {
        markLoaded(idx);
      }

      images.push(img);
    }

    // Fallback safety: ensure GSAP initializes even if some frame takes long
    const timeout = setTimeout(() => {
      if (!initialized) {
        initGSAP();
      }
    }, 2000);

    const handleResize = () => {
      resizeCanvas();
      renderFrame(airpods.frame);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Checkpoint active flags:
  // Frames 1–35: Welcome & Cultural Heritage
  // Frames 36–75: Architectural Woodwork & Modern Comfort
  // Frames 76–120: World-Class Hospitality & Reservation
  const isCheckpoint1 = currentFrame <= 35;
  const isCheckpoint2 = currentFrame > 35 && currentFrame <= 75;
  const isCheckpoint3 = currentFrame > 75;

  return (
    <div ref={containerRef} id="canvas-container" className="relative w-full h-[400vh] bg-[#12100E]">
      {/* Sticky Inner Viewport Wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none">
        {/* High-Performance Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Cinematic Vignette and Dark Mahogany Mood Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#12100E]/95 via-black/40 to-[#12100E]/70" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1C1410]/40 to-[#12100E]/90" />

        {/* Loading overlay indicator while images load */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#12100E]/95 backdrop-blur-sm text-[#D4AF37] font-serif transition-opacity duration-500">
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

        {/* Checkpoint Overlays */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-4 sm:px-6">
          {/* Checkpoint 1: Frames 1-35 */}
          <div
            id="hero-checkpoint-1"
            className={`absolute max-w-3xl w-full text-center transition-all duration-700 transform ${
              isCheckpoint1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            {/* Dark Walnut Carved Container */}
            <div className="border-2 border-[#3D2B1F] bg-[#1C1410]/85 backdrop-blur-md rounded-lg p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(0,0,0,0.8)] relative">
              {/* Top Amber Carved Accent Motif */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12100E]/80 border border-[#C88A35]/40 mb-5 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                  Addis Ababa • Artisanal Ethiopian Sanctuary
                </span>
              </div>

              {/* Engraved Header */}
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight mb-4">
                Carved in Tradition, <br />
                <span className="italic font-light text-[#F4EFEA]/90">Crafted for Luxury</span>
              </h1>

              {/* Carved Divider Accent */}
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />

              <p className="text-xs sm:text-base text-[#F4EFEA]/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
                Welcome to Gambela Hotel in Addis Ababa. Experience an earthy, high-end luxury retreat shaped by centuries of Ethiopian architectural woodwork, tranquility, and diplomatic prestige.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/rooms"
                  className="w-full sm:w-auto px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all duration-300 rounded-sm"
                >
                  Explore Suites
                </Link>
                <Link
                  href="/booking"
                  className="w-full sm:w-auto px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#D4AF37] bg-[#12100E]/90 hover:bg-[#1C1410] border border-[#3D2B1F] hover:border-[#C88A35]/60 transition-all duration-300 rounded-sm"
                >
                  Direct Reservation
                </Link>
              </div>
            </div>
          </div>

          {/* Checkpoint 2: Frames 36-75 */}
          <div
            id="hero-checkpoint-2"
            className={`absolute max-w-3xl w-full text-center transition-all duration-700 transform ${
              isCheckpoint2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <div className="border-2 border-[#3D2B1F] bg-[#1C1410]/85 backdrop-blur-md rounded-lg p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(0,0,0,0.8)] relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12100E]/80 border border-[#C88A35]/40 mb-5">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                  Artisanal Wood Carving & Craft
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight mb-4">
                Architectural Elegance <br />
                <span className="italic font-light text-[#F4EFEA]/90">Meets Modern Comfort</span>
              </h2>

              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />

              <p className="text-xs sm:text-base text-[#F4EFEA]/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
                Rich walnut paneling, hand-hewn ceiling timbers, and custom carved furnishings harmonize with expansive sunlit verandas and lush private courtyards in the heart of Addis Ababa.
              </p>

              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all duration-300 rounded-sm"
                >
                  <span>View Residences</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Checkpoint 3: Frames 76-120 */}
          <div
            id="hero-checkpoint-3"
            className={`absolute max-w-3xl w-full text-center transition-all duration-700 transform ${
              isCheckpoint3
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <div className="border-2 border-[#3D2B1F] bg-[#1C1410]/85 backdrop-blur-md rounded-lg p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(0,0,0,0.8)] relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12100E]/80 border border-[#C88A35]/40 mb-5">
                <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                  Addis Ababa Hospitality
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-tight mb-4">
                Experience World-Class <br />
                <span className="italic font-light text-[#F4EFEA]/90">Ethiopian Hospitality</span>
              </h2>

              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />

              <p className="text-xs sm:text-base text-[#F4EFEA]/80 max-w-xl mx-auto font-light leading-relaxed mb-8">
                Indulge in artisanal Ethiopian coffee ceremonies roasted over hot coals, gourmet regional dining, and private suites tailored for diplomats, leaders, and travelers.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/booking"
                  className="w-full sm:w-auto px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/60 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all duration-300 rounded-sm"
                >
                  Reserve Your Stay
                </Link>
                <Link
                  href="/dining"
                  className="w-full sm:w-auto px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#D4AF37] bg-[#12100E]/90 hover:bg-[#1C1410] border border-[#3D2B1F] hover:border-[#C88A35]/60 transition-all duration-300 rounded-sm"
                >
                  Explore Dining
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stylized Carved Wood Motif Scroll Indicator */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 pointer-events-none">
          {/* Frame Badge */}
          <div className="flex items-center gap-3 bg-[#1C1410]/90 border border-[#3D2B1F] px-4 py-2 rounded-sm backdrop-blur-md shadow-lg">
            {/* Rotating Carved Wood Medallion Motif */}
            <div
              className="w-5 h-5 relative shrink-0 transition-transform duration-75"
              style={{ transform: `rotate(${scrollProgress * 360}deg)` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D4AF37]">
                {/* Outer Carved Ring */}
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                {/* Inner Ethiopian Floral Carving */}
                <path
                  d="M12 2C12 7 7 12 2 12C7 12 12 17 12 22C12 17 17 12 22 12C17 12 12 7 12 2Z"
                  fill="#C88A35"
                  opacity="0.8"
                />
                <circle cx="12" cy="12" r="2.5" fill="#F4EFEA" />
              </svg>
            </div>

            <div className="text-[11px] font-mono tracking-widest text-[#D4AF37]">
              FRAME {String(currentFrame).padStart(3, '0')} / {TOTAL_FRAMES}
            </div>
          </div>

          {/* Scroll Progress Bar & Wood Motif Prompt */}
          <div className="hidden sm:flex items-center gap-3 bg-[#1C1410]/90 border border-[#3D2B1F] px-4 py-2 rounded-sm backdrop-blur-md shadow-lg">
            <div className="w-32 h-1.5 bg-[#12100E] border border-[#3D2B1F] rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]">
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
  );
}
