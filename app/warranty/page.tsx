'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartProvider';
import { ShieldCheck } from 'lucide-react';

interface WarrantySection {
  id: string;
  section_key: string;
  title: string;
  content: string;
  display_order: number;
}

export default function WarrantyPage() {
  const { cartCount, openCart } = useCart();
  const [sections, setSections] = useState<WarrantySection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      const { data, error } = await supabase
        .from('warranty_content')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error) setSections(data || []);
      setLoading(false);
    };
    fetchSections();
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="bg-brand-dark py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck size={48} className="text-brand-green mx-auto mb-4" />
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            Warranty <span className="text-brand-green">Policy</span>
          </h1>
         <p className="text-gray-400 text-lg">
  Shop with confidence  here&apos;s how we protect your purchase.
</p>
        </div>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 py-12 md:py-16">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-xl h-24 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="bg-brand-card border border-brand-border rounded-xl p-6">
                <h2 className="text-white font-syne font-bold text-xl mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}