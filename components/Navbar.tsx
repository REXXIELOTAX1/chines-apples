'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, ShoppingCart, Menu, X,Instagram } from 'lucide-react';
function TikTokIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'iPhones', href: '/iphones' },
    { label: 'Samsung', href: '/samsung' },
    { label: 'Airpods', href: '/airpods' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
        {/* Logo and Brand Name */}
<div className="flex items-center gap-2.5 md:gap-3">
  <Link href="/" className="flex items-center gap-2.5 md:gap-3">
    <div className="transition-transform duration-500 hover:rotate-360 flex-shrink-0">
      <img
        src="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0"
        alt="Chine Apples Communication Logo"
        width={44}
        height={44}
        className="md:w-[55px] md:h-[55px] drop-shadow-[0_0_8px_rgba(0,230,118,0.5)]"
      />
    </div>
  <div className="block min-w-0">
  <p className="text-[7px] xs:text-[9px] sm:text-xs font-syne font-semibold text-white tracking-wide leading-tight whitespace-nowrap">
    CHINE APPLES
  </p>
  <p className="text-[7px] xs:text-[9px] sm:text-xs font-syne font-semibold text-brand-green tracking-wide leading-tight whitespace-nowrap">
    COMMUNICATION
  </p>
</div>
  </Link>

{/* Social Icons */}
<div className="flex items-center gap-2 ml-1">
    <a
      href="https://instagram.com/chineapples"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-7 h-7 rounded-full bg-white/5 border border-brand-green/30 flex items-center justify-center text-brand-green hover:bg-brand-green/10 hover:border-brand-green transition-colors"
    >
      <Instagram size={14} />
    </a>
    <a
      href="https://www.tiktok.com/@chine_apples.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
      className="w-7 h-7 rounded-full bg-white/5 border border-brand-green/30 flex items-center justify-center text-brand-green hover:bg-brand-green/10 hover:border-brand-green transition-colors"
    >
      <TikTokIcon size={14} />
    </a>
  </div>
</div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-green'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
              {/* Phone Number - Desktop only */}
              <a
                href="tel:08109377558"
                className="hidden lg:flex items-center gap-2 text-gray-400 hover:text-brand-green transition-colors"
              >
                <Phone size={16} className="text-brand-green" />
                <span className="text-sm">08109377558</span>
              </a>

              {/* Cart Icon */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-400 hover:text-brand-green transition-colors duration-200"
                aria-label="Open cart"
              >
                <ShoppingCart size={22} className="md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 bg-brand-green text-brand-black text-[10px] md:text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-brand-green transition-colors duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Green Underline */}
        <div className="h-[2px] bg-brand-green" />

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-dark/95 backdrop-blur-md border-t border-brand-border">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-green bg-brand-green/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Phone Number */}
              <a
                href="tel:08109377558"
                className="flex items-center gap-2 text-brand-green px-3 py-3 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={16} />
                <span>08109377558</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}