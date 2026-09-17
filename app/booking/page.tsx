'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Bed, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Printer 
} from 'lucide-react';

interface RoomOption {
  id: string;
  name: string;
  pricePerNight: number;
  image: string;
  category: string;
  maxGuests: number;
  bedType: string;
  sqm: string;
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    id: 'presidential-suite',
    name: 'The Presidential Baro Suite',
    pricePerNight: 280,
    image: '/hotel_photos/Bedroom1.webp',
    category: 'Presidential Category',
    maxGuests: 3,
    bedType: 'Imperial King',
    sqm: '88 m²',
  },
  {
    id: 'executive-residence',
    name: 'Executive Diplomatic Residence',
    pricePerNight: 220,
    image: '/hotel_photos/Livingroom1.jpeg',
    category: 'Executive Suite',
    maxGuests: 3,
    bedType: 'California King',
    sqm: '65 m²',
  },
  {
    id: 'ambassador-suite',
    name: 'Ambassador Garden Chamber',
    pricePerNight: 190,
    image: '/hotel_photos/Bedroom2.webp',
    category: 'Executive Suite',
    maxGuests: 2,
    bedType: 'Handcrafted King',
    sqm: '58 m²',
  },
  {
    id: 'deluxe-oasis-room',
    name: 'Deluxe Courtyard Chamber',
    pricePerNight: 160,
    image: '/hotel_photos/Bedroom3.webp',
    category: 'Deluxe Room',
    maxGuests: 2,
    bedType: 'Queen Deluxe',
    sqm: '48 m²',
  },
  {
    id: 'residence-parlor-suite',
    name: 'The Grand Residence Salon & Suite',
    pricePerNight: 250,
    image: '/hotel_photos/Livingroom2.jpeg',
    category: 'Private Residence',
    maxGuests: 4,
    bedType: 'King Bed + Salon',
    sqm: '75 m²',
  },
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
  perDay: boolean;
}

