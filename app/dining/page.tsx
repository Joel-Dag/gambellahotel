'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Coffee, 
  Utensils, 
  Wine, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

import LightboxModal, { LightboxImage } from '@/components/LightboxModal';

export default function DiningPage() {
  const [activeMenuTab, setActiveMenuTab] = useState<'ethiopian' | 'continental' | 'coffee' | 'cocktails'>('ethiopian');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Table reservation form state
  const [reserved, setReserved] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestTime, setGuestTime] = useState('19:30');
  const [guestCount, setGuestCount] = useState('2 Guests');

  // Complete inventory of dining & cafe images
  const diningGallery: LightboxImage[] = [
    {
      src: '/hotel_photos/Cafe1.jpg',
      title: 'Veranda Cafe Lounge',
      category: 'Cafe & Terrace',
      description: 'Lush greenery and breezy shade create an enchanting backdrop for morning coffee and light fare in Addis Ababa.',
    },
    {
      src: '/hotel_photos/Cafe2.jpg',
      title: 'Terrace Garden Pavilion',
      category: 'Outdoor Dining',
      description: 'Open-air patio dining overlooking gardens, ideal for afternoon lunches and private discussions.',
    },
    {
      src: '/hotel_photos/Cafe3.jpg',
      title: 'Al Fresco Veranda Seating',
      category: 'Veranda Ambiance',
      description: 'Handcrafted outdoor furniture sheltered under elegant cooling awnings.',
    },
    {
      src: '/hotel_photos/Cafe4.jpeg',
      title: 'Veranda Bistro Tables',
      category: 'Bistro & Lounge',
      description: 'Intimate bistro tables where morning light filters through tranquil garden palms.',
    },
    {
      src: encodeURI('/hotel_photos/Coffee tables.jpg'),
      title: 'Patron Lounge Coffee Tables',
      category: 'Interior Social Hub',
      description: 'Polished hardwood tables set in cozy nooks for conversational coffee meetings and cocktail service.',
    },
    {
      src: encodeURI('/hotel_photos/Cafe portrait.jpg'),
      title: 'The Solarium Deck',
      category: 'Garden Terrace',
      description: 'Sun-dappled terrace seating with sweeping views of the enclosed hotel grounds in Addis Ababa.',
    },
    {
      src: '/hotel_photos/Food.jpg',
      title: 'Authentic Ethiopian Feast',
      category: 'Gastronomy',
      description: 'Exquisite slow-simmered regional stews served atop hand-rolled teff injera with savory accompaniments.',
    },
    {
      src: '/hotel_photos/Food2.jpg',
      title: 'Gourmet Chef Specialty Plating',
      category: 'Fine Dining',
      description: 'Pan-seared tenderloin and fresh garden herbs prepared with contemporary culinary flair.',
    },
    {
      src: '/hotel_photos/Food3.jpg',
      title: 'Fresh Regional Delicacies',
      category: 'Artisanal Plates',
      description: 'Fresh regional specialties and vibrant organic vegetables sourced directly from local producers.',
    },
    {
      src: '/hotel_photos/Cocktails.jpg',
      title: 'Sunset Botanical Mixology',
      category: 'Bar & Spirits',
      description: 'Signature craft cocktails, aged single malts, and chilled reserve wines served in the twilight lounge.',
    },
  ];

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName.trim()) {
      setReserved(true);
      setTimeout(() => setReserved(false), 6000);
    }
  };

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main id="dining-page" className="min-h-screen bg-[#12100E] text-[#F4EFEA] pt-28 pb-20">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-[#3D2B1F]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1410] border border-[#C88A35]/40 mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Epicurean Artistry
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight leading-tight mb-4">
            Dining, Veranda Cafe & Cocktail Bar
          </h1>
          <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4" />
          <p className="text-sm sm:text-base text-[#F4EFEA]/80 font-light leading-relaxed">
            Immerse your senses in Gambela Hotel’s premier culinary sanctuary in Addis Ababa. Savor time-honored Ethiopian culinary traditions, continental gastronomic classics, and single-origin coffee rituals.
          </p>
        </div>
      </section>

      {/* Featured Venues Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Venue 1: The Veranda Cafe */}
          <div className="rounded-lg border-2 border-[#3D2B1F] bg-[#1C1410] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col group hover:border-[#D4AF37]/60 transition-all">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/hotel_photos/Cafe1.jpg"
                alt="Veranda Cafe at Gambela Hotel"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-transparent to-transparent" />
              <button
                onClick={() => openLightbox(0)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#12100E]/80 text-[#F4EFEA] hover:text-[#D4AF37] border border-[#3D2B1F]"
                aria-label="Enlarge photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#D4AF37] mb-2">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>06:30 – 23:00 • DAILY</span>
                </div>
                <h3 className="font-serif text-xl text-[#F4EFEA] mb-2">The Veranda Cafe</h3>
                <p className="text-xs text-[#F4EFEA]/70 font-light leading-relaxed mb-4">
                  Under high wooden awnings and garden breezes, enjoy hand-pulled espresso, pastries, light lunches, and traditional ceremonial coffee roasted on hot embers.
                </p>
              </div>
              <button
                onClick={() => setActiveMenuTab('coffee')}
                className="inline-flex items-center gap-1.5 px-4 py-2 font-serif text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#F4EFEA] bg-[#12100E] hover:bg-[#2A1E17] border border-[#3D2B1F] hover:border-[#C88A35] rounded-sm transition-all w-fit cursor-pointer"
              >
                <span>Coffee & Pastry Menu</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Venue 2: The Main Dining Salon */}
          <div className="rounded-lg border-2 border-[#3D2B1F] bg-[#1C1410] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col group hover:border-[#D4AF37]/60 transition-all">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/hotel_photos/Food.jpg"
                alt="Main Dining Salon"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-transparent to-transparent" />
              <button
                onClick={() => openLightbox(6)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#12100E]/80 text-[#F4EFEA] hover:text-[#D4AF37] border border-[#3D2B1F]"
                aria-label="Enlarge photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#D4AF37] mb-2">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>11:30 – 22:30 • LUNCH & DINNER</span>
                </div>
                <h3 className="font-serif text-xl text-[#F4EFEA] mb-2">The Dining Hall</h3>
                <p className="text-xs text-[#F4EFEA]/70 font-light leading-relaxed mb-4">
                  Sophisticated table service spotlighting royal Ethiopian delicacies, regional fish specialties, prime steaks, and Mediterranean-inspired salads in Addis Ababa.
                </p>
              </div>
              <button
                onClick={() => setActiveMenuTab('ethiopian')}
                className="inline-flex items-center gap-1.5 px-4 py-2 font-serif text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#F4EFEA] bg-[#12100E] hover:bg-[#2A1E17] border border-[#3D2B1F] hover:border-[#C88A35] rounded-sm transition-all w-fit cursor-pointer"
              >
                <span>Gastronomy Menu</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Venue 3: The Sunset Cocktail Bar */}
          <div className="rounded-lg border-2 border-[#3D2B1F] bg-[#1C1410] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col group hover:border-[#D4AF37]/60 transition-all">
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src="/hotel_photos/Cocktails.jpg"
                alt="Cocktail Bar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-transparent to-transparent" />
              <button
                onClick={() => openLightbox(9)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#12100E]/80 text-[#F4EFEA] hover:text-[#D4AF37] border border-[#3D2B1F]"
                aria-label="Enlarge photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#D4AF37] mb-2">
                  <Wine className="w-3.5 h-3.5" />
                  <span>16:00 – 01:00 • EVENINGS</span>
                </div>
                <h3 className="font-serif text-xl text-[#F4EFEA] mb-2">The Sunset Botanical Bar</h3>
                <p className="text-xs text-[#F4EFEA]/70 font-light leading-relaxed mb-4">
                  Sip artisanal infusions as evening falls over the Addis Ababa landscape. Premium international spirits, bespoke cocktails, and Ethiopian honey wine.
                </p>
              </div>
              <button
                onClick={() => setActiveMenuTab('cocktails')}
                className="inline-flex items-center gap-1.5 px-4 py-2 font-serif text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#F4EFEA] bg-[#12100E] hover:bg-[#2A1E17] border border-[#3D2B1F] hover:border-[#C88A35] rounded-sm transition-all w-fit cursor-pointer"
              >
                <span>Cocktail & Wine List</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary & Cafe Lightbox Media Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#3D2B1F]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Gallery Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight">
            The Ambiance & Dishes in Frame
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />
          <p className="text-xs sm:text-sm text-[#F4EFEA]/70 font-light">
            Select any image to inspect our verandas, dining lounges, and handcrafted plates.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {diningGallery.map((item, idx) => (
            <div
              key={item.src}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 rounded-lg overflow-hidden border border-[#3D2B1F] bg-[#1C1410] cursor-pointer hover:border-[#D4AF37]/60 shadow-[0_8px_20px_rgba(0,0,0,0.8)] transition-all"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-mono">
                  {item.category}
                </span>
                <span className="text-xs font-serif text-[#F4EFEA] truncate">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Menus Section */}
      <section id="menus-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#3D2B1F]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Curated Menus
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight">
            Culinary Craftsmanship
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto" />
        </div>

        {/* Menu Navigation Tabs */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-12">
          {(
            [
              { id: 'ethiopian', label: 'Ethiopian Specialties' },
              { id: 'continental', label: 'Continental & Grill' },
              { id: 'coffee', label: 'Veranda Coffee & Tea' },
              { id: 'cocktails', label: 'Craft Mixology & Wine' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMenuTab(tab.id)}
              className={`px-6 py-2.5 font-serif text-xs uppercase tracking-[0.18em] rounded-sm transition-all ${
                activeMenuTab === tab.id
                  ? 'bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] text-[#D4AF37] border border-[#D4AF37] shadow-[0_0_15px_rgba(200,138,53,0.3)]'
                  : 'bg-[#1C1410] text-[#F4EFEA]/70 hover:text-[#D4AF37] border border-[#3D2B1F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Content Display with Carved Card Container */}
        <div className="max-w-4xl mx-auto bg-[#1C1410] border-2 border-[#3D2B1F] rounded-xl p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          {activeMenuTab === 'ethiopian' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-6 border-b border-[#3D2B1F]">
                <h3 className="font-serif text-2xl text-[#F4EFEA]">Traditional Heritage Feast</h3>
                <p className="text-xs text-[#D4AF37] font-light mt-1">
                  Served with organic Teff Injera, fresh cottage cheese (Ayib), and seasoned collard greens (Gomen).
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Special Nile Perch Tibs</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$18.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Fresh fish cubes sautéed with rosemary, red onions, jalapeños, and spiced clarified butter.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Royal Doro Wat</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$20.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Slow-braised free-range chicken simmered in rich berbere red pepper sauce with organic hard-boiled egg.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Special Prime Kitfo</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$19.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Minced highland beef warmed in spiced clarified butter (Niter Kibbeh) and mitmita pepper, served with Kocho.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Shiro Tegabino Clay Pot</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$14.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Roasted chickpea puree bubbling hot with garlic, shallots, and ginger in a traditional earthenware dish.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeMenuTab === 'continental' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-6 border-b border-[#3D2B1F]">
                <h3 className="font-serif text-2xl text-[#F4EFEA]">Continental & Grills</h3>
                <p className="text-xs text-[#D4AF37] font-light mt-1">
                  Prepared to order with imported olive oils, prime meats, and farm-fresh sides in Addis Ababa.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Char-Grilled Beef Filet</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$26.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    250g prime beef tenderloin with green peppercorn jus, roasted garlic potato puree, and grilled asparagus.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Pan-Seared Perch Steak</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$22.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Crisp skin, lemon caper emulsion, wild rice pilaf, and roasted seasonal vegetables.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Veranda Club Sandwich</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$15.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Triple-decker toasted brioche with smoked chicken, beef bacon, avocado, organic egg, and french fries.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Mediterranean Mezze Platter</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$16.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Creamy hummus, kalamata olives, marinated feta, warm za’atar flatbread, and roasted bell peppers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeMenuTab === 'coffee' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-6 border-b border-[#3D2B1F]">
                <h3 className="font-serif text-2xl text-[#F4EFEA]">The Coffee Sanctuary</h3>
                <p className="text-xs text-[#D4AF37] font-light mt-1">
                  Single-origin washed & natural Arabica beans from Yirgacheffe, Sidama, and Harar.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Traditional Jebena Ceremony</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$12.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Full table ritual: frankincense aroma, freshly pan-roasted green beans, three brewing rounds (Awel, Bereka).
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Double Shot Sidama Espresso</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$4.50</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Velvety crema with floral jasmine notes, balanced citrus brightness, and chocolate finish.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Spiced Ethiopian Herbal Tea</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$5.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Infusion of highland black tea leaves, crushed cinnamon bark, green cardamom, and fresh ginger root.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Iced Honey Macchiato</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$6.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Cold brew concentrate shaken with local forest honey and topped with cold microfoam.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeMenuTab === 'cocktails' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-6 border-b border-[#3D2B1F]">
                <h3 className="font-serif text-2xl text-[#F4EFEA]">Sunset Cocktails & Cellar</h3>
                <p className="text-xs text-[#D4AF37] font-light mt-1">
                  Crafted by our resident mixologists overlooking the Addis Ababa gardens.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">The Gambela Sunset</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$14.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Aged dark rum, freshly squeezed passionfruit, lime juice, Campari, and aromatic Angostura bitters.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Artisanal Honey Sparkler</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$15.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Tej honey wine reduction, London dry gin, fresh lemon, and topped with sparkling prosecco.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Smoked Cardamom Old Fashioned</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$16.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Bourbon whiskey infused with roasted Ethiopian black cardamom, raw cane syrup, and orange peel oils.
                  </p>
                </div>

                <div className="border-b border-[#3D2B1F]/60 pb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-serif text-base text-[#F4EFEA]">Sommelier Reserve Wine by Glass</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">$13.00</span>
                  </div>
                  <p className="text-xs text-[#F4EFEA]/60 font-light">
                    Curated rotation of South African Stellenbosch Pinotage, French Bordeaux, and crisp Marlborough Sauvignon Blanc.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Table Reservation Inquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#2A1E17] via-[#1C1410] to-[#12100E] border-2 border-[#3D2B1F] rounded-xl p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
              Private Dining & Veranda Seating
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F4EFEA]">
              Reserve a Table or Private Banquet
            </h3>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-3 mx-auto" />
            <p className="text-xs text-[#F4EFEA]/70 font-light">
              Guarantee preferred veranda seating or book a secluded dining alcove for your party in Addis Ababa.
            </p>
          </div>

          <form onSubmit={handleReservationSubmit} className="space-y-4 max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Haile Selassie"
                  className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                  Dining Time
                </label>
                <select
                  value={guestTime}
                  onChange={(e) => setGuestTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="18:30">06:30 PM (Sunset Dinner)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Late Dinner)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                  Guests Count
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8+ Private Delegation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                  Preferred Venue Area
                </label>
                <select className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]">
                  <option>Veranda Garden Terrace (Outdoor)</option>
                  <option>Main Dining Room</option>
                  <option>Sunset Cocktail Lounge</option>
                  <option>Private VIP Salon</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 font-serif text-xs uppercase tracking-[0.2em] font-semibold text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] rounded-sm transition-all shadow-lg mt-3"
            >
              Confirm Table Request
            </button>

            {reserved && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-sm text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Table request confirmed for {guestName} at {guestTime}. Our reception will welcome you.</span>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={diningGallery}
        currentIndex={activeImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setActiveImageIndex(idx)}
      />
    </main>
  );
}
