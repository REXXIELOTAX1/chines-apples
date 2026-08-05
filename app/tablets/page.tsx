'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase, Product } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ImagePreviewModal from '@/components/ImagePreviewModal';

export default function TabletsPage() {
  const { items, addToCart, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'Tablets')
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

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isKids = (p: Product) => /kid/i.test(p.name);
  const isIpad = (p: Product) => /ipad/i.test(p.name) && !isKids(p);
  const isSamsung = (p: Product) => /samsung|galaxy tab/i.test(p.name) && !isKids(p);
  const isOther = (p: Product) => !isIpad(p) && !isSamsung(p) && !isKids(p);

  const sections = [
    { title: 'iPads', items: filtered.filter(isIpad) },
    { title: 'Samsung Tablets', items: filtered.filter(isSamsung) },
    { title: 'Other Tablets', items: filtered.filter(isOther) },
    { title: 'Kids Tablets', items: filtered.filter(isKids) },
  ];

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="bg-brand-dark py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-brand-green/10 text-brand-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            TABLETS
          </span>
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
            iPads & <span className="text-brand-green">Tablets</span>
          </h1>
          <p className="text-gray-400 text-lg">
            iPads, Samsung tablets, kids tabs and more at the best prices in Enugu.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 md:py-16">
        <div className="relative mb-10 max-w-md mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tablets..."
            className="w-full bg-brand-card border border-brand-border rounded-full pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-brand-card rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-12">
            {sections.map((section) =>
              section.items.length > 0 ? (
                <div key={section.title}>
                  <h2 className="font-syne text-xl md:text-2xl font-bold text-white mb-5">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {section.items.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => addToCart(product)}
                        onPreview={() => setPreviewProduct(product)}
                      />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No matching tablets found.</p>
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