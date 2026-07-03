'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Instagram } from 'lucide-react';

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

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/chineapples', icon: Instagram },
  { name: 'TikTok', href: 'https://tiktok.com/@chineapples', icon: TikTokIcon },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'iPhones', href: '/iphones' },
  { label: 'Samsung', href: '/samsung' },
  { label: 'Airpods', href: '/airpods' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t-2 border-[#00e676]">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <img
              src="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0"
              alt="Chine Apples Communication Logo"
              className="w-10 h-10 mb-4 drop-shadow-[0_0_8px_rgba(0,230,118,0.6)]"
            />
            <h3 className="text-white font-syne font-bold text-base sm:text-lg mb-2">
              CHINE APPLES COMMUNICATION
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your No.1 Gadget Store in Enugu. Genuine products, unbeatable prices.
            </p>

            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full bg-white/5 border border-[#00e676]/30 flex items-center justify-center text-[#00e676] hover:bg-[#00e676]/10 hover:border-[#00e676] transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-syne font-bold text-base sm:text-lg mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#00e676] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-syne font-bold text-base sm:text-lg mb-5">
              Contact Us
            </h4>
            <div className="space-y-3.5 w-full text-sm">
              <a
                href="tel:08109377558"
                className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-[#00e676] transition-colors"
              >
                <Phone size={17} className="text-[#00e676] shrink-0" />
                08109377558
              </a>
              <a
                href="mailto:officialchineapples@gmail.com"
                className="flex items-center justify-center sm:justify-start gap-3 text-gray-400 hover:text-[#00e676] transition-colors break-all"
              >
                <Mail size={17} className="text-[#00e676] shrink-0" />
                officialchineapples@gmail.com
              </a>
              <div className="flex items-start justify-center sm:justify-start gap-3 text-gray-400">
                <MapPin size={17} className="text-[#00e676] shrink-0 mt-0.5" />
                <span>No. 9 Chime Avenue, New Haven, Enugu (beside Open Sheraton Restaurant)</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-syne font-bold text-base sm:text-lg mb-5">
              Order Fast
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              For fast response, chat with us directly on WhatsApp.
            </p>
            <a
              href="https://wa.me/2348109377558?text=Hi%2C%20I'm%20interested%20in%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#00e676] text-black font-semibold px-4 py-2.5 rounded-lg hover:bg-[#00cc5c] transition-colors text-sm"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black/50 border-t border-[#00e676]/20">
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            © 2026 Chine Apples Communication. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}