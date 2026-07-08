'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Truck, HeadphonesIcon, Award, CheckCircle, Smartphone } from 'lucide-react';
import { supabase, Product, getWhatsAppUrl } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export default function Home() {
  const { items, addToCart, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8);
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

  const whyChooseUsCards = [
    { icon: Shield, title: 'Genuine Products', description: 'All our products are 100% authentic and come with warranty guarantees.', badge: 'Verified Authentic' },
    { icon: Truck, title: 'Fast Delivery', description: 'Quick and reliable delivery across Enugu and beyond. Get your gadgets in no time.', badge: 'Same Day Delivery' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'Our dedicated support team is always available to assist you with any queries.', badge: 'Always Available' },
    { icon: Award, title: 'Best Prices', description: 'We offer the most competitive prices in Enugu. Price match guaranteed.', badge: 'Price Match' },
  ];

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <main className="bg-brand-black">
        {/* Hero Section */}
        <section className="relative min-h-[100dvh] md:min-h-screen flex items-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-black/70 via-brand-black/85 to-brand-black" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl z-10" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl z-10" />

          <div className="relative z-20 w-full px-5 py-8 md:px-8 lg:px-12 md:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Left Column */}
                <div className={`order-2 lg:order-1 text-center lg:text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                  <div className="inline-flex items-center justify-center mb-4 md:mb-6">
                    <span className="bg-brand-green/10 border border-brand-green/30 text-brand-green text-[10px] md:text-xs font-semibold tracking-wider uppercase px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                      Enugu&apos;s No.1 Gadget Store
                    </span>
                  </div>

                  <h1 className="font-syne font-extrabold text-white mb-4 md:mb-6 text-hero leading-none">
                    <span className="block">Your Trusted</span>
                    <span className="block text-brand-green mt-1">Gadget Store</span>
                    <span className="block text-white/90 text-2xl md:text-3xl lg:text-4xl mt-3 md:mt-4 font-bold">
                      in Enugu
                    </span>
                  </h1>

                  <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                    Genuine products. Unbeatable prices. Shop the latest iPhones, Samsung devices, AirPods and more with complete confidence.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10 justify-center lg:justify-start">
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center bg-brand-green text-brand-black font-semibold text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4 rounded-xl hover:bg-brand-green-dark transition-all duration-300 shadow-lg shadow-brand-green/20 hover:shadow-brand-green/30 hover:-translate-y-0.5"
                    >
                      Shop Now
                    </Link>
                    <a
                      href={getWhatsAppUrl("Hi, I'm interested in your products from Chine Apples Communication.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white/5 border border-brand-green/40 text-brand-green font-semibold text-sm md:text-base px-6 md:px-8 py-3.5 md:py-4 rounded-xl hover:bg-brand-green/10 hover:border-brand-green transition-all duration-300 backdrop-blur-sm"
                    >
                      Order via WhatsApp
                    </a>
                  </div>

                  <div className="flex justify-center lg:justify-start gap-6 md:gap-10 pt-4 md:pt-6 border-t border-white/5">
                    <div className="text-center lg:text-left">
                      <p className="font-syne font-bold text-xl md:text-2xl text-brand-green">500+</p>
                      <p className="text-gray-500 text-xs md:text-sm mt-0.5">Products</p>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="font-syne font-bold text-xl md:text-2xl text-brand-green">2K+</p>
                      <p className="text-gray-500 text-xs md:text-sm mt-0.5">Customers</p>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="font-syne font-bold text-xl md:text-2xl text-brand-green">5 Star</p>
                      <p className="text-gray-500 text-xs md:text-sm mt-0.5">Rated</p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Video Showcase */}
                <div className={`order-1 lg:order-2 flex justify-center items-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>

              {/* Mobile */}
<div className="lg:hidden flex flex-col items-center gap-3 pt-2">
  
  {/* Floating Card - on top */}
  <div className="bg-brand-card/90 backdrop-blur-md border border-brand-green/30 rounded-2xl px-4 py-2 shadow-xl flex items-center gap-3 animate-float">
    <div className="w-8 h-8 rounded-xl bg-brand-green/10 flex items-center justify-center">
      <Smartphone size={16} className="text-brand-green" />
    </div>
    <div>
      <p className="text-white font-syne font-bold text-xs">Chine Apples</p>
      <p className="text-brand-green text-[10px]">Communication</p>
    </div>
  </div>

  {/* Videos below */}
  <div className="flex gap-2 w-full px-2">
    <div className="flex flex-col items-center gap-1 flex-1">
      <video autoPlay muted loop playsInline preload="metadata" poster="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto,w_600/1000137475_ucfue0" className="w-full h-52 object-cover rounded-2xl shadow-xl border-2 border-brand-green/50">
  <source src="https://res.cloudinary.com/dwwqf4p69/video/upload/f_auto,q_auto,w_600/c8cf8fe1cac54c10d2d4e640f8ab5412_mtxlid.mp4" type="video/mp4" />
</video>
      <p className="text-center text-white text-[9px] font-bold bg-brand-green/80 rounded-lg px-2 py-0.5 w-full">📱 iPhone 17 Pro</p>
    </div>
    <div className="flex flex-col items-center gap-1 flex-1">
     <video autoPlay muted loop playsInline preload="metadata" poster="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto,w_600/1000137475_ucfue0" className="w-full h-52 object-cover rounded-2xl shadow-xl border-2 border-brand-green/50">
  <source src="https://res.cloudinary.com/dwwqf4p69/video/upload/f_auto,q_auto,w_600/148326b8820bae6e85b7704abe40bcfb_ed7ggr.mp4" type="video/mp4" />
</video>
      <p className="text-center text-white text-[9px] font-bold bg-brand-green/80 rounded-lg px-2 py-0.5 w-full">📱 Samsung S26</p>
    </div>
  </div>

</div>
 
                  {/* Desktop */}
                  <div className="hidden lg:flex flex-col items-center gap-4 pt-4">
                    <div className="bg-brand-card/90 backdrop-blur-md border border-brand-green/30 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3 animate-float">
                      <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
                        <Smartphone size={22} className="text-brand-green" />
                      </div>
                      <div>
                        <p className="text-white font-syne font-bold text-sm">Chine Apples</p>
                        <p className="text-brand-green text-xs">Communication</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="relative animate-float" style={{ animationDelay: '0s' }}>
                       <video autoPlay muted loop playsInline preload="metadata" poster="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto,w_600/1000137475_ucfue0" className="w-56 h-[420px] object-cover rounded-3xl shadow-2xl border-2 border-brand-green/50">
                 <source src="https://res.cloudinary.com/dwwqf4p69/video/upload/f_auto,q_auto,w_600/c8cf8fe1cac54c10d2d4e640f8ab5412_mtxlid.mp4" type="video/mp4" />
                 </video>
                        <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold bg-brand-green/80 rounded-xl mx-2 p-1"> iPhone 17 Pro Max all In Stock</p>
                      </div>
                      <div className="relative animate-float" style={{ animationDelay: '0.4s' }}>
                       <video autoPlay muted loop playsInline preload="metadata" poster="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto,w_600/1000137475_ucfue0" className="w-56 h-[420px] object-cover rounded-3xl shadow-2xl border-2 border-brand-green/50">
                     <source src="https://res.cloudinary.com/dwwqf4p69/video/upload/f_auto,q_auto,w_600/148326b8820bae6e85b7704abe40bcfb_ed7ggr.mp4" type="video/mp4" />
                     </video>
                        <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold bg-brand-green/80 rounded-xl mx-2 p-1"> Samsung S26 Ultra all In Stock</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-brand-black px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-brand-green text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-3">Featured Products</p>
              <h2 className="font-syne font-bold text-heading">
                <span className="text-white">Latest</span> <span className="text-brand-green">Gadgets</span>
              </h2>
              <div className="w-16 h-0.5 bg-brand-green mx-auto mt-4 rounded-full" />
            </div>
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
              <div className="text-center py-12">
                <p className="text-gray-500">No products available yet.</p>
              </div>
            )}
          </div>
        </section>
        
         {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-brand-dark px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-brand-green text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
              <h2 className="font-syne font-bold text-heading text-white">
                Shop With <span className="text-brand-green">Confidence</span>
              </h2>
              <div className="w-16 h-0.5 bg-brand-green mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              {whyChooseUsCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className="bg-brand-card border-l-[3px] border-brand-green rounded-xl p-5 md:p-6 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-green/10 transition-all duration-300 group"
                  >
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-brand-green/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center mb-3 md:mb-4">
                        <IconComponent size={20} className="text-brand-green" />
                      </div>
                      <h3 className="font-syne font-bold text-base md:text-lg text-white mb-1.5 md:mb-2">{card.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm mb-3 leading-relaxed">{card.description}</p>
                      <span className="inline-block bg-brand-green/10 text-brand-green text-[10px] md:text-xs px-2.5 md:px-3 py-1 rounded-full font-medium">
                        {card.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet The Owner */}
        <section className="py-16 md:py-24 bg-brand-dark px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-brand-green text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-3">Meet The Owner</p>
              <h2 className="font-syne font-bold text-heading">
                <span className="text-white">The Face Behind</span> <span className="text-brand-green">Chine Apples</span>
              </h2>
              <div className="w-16 h-0.5 bg-brand-green mx-auto mt-4 rounded-full" />
            </div>
            <div className="bg-brand-card max-w-xl mx-auto rounded-2xl p-6 md:p-10 text-center border border-brand-border">
              <div className="relative w-28 h-28 md:w-32 md:h-32 mx-auto mb-4 animate-glow-pulse">
                <img
                  src="https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000138318_jbtvgq"
                  alt="Chine Apples"
                  className="w-full h-full rounded-full object-cover ring-4 ring-brand-green"
                />
              </div>
              <h3 className="font-syne font-bold text-xl md:text-2xl text-white">Chine Apples</h3>
              <p className="text-brand-green text-xs md:text-sm font-medium mt-1">CEO & Founder</p>
              <div className="flex items-center justify-center gap-2 mt-3 mb-5">
                <CheckCircle size={14} className="text-brand-green" />
                <span className="text-brand-green text-[10px] md:text-xs font-medium">Verified Business</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm mx-auto mb-6">
                &ldquo;Welcome to Enugu&apos;s most trusted gadget store. We bring you genuine products at the best prices guaranteed. Your satisfaction is our mission.&rdquo;
              </p>
              <div className="flex justify-center gap-5 md:gap-8 pt-5 border-t border-brand-border">
                <div>
                  <p className="font-syne font-bold text-base md:text-lg text-brand-green">500+</p>
                  <p className="text-gray-500 text-[10px] md:text-xs">Products</p>
                </div>
                <div>
                  <p className="font-syne font-bold text-base md:text-lg text-brand-green">2K+</p>
                  <p className="text-gray-500 text-[10px] md:text-xs">Customers</p>
                </div>
                <div>
                  <p className="font-syne font-bold text-base md:text-lg text-brand-green">5 Star</p>
                  <p className="text-gray-500 text-[10px] md:text-xs">Rating</p>
                </div>
              </div>
            </div>
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