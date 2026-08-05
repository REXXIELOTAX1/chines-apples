'use client';

import { useState, useEffect } from 'react';
import { supabase, Product } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ImagePreviewModal from '@/components/ImagePreviewModal';

export default function NetworkingPage() {
  const { items, addToCart, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'Networking')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="bg-brand-dark py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-green/10 text-brand-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            INTERNET & WIFI
          </span>
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            Networking <span className="text-brand-green">Devices</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Starlink, WiFi routers, MiFi and more at the best prices in Enugu.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 md:py-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                onPreview={() => setPreviewProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No networking devices available at the moment.</p>
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

      {previewProduct && (
  <ImagePreviewModal
    images={
      previewProduct.image_urls && previewProduct.image_urls.length > 0
        ? previewProduct.image_urls
        : [previewProduct.image_url]
    }
    productName={previewProduct.name}
    onClose={() => setPreviewProduct(null)}
  />

  
)}
    </div>
  );
}