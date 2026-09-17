'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="site-footer" className="bg-[#12100E] text-[#F4EFEA] border-t border-[#3D2B1F]">
      {/* Top Banner with Trust Badges */}
      <div className="border-b border-[#3D2B1F] bg-[#1C1410]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-sm bg-[#12100E] border border-[#C88A35]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif tracking-widest text-[#F4EFEA] uppercase">Artisanal Hospitality</h4>
              <p className="text-xs text-[#F4EFEA]/60">Earthy luxury and handcrafted Ethiopian woodwork in Addis Ababa</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-sm bg-[#12100E] border border-[#C88A35]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif tracking-widest text-[#F4EFEA] uppercase">24/7 Guest Reception</h4>
              <p className="text-xs text-[#F4EFEA]/60">Attentive service, private airport transfers, and bespoke stays</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-sm bg-[#12100E] border border-[#C88A35]/40 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-serif tracking-widest text-[#F4EFEA] uppercase">Executive Security</h4>
              <p className="text-xs text-[#F4EFEA]/60">Enclosed private grounds built for diplomatic and international visitors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] text-[#F4EFEA] uppercase block">
                Gambela Hotel
              </span>
              <span className="text-[11px] tracking-[0.35em] text-[#D4AF37] uppercase block mt-1">
                Addis Ababa • Ethiopia
              </span>
            </div>
            <p className="text-sm text-[#F4EFEA]/70 leading-relaxed max-w-md font-light">
              Located in the diplomatic capital of Addis Ababa, Gambela Hotel delivers an earthy sanctuary rooted in Ethiopian cultural woodwork, refined comfort, and authentic warmth for international travelers and leaders.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium mb-2">
                Stay In Touch & Updates
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  id="footer-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-2.5 bg-[#1C1410] border border-[#3D2B1F] text-xs text-[#F4EFEA] placeholder:text-[#F4EFEA]/40 focus:outline-none focus:border-[#D4AF37] rounded-l-sm"
                />
                <button
                  id="footer-newsletter-submit"
                  type="submit"
                  className="px-5 font-serif text-xs uppercase tracking-wider text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] shrink-0 rounded-r-sm transition-all flex items-center gap-1.5"
                >
                  <span>Submit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you. Your inquiry has been received.</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold">
              The Hotel
            </h5>
            <ul className="space-y-2.5 text-xs text-[#F4EFEA]/70 uppercase tracking-widest font-light">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Overview & Craft
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-[#D4AF37] transition-colors">
                  Suites & Residences
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-[#D4AF37] transition-colors">
                  Veranda Cafe & Bar
                </Link>
              </li>
              <li>
                <Link href="/dining#culinary" className="hover:text-[#D4AF37] transition-colors">
                  Gastronomy
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#D4AF37] transition-colors">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Hotel Services */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold">
              Guest Services
            </h5>
            <ul className="space-y-2.5 text-xs text-[#F4EFEA]/70 uppercase tracking-widest font-light">
              <li>Bole Airport Chauffeur</li>
              <li>Traditional Coffee Ceremonies</li>
              <li>Executive Meeting Salons</li>
              <li>Garden Terrace Dining</li>
              <li>24/7 Room Service</li>
              <li>Secure On-Site Parking</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold">
              Front Desk & Inquiries
            </h5>
            <div className="space-y-3 text-xs text-[#F4EFEA]/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Bole Sub-City, Near Africa Avenue, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+251116610000" className="hover:text-[#D4AF37] transition-colors">
                  +251 11 661 0000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:reservations@gambelahotel.com" className="hover:text-[#D4AF37] transition-colors">
                  reservations@gambelahotel.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#3D2B1F] flex flex-col md:flex-row items-center justify-between text-xs text-[#F4EFEA]/50 gap-4">
          <p>© {new Date().getFullYear()} Gambela Hotel. All rights reserved.</p>
          <div className="flex items-center space-x-6 uppercase tracking-widest text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Stay</span>
            <span>Guest Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
