'use client';

import Link from 'next/link';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t-2 border-[#00e676]">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Store Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <img
                src="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0"
                alt="Chine Apples Communication Logo"
                width={40}
                height={40}
                className="drop-shadow-[0_0_8px_rgba(0,230,118,0.6)]"
              />
            </div>
            <h3 className="text-white font-syne font-bold text-lg mb-3">
              CHINE APPLES COMMUNICATION
            </h3>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Your No.1 Gadget Store in Enugu. Genuine products, unbeatable prices.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-white font-syne font-bold text-lg mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/iphones"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  iPhones
                </Link>
              </li>
              <li>
                <Link
                  href="/samsung"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  Samsung
                </Link>
              </li>
              <li>
                <Link
                  href="/airpods"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  Airpods
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-syne font-bold text-lg mb-6">
              Contact Us
            </h4>
            <div className="space-y-4 w-full">
              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={20} className="text-[#00e676]" />
                <a
                  href="tel:08109377558"
                  className="text-gray-400 hover:text-[#00e676] transition-colors"
                >
                  08109377558
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={20} className="text-[#00e676]" />
                <span className="text-gray-400">Enugu, Nigeria</span>
              </div>

              {/* WhatsApp Button */}
              <div className="flex justify-center md:justify-start mt-6">
                <a
                  href="https://wa.me/2348109377558?text=Hi%2C%20I'm%20interested%20in%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#00e676] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#00cc5c] transition-colors"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-black/50 border-t border-[#00e676]/20">
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Chine Apples Communication. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