const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'airport-transfer',
    name: 'Bole Airport Chauffeur (Roundtrip)',
    price: 60,
    description: 'Direct pickup at Bole International Airport (Addis Ababa) with secure executive vehicle.',
    perDay: false,
  },
  {
    id: 'breakfast-coffee',
    name: 'In-Suite Breakfast & Jebena Coffee Ritual',
    price: 25,
    description: 'Fresh pastries, tropical fruit, organic eggs, and traditional clay-pot coffee in Addis Ababa.',
    perDay: true,
  },
  {
    id: 'city-tour',
    name: 'Addis Ababa Cultural & Heritage Tour',
    price: 85,
    description: 'Private 3-hour chartered tour exploring Addis Ababa museums, Entoto panorama, and cultural landmarks.',
    perDay: false,
  },
  {
    id: 'welcome-champagne',
    name: 'Reserve Wine & Tropical Fruit Platter',
    price: 45,
    description: 'Chilled bottle of select wine and fresh exotic fruits waiting in your suite.',
    perDay: false,
  },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const initialRoomName = searchParams.get('room');

  // Find pre-selected room from URL if available
  const defaultRoom = useMemo(() => {
    if (initialRoomName) {
      const match = ROOM_OPTIONS.find(
        (r) => r.name.toLowerCase() === initialRoomName.toLowerCase()
      );
      if (match) return match.id;
    }
    return ROOM_OPTIONS[0].id;
  }, [initialRoomName]);

  // Form State
  const [selectedRoomId, setSelectedRoomId] = useState<string>(defaultRoom);
  const [checkInDate, setCheckInDate] = useState<string>('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-10-18');
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['airport-transfer']);

  // Guest Details
  const [salutation, setSalutation] = useState('His Excellency');
  const [guestName, setGuestName] = useState('H.E. Ambassador Samuel K.');
  const [guestEmail, setGuestEmail] = useState('samuel.k@diplomat.gov');
  const [guestPhone, setGuestPhone] = useState('+251 11 661 0000');
  const [specialRequests, setSpecialRequests] = useState('Late check-in anticipated due to ministerial schedule. Quiet garden-facing suite preferred in Addis Ababa.');

  // Confirmation Modal State
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  // Selected Room Object
  const currentRoom = useMemo(
    () => ROOM_OPTIONS.find((r) => r.id === selectedRoomId) || ROOM_OPTIONS[0],
    [selectedRoomId]
  );

  // Nights calculation
  const nights = useMemo(() => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkInDate, checkOutDate]);

  // Cost calculation
  const calculations = useMemo(() => {
    const baseRoomTotal = currentRoom.pricePerNight * nights;
    
    let addonsTotal = 0;
    selectedAddons.forEach((addonId) => {
      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
      if (addon) {
        addonsTotal += addon.perDay ? addon.price * nights : addon.price;
      }
    });

    const subtotal = baseRoomTotal + addonsTotal;
    const taxes = Math.round(subtotal * 0.15); // 15% VAT & hospitality levy
    const grandTotal = subtotal + taxes;

    return {
      baseRoomTotal,
      addonsTotal,
      subtotal,
      taxes,
      grandTotal,
    };
  }, [currentRoom, nights, selectedAddons]);

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `GH-AA-${Math.floor(10000 + Math.random() * 90000)}`;
    setReservationCode(randomCode);
    setIsConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1410] border border-[#C88A35]/40 mb-4 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            Direct Reservations
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFEA] via-[#D4AF37] to-[#C88A35] tracking-tight leading-tight mb-4">
          Reserve Your Suite
        </h1>
        <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4" />
        <p className="text-sm sm:text-base text-[#F4EFEA]/80 font-light leading-relaxed">
          Experience seamless reservations with transparent pricing, instant confirmation, executive priority handling, and zero hidden transaction fees for your stay in Addis Ababa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form: Booking Controls & Guest Data (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            {/* Step 1: Stay Dates & Guests */}
            <div className="bg-[#1C1410] border-2 border-[#3D2B1F] rounded-xl p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2 mb-6 border-b border-[#3D2B1F] pb-4">
                <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-xl text-[#F4EFEA]">
                  1. Residency Schedule & Party
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-mono">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-sm text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-mono">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-sm text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-mono">
                    Adult Guests (Age 13+)
                  </label>
                  <select
                    value={adultsCount}
                    onChange={(e) => setAdultsCount(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-sm text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37] font-mono"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-mono">
                    Children / Entourage
                  </label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-sm text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37] font-mono"
                  >
                    <option value={0}>No Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                    <option value={3}>3+ Children</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3D2B1F] flex items-center justify-between text-xs text-[#D4AF37] font-mono">
                <span>Duration of Stay:</span>
                <span className="font-semibold text-[#F4EFEA]">{nights} Night{nights > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Step 2: Choose Accommodations */}
            <div className="bg-[#1C1410] border-2 border-[#3D2B1F] rounded-xl p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2 mb-6 border-b border-[#3D2B1F] pb-4">
                <Bed className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-xl text-[#F4EFEA]">
                  2. Select Desired Suite
                </h3>
              </div>

              <div className="space-y-3">
                {ROOM_OPTIONS.map((room) => (
                  <label
                    key={room.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedRoomId === room.id
                        ? 'bg-[#2A1E17] border-[#D4AF37] shadow-md'
                        : 'bg-[#12100E] border-[#3D2B1F] hover:border-[#C88A35]/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="selectedRoom"
                        checked={selectedRoomId === room.id}
                        onChange={() => setSelectedRoomId(room.id)}
                        className="w-4 h-4 text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37]"
                      />
                      <div className="relative w-14 h-14 rounded overflow-hidden shrink-0 border border-[#3D2B1F]">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                          sizes="60px"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-serif text-[#F4EFEA] font-medium">
                          {room.name}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] text-[#F4EFEA]/60 font-mono mt-0.5">
                          <span>{room.sqm}</span>
                          <span>•</span>
                          <span>{room.bedType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-serif text-[#D4AF37] font-semibold">
                        ${room.pricePerNight}
                      </span>
                      <span className="text-[10px] text-[#F4EFEA]/40 block font-mono">/ night</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Bespoke VIP Add-Ons */}
            <div className="bg-[#1C1410] border-2 border-[#3D2B1F] rounded-xl p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2 mb-6 border-b border-[#3D2B1F] pb-4">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-xl text-[#F4EFEA]">
                  3. Guest Services & Add-Ons
                </h3>
              </div>

              <div className="space-y-3">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#2A1E17] border-[#D4AF37]'
                          : 'bg-[#12100E] border-[#3D2B1F] hover:border-[#C88A35]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                          className="w-4 h-4 mt-1 text-[#D4AF37] focus:ring-[#D4AF37] rounded accent-[#D4AF37]"
                        />
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-[#F4EFEA] font-semibold">
                            {addon.name}
                          </h4>
                          <p className="text-xs text-[#F4EFEA]/60 font-light mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4 font-mono text-xs text-[#D4AF37] font-semibold">
                        +${addon.price}
                        {addon.perDay && (
                          <span className="text-[10px] text-[#F4EFEA]/40 block">
                            / day (${addon.price * nights})
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Lead Guest & Contact */}
            <div className="bg-[#1C1410] border-2 border-[#3D2B1F] rounded-xl p-6 sm:p-8 shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2 mb-6 border-b border-[#3D2B1F] pb-4">
                <Users className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-xl text-[#F4EFEA]">
                  4. Lead Guest & Contact Details
                </h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                      Salutation
                    </label>
                    <select
                      value={salutation}
                      onChange={(e) => setSalutation(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>His Excellency</option>
                      <option>Her Excellency</option>
                      <option>Honorable</option>
                      <option>Ambassador</option>
                      <option>Dr.</option>
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                      Official Email
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                    Special Requests & Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Dietary requirements, late arrival notice, extra security requests..."
                    className="w-full px-3.5 py-2.5 bg-[#12100E] border border-[#3D2B1F] rounded-sm text-xs text-[#F4EFEA] focus:outline-none focus:border-[#D4AF37] font-light"
                  />
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <button
              id="submit-reservation-btn"
              type="submit"
              className="w-full py-4 font-serif text-xs uppercase tracking-[0.25em] font-semibold text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all duration-300 rounded-sm shadow-2xl flex items-center justify-center gap-3 hover:scale-[1.01]"
            >
              <span>Confirm & Generate Reservation Voucher</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>
        </div>

        {/* Right Sticky Column: Real-Time Price Estimation Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <div className="bg-[#1C1410] border-2 border-[#3D2B1F] rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
              {/* Selected Suite Preview Header */}
              <div className="relative h-48 w-full">
                <Image
                  src={currentRoom.image}
                  alt={currentRoom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-black/40 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded-sm bg-[#12100E]/80 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono border border-[#3D2B1F]">
                  {currentRoom.category}
                </span>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-lg text-[#F4EFEA] font-medium">
                    {currentRoom.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-mono">
                    {currentRoom.sqm} • {currentRoom.bedType}
                  </p>
                </div>
              </div>

              {/* Estimate Breakdown */}
              <div className="p-6 space-y-5">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold border-b border-[#3D2B1F] pb-3 font-serif">
                  Live Price Estimation
                </h4>

                <div className="space-y-3 text-xs text-[#F4EFEA]/80">
                  <div className="flex justify-between">
                    <span className="text-[#F4EFEA]/60">
                      Suite Rate (${currentRoom.pricePerNight} × {nights} nights)
                    </span>
                    <span className="font-mono text-[#F4EFEA]">
                      ${calculations.baseRoomTotal}
                    </span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#3D2B1F]">
                      <div className="text-[11px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                        Service Inclusions:
                      </div>
                      {selectedAddons.map((id) => {
                        const addon = ADDON_OPTIONS.find((a) => a.id === id);
                        if (!addon) return null;
                        const cost = addon.perDay ? addon.price * nights : addon.price;
                        return (
                          <div key={id} className="flex justify-between text-[#F4EFEA]/60 text-[11px]">
                            <span className="truncate pr-2">• {addon.name}</span>
                            <span className="font-mono text-[#D4AF37] shrink-0">+${cost}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-[#3D2B1F]">
                    <span className="text-[#F4EFEA]/60">Services Subtotal</span>
                    <span className="font-mono text-[#F4EFEA]">${calculations.subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#F4EFEA]/60">VAT & Hospitality Levy (15%)</span>
                    <span className="font-mono text-[#F4EFEA]">${calculations.taxes}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-[#3D2B1F] flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#F4EFEA] block font-serif">
                      Estimated Grand Total
                    </span>
                    <span className="text-[10px] text-[#F4EFEA]/50">
                      All fees included • Pay upon arrival
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold text-[#D4AF37]">
                      ${calculations.grandTotal}
                    </span>
                    <span className="text-xs text-[#F4EFEA]/50 block font-mono">USD</span>
                  </div>
                </div>

                {/* Trust & Guarantee */}
                <div className="bg-[#12100E] p-3.5 rounded-lg border border-[#3D2B1F] space-y-2 text-[11px] text-[#F4EFEA]/70 shadow-inner">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Executive Grade Guarantee</span>
                  </div>
                  <p className="font-light leading-relaxed">
                    • Free cancellation up to 48 hours prior to arrival. <br />
                    • Complimentary private parking and luggage vault. <br />
                    • 24/7 reception line available upon booking confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Receipt Modal */}
      {isConfirmed && (
        <div
          id="reservation-confirmation-modal"
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-[#1C1410] border-2 border-[#D4AF37] rounded-xl max-w-xl w-full p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] relative animate-fade-in text-[#F4EFEA]">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#12100E] border border-[#C88A35]/50 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-3 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
                Booking Confirmed
              </span>
              <h3 className="font-serif text-2xl text-[#F4EFEA] mt-1">
                Gambela Hotel Residency Voucher
              </h3>
              <p className="text-xs text-[#F4EFEA]/60 mt-1">
                Your reservation voucher has been logged in our Addis Ababa guest register.
              </p>
            </div>

            <div className="bg-[#12100E] border border-[#3D2B1F] rounded-lg p-5 mb-6 space-y-3 font-mono text-xs shadow-inner">
              <div className="flex justify-between border-b border-[#3D2B1F] pb-2">
                <span className="text-[#F4EFEA]/50">Voucher Reference:</span>
                <span className="text-[#D4AF37] font-bold">{reservationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFEA]/50">Primary Guest:</span>
                <span className="text-[#F4EFEA]">{salutation} {guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFEA]/50">Reserved Suite:</span>
                <span className="text-[#F4EFEA]">{currentRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFEA]/50">Schedule:</span>
                <span className="text-[#F4EFEA]">{checkInDate} to {checkOutDate} ({nights} nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4EFEA]/50">Party Size:</span>
                <span className="text-[#F4EFEA]">{adultsCount} Adults, {childrenCount} Children</span>
              </div>
              <div className="flex justify-between border-t border-[#3D2B1F] pt-2 text-sm font-bold">
                <span className="text-[#F4EFEA]/70">Total Payable:</span>
                <span className="text-[#D4AF37]">${calculations.grandTotal} USD</span>
              </div>
            </div>

            <div className="text-[11px] text-[#F4EFEA]/70 font-light space-y-2 mb-6">
              <p>• A confirmation dispatch has been sent to <strong className="text-[#F4EFEA]">{guestEmail}</strong>.</p>
              <p>• Our front desk & reservations team in Addis Ababa will coordinate flight tracking and airport transfer.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#12100E] hover:bg-[#2A1E17] text-[#F4EFEA] border border-[#3D2B1F] text-xs uppercase tracking-wider rounded-sm font-serif flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print Voucher</span>
              </button>
              <Link
                href="/"
                onClick={() => setIsConfirmed(false)}
                className="flex-1 py-2.5 font-serif text-xs uppercase tracking-wider text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] rounded-sm font-semibold text-center flex items-center justify-center"
              >
                Return to Overview
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <main id="booking-page" className="min-h-screen bg-[#12100E] text-[#F4EFEA] pt-24 pb-20">
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-[#D4AF37] text-xs tracking-widest uppercase font-mono">
          Loading Reservation System...
        </div>
      }>
        <BookingForm />
      </Suspense>
    </main>
  );
}
