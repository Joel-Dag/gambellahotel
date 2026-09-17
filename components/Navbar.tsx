'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Calendar, Compass } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'Accommodations', href: '/rooms' },
    { name: 'Dining & Lounge', href: '/dining' },
    { name: 'Reservations', href: '/booking' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1C1410]/95 backdrop-blur-md border-b border-[#3D2B1F] py-3.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#12100E]/90 via-[#1C1410]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Ethiopian Artisanal Identity */}
          <Link
            href="/"
            id="nav-logo"
            className="group flex flex-col items-start focus:outline-none"
          >
            <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#F4EFEA] uppercase group-hover:text-[#D4AF37] transition-colors">
              Gambela Hotel
            </span>
            <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase -mt-0.5">
              Addis Ababa • Ethiopia
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={link.href}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#D4AF37]'
                      : 'text-[#F4EFEA]/80 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-5">
            <a
              href="tel:+251116610000"
              id="nav-phone-contact"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#F4EFEA]/80 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+251 11 661 0000</span>
            </a>

            <Link
              href="/booking"
              id="nav-reserve-btn"
              className="inline-flex items-center justify-center px-6 py-2.5 font-serif text-xs tracking-[0.2em] uppercase text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/50 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(200,138,53,0.3)] transition-all duration-300 rounded-sm"
            >
              <Calendar className="w-3.5 h-3.5 mr-2 text-[#D4AF37]" />
              Reserve Suite
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/booking"
              id="mobile-nav-book-btn"
              className="px-3.5 py-1.5 rounded-sm bg-[#3D2B1F] border border-[#C88A35]/50 text-[#F4EFEA] text-[11px] uppercase tracking-wider font-serif"
            >
              Book
            </Link>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F4EFEA] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#1C1410]/98 backdrop-blur-xl border-b border-[#3D2B1F] px-6 py-6 space-y-4 shadow-2xl transition-all"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  id={`mobile-link-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] py-2 border-b border-[#3D2B1F]/60 ${
                    isActive ? 'text-[#D4AF37] font-semibold' : 'text-[#F4EFEA]/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 flex flex-col gap-3">
              <a
                href="tel:+251116610000"
                className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#F4EFEA]/70 py-1"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+251 11 661 0000</span>
              </a>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#F4EFEA]/70 py-1">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 text-center font-serif text-xs tracking-[0.25em] uppercase text-[#F4EFEA] bg-gradient-to-b from-[#3D2B1F] to-[#1C1410] border border-[#C88A35]/60 hover:border-[#D4AF37] rounded-sm mt-2 shadow-lg"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
