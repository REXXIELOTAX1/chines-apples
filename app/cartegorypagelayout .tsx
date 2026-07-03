'use client';

import { Product } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

interface CategoryPageLayoutProps {
  eyebrow: string;
  titleWhite: string;
  titleGreen: string;
  titleOrder?: 'white-first' | 'green-first';
  description: string;
  products: Product[];
  loading: boolean;
  emptyMessage: string;
}

export default function CategoryPageLayout({
  eyebrow,
  titleWhite,
  titleGreen,
  titleOrder = 'white-first',
  description,
  products,
  loading,
  emptyMessage,
}: CategoryPageLayoutProps) {
  const {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    cartCount,
    openCart,
    closeCart,
    isCartOpen,
  } = useCart();

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="relative bg-brand-dark py-14 md:py-20 overflow-hidden border-b border-brand-border">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-green/10 border border-brand-green/30 text-brand-green text-[11px] md:text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-4">
            {eyebrow}
          </span>
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            {titleOrder === 'green-first' ? (
              <>
                <span className="text-brand-green">{titleGreen}</span> {titleWhite}
              </>
            ) : (
              <>
                {titleWhite} <span className="text-brand-green">{titleGreen}</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-brand-card border border-brand-border rounded-xl h-72 animate-pulse"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
            <p className="text-gray-400 text-lg">{emptyMessage}</p>
          </div>
        )}
      </div>

      <Footer />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}