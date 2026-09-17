'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Wifi, 
  Coffee, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  Maximize2,
  Users, 
  Utensils, 
  Wine, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

import ScrollCanvasSequence from '@/components/ScrollCanvasSequence';
import LightboxModal, { LightboxImage } from '@/components/LightboxModal';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const accommodationsRef = useRef<HTMLDivElement | null>(null);
  const diningRef = useRef<HTMLDivElement | null>(null);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<LightboxImage[]>([]);

  // Staggered fade-up animation with GSAP ScrollTrigger
  useEffect(() => {
    const overviewEl = overviewRef.current;
    if (!overviewEl) return;

    const ctx = gsap.context(() => {
      // Fade up entrance & veranda
      gsap.fromTo(
        '.gsap-fade-up',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: overviewEl,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Suites cards stagger
      const suitesEl = accommodationsRef.current;
      if (suitesEl) {
        gsap.fromTo(
          '.gsap-suite-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: suitesEl,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Dining masonry cards stagger
      const diningEl = diningRef.current;
      if (diningEl) {
        gsap.fromTo(
          '.gsap-dining-card',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: diningEl,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const openLightbox = (images: LightboxImage[], index: number) => {
    setLightboxImages(images);
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const accommodationItems: (LightboxImage & {
    price: string;
    size: string;
    guests: string;
  })[] = [
    {
      src: '/hotel_photos/Bedroom1.webp',
      title: 'The Presidential Baro Suite',
      category: 'Presidential Wing',
      price: '$280 / night',
      size: '88 m²',
      guests: 'Up to 3 Guests',
      description: 'Expansive master suite featuring bespoke carved walnut headboards, plush Egyptian cotton linens, private terrace access, and a marble bath with soaking tub.',
    },
    {
      src: '/hotel_photos/Livingroom1.jpeg',
      title: 'Executive Diplomatic Residence',
      category: 'Diplomatic Suite',
      price: '$220 / night',
      size: '65 m²',
      guests: 'Up to 3 Guests',
      description: 'Elegant dual-room layout boasting handcrafted Ethiopian timber accents, sound-insulated private lounge, and formal work desk.',
    },
    {
      src: '/hotel_photos/Bedroom2.webp',
      title: 'Ambassador Garden Chamber',
      category: 'Executive Suite',
      price: '$190 / night',
      size: '58 m²',
      guests: 'Up to 2 Guests',
      description: 'Secluded luxury chamber positioned toward the serene private courtyards, highlighted by artisanal carvings and soothing earth-toned palettes.',
    },
    {
      src: '/hotel_photos/Livingroom2.jpeg',
      title: 'Royal Family Salon Suite',
      category: 'Family Suite',
      price: '$250 / night',
      size: '78 m²',
      guests: 'Up to 4 Guests',
      description: 'Spacious interconnecting living quarters thoughtfully furnished with artisanal carved coffee tables and ample social lounging room.',
    },
    {
      src: '/hotel_photos/Bedroom3.webp',
      title: 'Deluxe Courtyard Chamber',
      category: 'Deluxe Room',
      price: '$160 / night',
      size: '45 m²',
      guests: 'Up to 2 Guests',
      description: 'Warm, sunlit quarters featuring bespoke carved wood details, premium orthopedic bedding, and quiet courtyard garden balconies.',
    },
  ];

  const diningItems: (LightboxImage & {
    time: string;
    subtitle: string;
  })[] = [
    {
      src: '/hotel_photos/Cafe1.jpg',
      title: 'The Veranda Coffee Pavilion',
      category: 'Artisanal Cafe',
      subtitle: 'Single-origin Ethiopian highland beans roasted over traditional charcoal embers.',
      time: '06:30 – 23:00',
      description: 'A serene open-air pavilion surrounded by tropical greenery, serving authentic Jebena coffee rituals, fresh pastries, and tropical juices.',
    },
    {
      src: encodeURI('/hotel_photos/Cafe portrait.jpg'),
      title: 'Garden Terrace Solarium',
      category: 'Outdoor Lounge',
      subtitle: 'Natural sunlight and comfortable wicker armchairs on the garden deck.',
      time: '07:00 – Late',
      description: 'The preferred meeting place for visiting delegations and leisurely morning breakfasts in Addis Ababa.',
    },
    {
      src: encodeURI('/hotel_photos/Coffee tables.jpg'),
      title: 'Patron Lounge & Coffee Tables',
      category: 'Interior Social Hub',
      subtitle: 'Intimate seating nooks tailored for discreet conversation and cocktails.',
      time: 'All Day',
      description: 'Warm mood lighting, polished hardwood tables, and exceptional attentive table service.',
    },
    {
      src: '/hotel_photos/Food.jpg',
      title: 'Signature Ethiopian Banquet',
      category: 'Gastronomy',
      subtitle: 'Authentic regional delicacies and gourmet farm-to-table tasting plates.',
      time: 'Lunch & Dinner',
      description: 'Succulent slow-simmered dishes, freshly baked injera, and flavorful aromatic spices crafted with organic ingredients.',
    },
    {
      src: '/hotel_photos/Food2.jpg',
      title: 'Continental & Regional Fusion',
      category: 'Chef Specialties',
      subtitle: 'Masterfully plated dishes marrying international culinary art with local produce.',
      time: 'Dinner Service',
      description: 'Prime cuts, delicate regional specialties, and organic garden salads.',
    },
    {
      src: '/hotel_photos/Cocktails.jpg',
      title: 'Sunset Botanical Bar & Mixology',
      category: 'Bar & Spirits',
      subtitle: 'Handcrafted signature cocktails, single malts, and chilled reserve wines.',
      time: '16:00 – 01:00',
      description: 'Bespoke cocktails infused with Ethiopian honey, fresh passionfruit, and aromatic botanicals.',
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#12100E] text-[#F4EFEA] overflow-x-hidden">
      {/* 1. HERO SECTION: GSAP SCROLL-DRIVEN CANVAS SEQUENCE */}
      <section id="hero-sequence-section" className="relative">
        <ScrollCanvasSequence />
      </section>

      {/* 2. OVERVIEW & ENTRANCE SECTION */}
      <section
        ref={overviewRef}
        id="overview-section"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#3D2B1F]"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1410] border border-[#C88A35]/40 mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Architectural Heritage & Distinction
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight leading-tight">
            A Haven of Serenity and Splendor in Addis Ababa
          </h2>

          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-5 mx-auto" />

          <p className="text-sm sm:text-base text-[#F4EFEA]/80 font-light leading-relaxed">
            From monumental welcoming gates to breezy open-air verandas overlooking tropical flora, Gambela Hotel sets the benchmark for executive accommodations, peaceful retreats, and diplomatic gatherings in the capital.
          </p>
        </div>

        {/* Featured Entrance & Veranda Grid with Carved Wood Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Entrance Showcase Card */}
          <div
            id="overview-entrance-card"
            className="gsap-fade-up group relative rounded-lg overflow-hidden border-2 border-[#3D2B1F] bg-[#1C1410] shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:border-[#D4AF37]/60 transition-all duration-500"
          >
            <div className="relative h-[380px] sm:h-[450px] w-full overflow-hidden">
              <Image
                src="/hotel_photos/Entrance.jpg"
                alt="Grand Entrance of Gambela Hotel in Addis Ababa"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-black/25 to-transparent" />
              <button
                onClick={() =>
                  openLightbox(
                    [
                      {
                        src: '/hotel_photos/Entrance.jpg',
                        title: 'Grand Entrance & Portico',
                        category: 'Architecture',
                        description: 'The monumental entrance of Gambela Hotel welcoming dignitaries and guests with 24/7 security in Addis Ababa.',
                      },
                      {
                        src: '/hotel_photos/Verenda.jpg',
                        title: 'The Veranda Promenade',
                        category: 'Gardens & Terraces',
                        description: 'Expansive open-air veranda designed for gentle breezes, morning coffee, and peaceful sunsets.',
                      },
                    ],
                    0
                  )
                }
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#12100E]/80 backdrop-blur-md text-[#F4EFEA] hover:text-[#D4AF37] hover:bg-[#12100E] border border-[#3D2B1F] transition-colors"
                aria-label="View Entrance in full screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] mb-2 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Executive Portico & Security</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#F4EFEA] mb-3">
                The Monumental Arrival
              </h3>
              <p className="text-xs sm:text-sm text-[#F4EFEA]/70 font-light leading-relaxed mb-6">
                Guarded gates open into a secluded compound of palms, manicured lawns, and secure executive parking, guaranteeing complete privacy and seamless arrival protocols.
              </p>
              <div className="flex items-center gap-6 text-xs text-[#D4AF37]/90 font-mono tracking-wider">
                <span>• 24/7 Monitored Access</span>
                <span>• Valet & Escort</span>
              </div>
            </div>
          </div>

          {/* Veranda Showcase Card */}
          <div
            id="overview-veranda-card"
            className="gsap-fade-up group relative rounded-lg overflow-hidden border-2 border-[#3D2B1F] bg-[#1C1410] shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:border-[#D4AF37]/60 transition-all duration-500"
          >
            <div className="relative h-[380px] sm:h-[450px] w-full overflow-hidden">
              <Image
                src="/hotel_photos/Verenda.jpg"
                alt="Open Air Veranda of Gambela Hotel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-black/25 to-transparent" />
              <button
                onClick={() =>
                  openLightbox(
                    [
                      {
                        src: '/hotel_photos/Verenda.jpg',
                        title: 'The Veranda Promenade',
                        category: 'Gardens & Terraces',
                        description: 'Expansive open-air veranda designed for gentle breezes, morning coffee, and panoramic sunsets.',
                      },
                      {
                        src: '/hotel_photos/Entrance.jpg',
                        title: 'Grand Entrance & Portico',
                        category: 'Architecture',
                        description: 'The monumental entrance of Gambela Hotel welcoming dignitaries and guests with 24/7 security.',
                      },
                    ],
                    0
                  )
                }
                className="absolute top-4 right-4 p-2.5 rounded-full bg-[#12100E]/80 backdrop-blur-md text-[#F4EFEA] hover:text-[#D4AF37] hover:bg-[#12100E] border border-[#3D2B1F] transition-colors"
                aria-label="View Veranda in full screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] mb-2 font-mono">
                <Compass className="w-4 h-4" />
                <span>Tranquil Garden Promenade</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#F4EFEA] mb-3">
                The Veranda Promenade
              </h3>
              <p className="text-xs sm:text-sm text-[#F4EFEA]/70 font-light leading-relaxed mb-6">
                Shaded walkways and breezy open corridors invite you to savor the pleasant Addis Ababa climate. Connect with colleagues or unwind in peace under cooling architectural eaves.
              </p>
              <div className="flex items-center gap-6 text-xs text-[#D4AF37]/90 font-mono tracking-wider">
                <span>• Natural Cross-Ventilation</span>
                <span>• Garden Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCOMMODATIONS SHOWCASE GRID */}
      <section
        ref={accommodationsRef}
        id="accommodations-section"
        className="py-24 bg-[#1C1410]/40 border-t border-[#3D2B1F]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
                Handcrafted Residences
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight">
                Luxury Suites & Private Quarters
              </h2>
            </div>
            <Link
              href="/rooms"
              id="view-all-suites-link"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F4EFEA] font-semibold transition-colors group"
            >
              <span>Explore Complete Suite Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Interactive Suites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodationItems.map((room, idx) => (
              <div
                key={room.title}
                id={`suite-card-${idx}`}
                className="gsap-suite-card group rounded-lg overflow-hidden border border-[#3D2B1F] bg-[#1C1410] flex flex-col hover:border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.95)] transition-all duration-300"
              >
                {/* Photo container with carved framing */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={room.src}
                    alt={room.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-sm bg-[#12100E]/80 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono border border-[#3D2B1F]">
                    {room.category}
                  </span>
                  <button
                    onClick={() => openLightbox(accommodationItems, idx)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#12100E]/80 text-[#F4EFEA] hover:text-[#D4AF37] border border-[#3D2B1F] transition-colors"
                    aria-label={`Enlarge photo of ${room.title}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F4EFEA] font-mono">
                    <span>{room.size}</span>
                    <span className="text-[#D4AF37] font-medium">{room.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#F4EFEA] mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {room.title}
                    </h3>
                    <p className="text-xs text-[#F4EFEA]/70 font-light leading-relaxed mb-6">
                      {room.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#3D2B1F] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#F4EFEA]/70 text-xs">
                      <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{room.guests}</span>
                    </div>
                    <Link
                      href={`/booking?room=${encodeURIComponent(room.title)}`}
                      className="text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#F4EFEA] font-medium flex items-center gap-1"
                    >
                      <span>Book Suite</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Diplomatic Delegations Card */}
            <div className="gsap-suite-card rounded-lg overflow-hidden border-2 border-[#3D2B1F] bg-gradient-to-br from-[#2A1E17] via-[#1C1410] to-[#12100E] p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div>
                <div className="w-10 h-10 rounded-sm bg-[#12100E] border border-[#C88A35]/40 flex items-center justify-center text-[#D4AF37] mb-6 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                  Diplomatic Delegations
                </span>
                <h3 className="font-serif text-2xl text-[#F4EFEA] mb-3">
                  Full Wing & Compound Reservations
                </h3>
                <p className="text-xs text-[#F4EFEA]/80 leading-relaxed font-light mb-6">
                  Traveling with an international delegation, ministry summit, or diplomatic entourage? Secure an entire private accommodation wing with dedicated executive chef and security coordination in Addis Ababa.
                </p>
                <ul className="space-y-2.5 text-xs text-[#F4EFEA]/70 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Dedicated private corridor access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Executive meeting room access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Direct airport escort transfer</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/booking"
                className="mt-8 w-full py-3.5 text-center font-serif text-xs uppercase tracking-[0.2em] font-semibold text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/60 hover:border-[#D4AF37] rounded-sm transition-all shadow-lg"
              >
                Inquire For Delegation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DINING & LOUNGE SECTION */}
      <section
        ref={diningRef}
        id="dining-section"
        className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Gastronomy & Mixology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight">
            Culinary Craft & Veranda Lounge
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />
          <p className="text-xs sm:text-sm text-[#F4EFEA]/80 font-light leading-relaxed">
            From the fragrant aroma of freshly roasted Ethiopian highland beans to curated evening cocktails, our dining spaces deliver sensory delight.
          </p>
        </div>

        {/* High-End Masonry Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diningItems.map((item, idx) => (
            <div
              key={item.title}
              id={`dining-card-${idx}`}
              className="gsap-dining-card group relative rounded-lg overflow-hidden border border-[#3D2B1F] bg-[#1C1410] shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col hover:border-[#D4AF37]/60 transition-all duration-300"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-sm bg-[#12100E]/80 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono border border-[#3D2B1F]">
                  {item.category}
                </span>
                <button
                  onClick={() => openLightbox(diningItems, idx)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#12100E]/80 text-[#F4EFEA] hover:text-[#D4AF37] border border-[#3D2B1F] transition-colors"
                  aria-label={`Enlarge photo of ${item.title}`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-[#1C1410]">
                <div>
                  <div className="flex items-center gap-2 text-[#D4AF37] text-[11px] font-mono mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{item.time}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#F4EFEA] mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F4EFEA]/70 font-light leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3D2B1F] flex items-center justify-between text-xs">
                  <span className="text-[#F4EFEA]/40 uppercase tracking-widest text-[10px]">
                    Table Service
                  </span>
                  <Link
                    href="/dining"
                    className="text-[#D4AF37] hover:text-[#F4EFEA] font-medium flex items-center gap-1 uppercase tracking-wider text-[11px]"
                  >
                    <span>View Menu</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button to Dining Page */}
        <div className="mt-14 text-center">
          <Link
            href="/dining"
            id="explore-dining-page-btn"
            className="inline-flex items-center gap-3 px-8 py-3.5 font-serif text-xs uppercase tracking-[0.25em] text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all rounded-sm shadow-xl"
          >
            <Utensils className="w-4 h-4 text-[#D4AF37]" />
            <span>Discover Full Dining Menus & Lounges</span>
          </Link>
        </div>
      </section>

      {/* 5. LUXURY AMENITIES STRIP */}
      <section id="amenities-highlights" className="py-20 bg-[#1C1410]/60 border-t border-[#3D2B1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-[#12100E] border border-[#3D2B1F] shadow-inner">
              <Wifi className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-serif text-[#F4EFEA] tracking-wide uppercase mb-1">
                High-Speed Wi-Fi
              </h4>
              <p className="text-xs text-[#F4EFEA]/60 font-light">
                High-throughput connectivity throughout the grounds
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-[#12100E] border border-[#3D2B1F] shadow-inner">
              <Coffee className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-serif text-[#F4EFEA] tracking-wide uppercase mb-1">
                Coffee Rituals
              </h4>
              <p className="text-xs text-[#F4EFEA]/60 font-light">
                Daily traditional roasting and Jebena brewing
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-[#12100E] border border-[#3D2B1F] shadow-inner">
              <Wine className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-serif text-[#F4EFEA] tracking-wide uppercase mb-1">
                Artisanal Bar
              </h4>
              <p className="text-xs text-[#F4EFEA]/60 font-light">
                Curated cocktails & vintage African wines
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-[#12100E] border border-[#3D2B1F] shadow-inner">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-sm font-serif text-[#F4EFEA] tracking-wide uppercase mb-1">
                Executive Security
              </h4>
              <p className="text-xs text-[#F4EFEA]/60 font-light">
                Gated compound with dedicated 24/7 security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section
        id="reservation-cta-banner"
        className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#2A1E17] via-[#1C1410] to-[#12100E] border-t border-[#3D2B1F] text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
            Plan Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight">
            Reserve Your Haven at Gambela Hotel
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />
          <p className="text-sm text-[#F4EFEA]/80 max-w-xl mx-auto font-light leading-relaxed">
            Experience an authentic Ethiopian sanctuary in Addis Ababa. Enjoy instant booking confirmation, flexible arrangements, and dedicated reception care.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              id="cta-book-btn"
              className="px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all duration-300 rounded-sm"
            >
              Check Availability & Rates
            </Link>
            <Link
              href="/rooms"
              className="px-8 py-3.5 font-serif text-xs tracking-[0.25em] uppercase text-[#D4AF37] bg-[#12100E] hover:bg-[#1C1410] border border-[#3D2B1F] hover:border-[#C88A35]/60 transition-colors rounded-sm"
            >
              Browse Rooms & Amenities
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={lightboxImages}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setActiveImageIndex(idx)}
      />
    </main>
  );
}
