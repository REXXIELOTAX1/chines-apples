'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartProvider';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface Faq {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

export default function FaqPage() {
  const { cartCount, openCart } = useCart();
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error) setFaqs(data || []);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="bg-brand-dark py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle size={48} className="text-brand-green mx-auto mb-4" />
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-brand-green">Questions</span>
          </h1>
        </div>
      </div>

      <div className="flex-grow max-w-4xl mx-auto w-full px-4 py-12 md:py-16">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-xl h-16 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="bg-brand-card border border-brand-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-semibold">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={isOpen ? 'text-brand-green rotate-180 transition-transform' : 'text-gray-500 transition-transform'}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}