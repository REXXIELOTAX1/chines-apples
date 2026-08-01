'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { supabase, Product, CATEGORIES } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export default function ProductsPage() {
  const { items, addToCart, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-brand-dark py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-syne text-3xl md:text-4xl font-bold text-white">
              All <span className="text-brand-green">Products</span>
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Filter Tabs */}
          <div className="mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-min">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-brand-green text-black font-bold'
                      : 'bg-brand-card text-gray-400 hover:text-white border border-brand-border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-brand-card border border-brand-border rounded-lg px-4 py-2.5 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
              />
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-brand-card rounded-xl h-72 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <p className="text-gray-400 text-lg">No products found</p>
            </div>
          )}
        </div>
      </main>

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