'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartProvider';
import { Award, Users, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  const { cartCount, openCart } = useCart();

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="bg-brand-dark py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="text-brand-green">Chine Apples</span>
          </h1>
          <p className="text-gray-400 text-lg">
  Enugu&apos;s trusted gadget store since day one.
</p>
        </div>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 py-12 md:py-16">
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-white font-syne font-bold text-2xl mb-4">Our Story</h2>
          <p className="text-gray-400 leading-relaxed">
            Chine Apples Communication started with one goal: making genuine, quality
            gadgets accessible and affordable for everyone in Enugu. From iPhones to
            Samsung devices, AirPods and accessories, we've built our reputation on trust,
            authenticity, and honest prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 text-center">
            <ShieldCheck size={32} className="text-brand-green mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-1">100% Genuine</h3>
            <p className="text-gray-500 text-sm">Every product verified authentic</p>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 text-center">
            <Users size={32} className="text-brand-green mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-1">3K+ Customers</h3>
            <p className="text-gray-500 text-sm">Trusted across Enugu</p>
          </div>
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 text-center">
            <Award size={32} className="text-brand-green mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-1">Best Prices</h3>
            <p className="text-gray-500 text-sm">Unbeatable value, always</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}