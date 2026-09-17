'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  Bed, 
  Maximize, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  Shield, 
  Clock 
} from 'lucide-react';

import LightboxModal, { LightboxImage } from '@/components/LightboxModal';

interface SuiteItem {
  id: string;
  name: string;
  category: 'presidential' | 'executive' | 'deluxe';
  categoryLabel: string;
  tagline: string;
  mainImage: string;
  galleryImages: string[];
  dimensions: string;
  occupancy: string;
  bedType: string;
  baseRate: number;
  description: string;
  amenities: string[];
  highlights: string[];
}

export default function RoomsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'presidential' | 'executive' | 'deluxe'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeImages, setActiveImages] = useState<LightboxImage[]>([]);

  // Detailed Suite Catalog
  const suites: SuiteItem[] = [
    {
      id: 'presidential-suite',
      name: 'The Presidential Baro Suite',
      category: 'presidential',
      categoryLabel: 'Presidential Category',
      tagline: 'The pinnacle of Ethiopian hospitality and diplomatic privacy.',
      mainImage: '/hotel_photos/Bedroom1.webp',
      galleryImages: [
        '/hotel_photos/Bedroom1.webp',
        '/hotel_photos/Livingroom1.jpeg',
        '/hotel_photos/toilet.jpg',
        '/hotel_photos/Verenda.jpg',
      ],
      dimensions: '88 m² / 947 sq ft',
      occupancy: 'Up to 3 Adults',
      bedType: 'Custom Imperial King (200 x 200 cm)',
      baseRate: 280,
      description: 'The premier accommodation in Addis Ababa, hosting international dignitaries and executive leaders. Features a lavish private master bedroom with hand-carved walnut woodwork, separate soundproofed diplomatic salon, marble en-suite bathroom, and private garden veranda.',
      amenities: [
        'Private Diplomatic Salon for meetings',
        'Italian marble bath with rain shower',
        'Private security entrance corridor',
        'Dedicated 24/7 guest reception liaison',
        'High-speed fiber dedicated network',
        'Espresso machine & private premium bar',
      ],
      highlights: ['Sound-dampened acoustics', 'Direct veranda access', 'Handcrafted carved headboard'],
    },
    {
      id: 'executive-residence',
      name: 'Executive Diplomatic Residence',
      category: 'executive',
      categoryLabel: 'Executive Suite',
      tagline: 'Designed for effortless work, high-level hosting, and rejuvenation.',
      mainImage: '/hotel_photos/Livingroom1.jpeg',
      galleryImages: [
        '/hotel_photos/Livingroom1.jpeg',
        '/hotel_photos/Bedroom2.webp',
        '/hotel_photos/toilet.jpg',
      ],
      dimensions: '65 m² / 700 sq ft',
      occupancy: 'Up to 3 Guests',
      bedType: 'California King-size Bed',
      baseRate: 220,
      description: 'An expansive open-concept suite in Addis Ababa pairing an executive living room with comfortable handcrafted furnishings, writing bureau, and an opulent private bedroom retreat.',
      amenities: [
        'Spacious living salon with plush sofas',
        'Executive work desk with ergonomic chair',
        'Sparkling en-suite tiled bathroom',
        '55” 4K UHD smart entertainment system',
        'Complimentary evening tea & coffee service',
        'Climate-controlled whisper AC',
      ],
      highlights: ['Executive work zone', 'Spacious lounge seating', 'Complimentary garment pressing'],
    },
    {
      id: 'ambassador-suite',
      name: 'Ambassador Garden Chamber',
      category: 'executive',
      categoryLabel: 'Executive Suite',
      tagline: 'Warm timber tones, tranquil foliage views, and lavish appointments.',
      mainImage: '/hotel_photos/Bedroom2.webp',
      galleryImages: [
        '/hotel_photos/Bedroom2.webp',
        '/hotel_photos/Livingroom2.jpeg',
        '/hotel_photos/toilet.jpg',
      ],
      dimensions: '58 m² / 624 sq ft',
      occupancy: '2 Adults',
      bedType: 'Handcrafted King-size Bed',
      baseRate: 190,
      description: 'Bathed in warm golden sunlight through broad windows. Features rich Ethiopian hardwood finishes, plush high-thread linens, and direct access to an adjoining sitting parlor.',
      amenities: [
        'Adjacent private living room parlor',
        'Pristine tiled bathroom with premium toiletries',
        'High-speed Wi-Fi and universal USB charging',
        'Quiet split-system air conditioning',
        'Artisanal tea and coffee selection',
        'Nightly aromatherapy turn-down',
      ],
      highlights: ['Veranda garden views', 'Double vanity sinks', 'Plush bathrobes & slippers'],
    },
    {
      id: 'deluxe-oasis-room',
      name: 'Deluxe Courtyard Chamber',
      category: 'deluxe',
      categoryLabel: 'Deluxe Room',
      tagline: 'A peaceful haven designed for restorative sleep and quiet focus.',
      mainImage: '/hotel_photos/Bedroom3.webp',
      galleryImages: [
        '/hotel_photos/Bedroom3.webp',
        '/hotel_photos/Livingroom2.jpeg',
        '/hotel_photos/toilet.jpg',
      ],
      dimensions: '48 m² / 516 sq ft',
      occupancy: '2 Adults',
      bedType: 'Premium Queen Deluxe Bed',
      baseRate: 160,
      description: 'Thoughtfully planned for visiting business professionals and leisure travelers. Combines comfortable bedding, ambient soft lighting, and an inviting reading lounge with courtyard views in Addis Ababa.',
      amenities: [
        'Private en-suite bathroom with rain shower',
        'Solid wood bedside reading lamps',
        'Laptop-sized digital in-room safe',
        'Daily mineral water & fruit basket',
        'Satellite channels & news network',
        'Blackout privacy curtains',
      ],
      highlights: ['Courtyard serenity', 'Orthopedic mattress', 'Fast check-in privilege'],
    },
    {
      id: 'residence-parlor-suite',
      name: 'The Grand Residence Salon & Suite',
      category: 'presidential',
      categoryLabel: 'Private Residence',
      tagline: 'Extended stay luxury with multiple living zones and guest reception room.',
      mainImage: '/hotel_photos/Livingroom2.jpeg',
      galleryImages: [
        '/hotel_photos/Livingroom2.jpeg',
        '/hotel_photos/Bedroom1.webp',
        '/hotel_photos/toilet.jpg',
      ],
      dimensions: '75 m² / 807 sq ft',
      occupancy: 'Up to 4 Guests',
      bedType: 'King Bed + Optional Twin Chamber',
      baseRate: 250,
      description: 'Ideal for extended ministerial or corporate postings, featuring dual parlor configurations, entertainment credenza, dining table, and seamless privacy partitions in Addis Ababa.',
      amenities: [
        'Separate dining table for in-suite service',
        'Full executive lounge with television console',
        'Modern tiled bathroom with rain shower',
        'Weekly laundry and dry-cleaning inclusion',
        'Dedicated secure parking bay',
        'Bole airport roundtrip transfer',
      ],
      highlights: ['Dual parlor layout', 'Extended stay amenities', 'Private dining setup'],
    },
  ];

  // All Accommodations Lightbox Gallery
  const allRoomPhotos: LightboxImage[] = [
    {
      src: '/hotel_photos/Bedroom1.webp',
      title: 'Presidential Master Bedroom',
      category: 'Bedrooms',
      description: 'Handcrafted luxury king bed with carved headboard and ambient bedside sconces.',
    },
    {
      src: '/hotel_photos/Bedroom2.webp',
      title: 'Ambassador Bedroom Chamber',
      category: 'Bedrooms',
      description: 'Spacious bedroom with natural timber architecture and sunlit morning windows.',
    },
    {
      src: '/hotel_photos/Bedroom3.webp',
      title: 'Deluxe Courtyard Chamber',
      category: 'Bedrooms',
      description: 'Serene guest chamber designed for uncompromised quiet and restorative sleep.',
    },
    {
      src: '/hotel_photos/Livingroom1.jpeg',
      title: 'Diplomatic Living Salon',
      category: 'Suites & Parlors',
      description: 'Opulent living room suite with executive sofas and artisanal coffee tables.',
    },
    {
      src: '/hotel_photos/Livingroom2.jpeg',
      title: 'Residence Lounge & Parlor',
      category: 'Suites & Parlors',
      description: 'Refined lounge setup connecting private bedrooms with executive entertainment areas.',
    },
    {
      src: '/hotel_photos/toilet.jpg',
      title: 'Marble En-Suite Bathroom',
      category: 'Bathrooms',
      description: 'Pristine bathroom featuring contemporary rain shower fixtures, spotless mirrors, and luxury amenities.',
    },
  ];

  const filteredSuites = selectedFilter === 'all'
    ? suites
    : suites.filter((s) => s.category === selectedFilter);

  const openSuiteLightbox = (suite: SuiteItem, startIndex = 0) => {
    const images: LightboxImage[] = suite.galleryImages.map((src) => {
      let title = suite.name;
      if (src.includes('toilet')) title = `${suite.name} — Private Bathroom`;
      else if (src.includes('Livingroom')) title = `${suite.name} — Living Parlor`;
      else if (src.includes('Bedroom')) title = `${suite.name} — Bed Chamber`;
      return {
        src,
        title,
        category: suite.categoryLabel,
        description: suite.description,
      };
    });
    setActiveImages(images);
    setActiveImageIndex(startIndex);
    setLightboxOpen(true);
  };

  return (
    <main id="rooms-page" className="min-h-screen bg-[#12100E] text-[#F4EFEA] pt-28 pb-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#3D2B1F]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1410] border border-[#C88A35]/40 mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Sanctuary of Refined Living
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight leading-tight mb-4">
            Accommodations & Suites
          </h1>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4" />
          <p className="text-sm sm:text-base text-[#F4EFEA]/80 font-light leading-relaxed">
            Every suite at Gambela Hotel in Addis Ababa has been meticulously conceived to offer exceptional quietude, generous spatial layouts, and bespoke Ethiopian woodwork craftsmanship.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {(
            [
              { id: 'all', label: 'All Suites (5)' },
              { id: 'presidential', label: 'Presidential Suites' },
              { id: 'executive', label: 'Executive Diplomatic' },
              { id: 'deluxe', label: 'Deluxe Rooms' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-5 py-2.5 font-serif text-xs uppercase tracking-[0.18em] rounded-sm transition-all ${
                selectedFilter === filter.id
                  ? 'bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] text-[#D4AF37] border border-[#D4AF37] shadow-[0_0_15px_rgba(200,138,53,0.3)]'
                  : 'bg-[#1C1410] text-[#F4EFEA]/70 hover:text-[#D4AF37] border border-[#3D2B1F]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Suites Catalog List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {filteredSuites.map((suite, idx) => (
            <div
              key={suite.id}
              id={`suite-item-${suite.id}`}
              className="group rounded-lg border-2 border-[#3D2B1F] bg-[#1C1410] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:border-[#D4AF37]/60 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Media Column (Lg: 7 cols) */}
              <div className="lg:col-span-7 relative flex flex-col">
                {/* Main Large Photo */}
                <div className="relative h-[340px] sm:h-[420px] w-full overflow-hidden bg-black">
                  <Image
                    src={suite.mainImage}
                    alt={suite.name}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-sm bg-[#12100E]/80 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono border border-[#3D2B1F]">
                    {suite.categoryLabel}
                  </span>
                  <button
                    onClick={() => openSuiteLightbox(suite, 0)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-[#12100E]/80 text-[#F4EFEA] hover:text-[#D4AF37] transition-colors border border-[#3D2B1F]"
                    aria-label={`View photos of ${suite.name}`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-Gallery Thumbnail Strip */}
                <div className="bg-[#12100E] p-3 grid grid-cols-4 gap-2.5 border-t border-[#3D2B1F]">
                  {suite.galleryImages.map((thumbSrc, thumbIdx) => (
                    <button
                      key={thumbSrc + thumbIdx}
                      onClick={() => openSuiteLightbox(suite, thumbIdx)}
                      className="relative h-16 rounded overflow-hidden border border-[#3D2B1F] hover:border-[#D4AF37] transition-all group/thumb focus:outline-none"
                    >
                      <Image
                        src={thumbSrc}
                        alt={`${suite.name} photo ${thumbIdx + 1}`}
                        fill
                        className="object-cover group-hover/thumb:scale-110 transition-transform"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Suite Information Column (Lg: 5 cols) */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#3D2B1F]">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-mono tracking-widest text-[#D4AF37]/80">
                      REF: {suite.id.toUpperCase().slice(0, 10)}
                    </span>
                    <div className="text-right">
                      <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37] font-semibold">
                        ${suite.baseRate}
                      </span>
                      <span className="text-xs text-[#F4EFEA]/50 block -mt-1 font-mono">/ night</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F4EFEA] mb-2">
                    {suite.name}
                  </h2>
                  <p className="text-xs text-[#D4AF37] font-light italic mb-4">
                    {suite.tagline}
                  </p>
                  <p className="text-xs text-[#F4EFEA]/70 leading-relaxed font-light mb-6">
                    {suite.description}
                  </p>

                  {/* Specifications Badge Bar */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#3D2B1F] text-xs text-[#F4EFEA]/80 font-mono mb-6">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-[#D4AF37]" />
                      <span>{suite.dimensions}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>{suite.occupancy}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Bed className="w-4 h-4 text-[#D4AF37]" />
                      <span>{suite.bedType}</span>
                    </div>
                  </div>

                  {/* In-Suite Amenities Checklist */}
                  <div className="mb-6">
                    <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">
                      Suite Features & Technology
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {suite.amenities.slice(0, 4).map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 text-xs text-[#F4EFEA]/70 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/booking?room=${encodeURIComponent(suite.name)}`}
                    id={`book-suite-btn-${suite.id}`}
                    className="flex-1 py-3 text-center font-serif text-xs uppercase tracking-[0.2em] font-semibold text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] rounded-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Reserve Suite</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </Link>
                  <button
                    onClick={() => openSuiteLightbox(suite, 0)}
                    className="px-4 py-3 bg-[#12100E] hover:bg-[#1C1410] text-[#F4EFEA]/80 hover:text-[#D4AF37] text-xs uppercase tracking-wider rounded-sm border border-[#3D2B1F] transition-colors"
                  >
                    Photos ({suite.galleryImages.length})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accommodations Photo Gallery Lightbox Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#3D2B1F]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Visual Exploration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight">
            Accommodations Media Gallery
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />
          <p className="text-xs sm:text-sm text-[#F4EFEA]/70 font-light">
            Click any interior photograph below to launch our high-definition room inspector.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {allRoomPhotos.map((photo, pIdx) => (
            <div
              key={photo.src}
              onClick={() => {
                setActiveImages(allRoomPhotos);
                setActiveImageIndex(pIdx);
                setLightboxOpen(true);
              }}
              className="group relative h-56 sm:h-64 rounded-lg overflow-hidden border border-[#3D2B1F] bg-[#1C1410] cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:border-[#D4AF37]/70 transition-all"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-mono">
                  {photo.category}
                </span>
                <span className="text-xs font-serif text-[#F4EFEA] font-medium">
                  {photo.title}
                </span>
              </div>
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#12100E]/80 text-[#F4EFEA] border border-[#3D2B1F]">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guest Policies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#1C1410]/50 rounded-xl border border-[#3D2B1F] my-12 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <h3 className="font-serif text-2xl text-[#F4EFEA] mb-8 text-center">
          Residency Policies & Guest Amenities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#F4EFEA]/70 leading-relaxed font-light">
          <div className="space-y-2 p-5 rounded bg-[#12100E] border border-[#3D2B1F] shadow-inner">
            <h4 className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              Check-In & Check-Out
            </h4>
            <p>Check-in begins at 14:00. Early arrivals are accommodated upon prior arrangement. Check-out is 12:00 noon. Complimentary luggage vault available.</p>
          </div>

          <div className="space-y-2 p-5 rounded bg-[#12100E] border border-[#3D2B1F] shadow-inner">
            <h4 className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              Diplomatic Protocol
            </h4>
            <p>Security escorts, private motorcade clearance, and discreet entry lanes can be arranged directly with our guest relations team in Addis Ababa.</p>
          </div>

          <div className="space-y-2 p-5 rounded bg-[#12100E] border border-[#3D2B1F] shadow-inner">
            <h4 className="font-semibold text-[#D4AF37] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              In-Room Dining
            </h4>
            <p>24-hour room service offering continental breakfast, traditional Ethiopian dishes, and late-night beverage selections prepared fresh.</p>
          </div>
        </div>
      </section>

      {/* Dynamic Lightbox Modal */}
      <LightboxModal
        images={activeImages}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setActiveImageIndex(idx)}
      />
    </main>
  );
}
