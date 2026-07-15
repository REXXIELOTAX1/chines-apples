'use client';

import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { supabase, Product } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export default function DealsPage() {
  const { items, addToCart, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_discounted', true)
        .order('created_at', { ascending: false });
      if (!error) setProducts(data || []);
      setLoading(false);
    };
    fetchDeals();
  }, []);

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <main className="bg-brand-black min-h-screen">
        <section className="py-12 md:py-16 px-4 md:px-8 border-b border-brand-border">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Flame className="w-8 h-8 text-red-500 animate-pulse" />
              <h1 className="font-syne font-bold text-3xl md:text-4xl text-white">
                Hot Deals
              </h1>
            </div>
            <p className="text-gray-400 text-sm md:text-base">
              Discounted devices limited time only!
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="animate-pulse bg-brand-card rounded-xl h-64 md:h-72" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Flame className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No deals right now check back soon!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  );
}
