'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Truck, HeadphonesIcon, Award, Tag, Users, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { supabase, Product, getWhatsAppUrl } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ImagePreviewModal from '@/components/ImagePreviewModal';

const categories = [
  { name: 'iPhones', href: '/iphones', image: '/images/categories/iphone.jpg' },
  { name: 'Samsung', href: '/samsung', image: '/images/categories/samsung.jpg' },
  { name: 'Pixel', href: '/pixel', image: '/images/categories/pixel.jpg' },
  { name: 'AirPods', href: '/airpods', image: '/images/categories/airpods.jpg' },
  { name: 'Speakers', href: '/speakers', image: '/images/categories/speaker.jpg' },
  { name: 'Games', href: '/games', image: '/images/categories/games.jpg' },
  { name: 'Tablets', href: '/tablets', image: '/images/categories/tablet.jpg' },
  { name: 'Networking', href: '/networking', image: '/images/categories/networking.jpg' },
  { name: 'Accessories', href: '/accessories', image: '/images/categories/accessories.jpg' },
];

export default function Home() {
  const { items, addToCart, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

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
    { icon: Truck, title: 'Fast Delivery', description: 'Within Enugu: delivery in about 1 hour. Outside Enugu: delivery within 24 hours.', badge: 'Fast & Reliable' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'Our dedicated support team is always available to assist you with any queries.', badge: 'Always Available' },
    { icon: Award, title: 'Best Prices', description: 'We offer the most competitive prices in Enugu. Price match guaranteed.', badge: 'Price Match' },
  ];

  const leftColClass = 'order-2 lg:order-1 text-center lg:text-left ' + (isVisible ? 'animate-fade-in-up' : 'opacity-0');
  const heroBgStyle = {
    backgroundImage: "url('https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <div className="px-4 md:px-8 pt-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/deals"
            className="block bg-red-950/40 border-2 border-brand-green rounded-xl p-3 md:p-4 pt-5 md:pt-6 relative hover:border-brand-green-dark transition-colors shadow-lg shadow-brand-green/20"
          >
            <div className="absolute -top-3 left-4 bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 whitespace-nowrap shadow-md">
              🔥 HOT DEALS!
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center">
                  <Tag
                    size={40}
                    className="text-red-600 fill-red-600 rotate-[-15deg] drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
                    strokeWidth={1.5}
                  />
                  <span className="absolute text-white font-bold text-xs rotate-[-15deg]">%</span>
                  <span className="absolute top-0 right-0 w-1 h-1 bg-red-400 rounded-full animate-ping" />
                  <span className="absolute bottom-1 right-1 w-1 h-1 bg-red-400 rounded-full" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm md:text-base">Discounted Devices</p>
                </div>
              </div>
              <span className="bg-red-600 text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-lg whitespace-nowrap hover:bg-red-700 transition-colors">
                View Deals →
              </span>
            </div>
          </Link>
        </div>
      </div>

      <main className="bg-brand-black">

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] md:min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0" style={heroBgStyle} />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-black/70 via-brand-black/85 to-brand-black" />
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl z-10" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl z-10" />

          <div className="relative z-20 w-full px-5 py-8 md:px-8 lg:px-12 md:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Left Column */}
                <div className={leftColClass}>
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
                      <p className="font-syne font-bold text-xl md:text-2xl text-brand-green">3K+</p>
                      <p className="text-gray-500 text-xs md:text-sm mt-0.5">Customers</p>
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="font-syne font-bold text-xl md:text-2xl text-brand-green">5 Star</p>
                      <p className="text-gray-500 text-xs md:text-sm mt-0.5">Rated</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="order-1 lg:order-2 flex justify-center items-center">
                  <div className="relative w-full max-w-xs lg:max-w-sm">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-[325px] md:h-[390px] object-cover rounded-3xl shadow-2xl border-2 border-brand-green/50"
                    >
                      <source src="https://res.cloudinary.com/dwwqf4p69/video/upload/v1785571286/VID-20260731-WA0013_rlntgr.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/25 rounded-3xl pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <div className="py-10 md:py-14 bg-brand-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block bg-brand-green/10 text-brand-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                BROWSE
              </span>
              <h2 className="font-syne text-3xl md:text-4xl font-bold text-white">
                Shop by <span className="text-brand-green">Category</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <a
                  key={cat.name}
                  href={cat.href}
                  className="group relative h-72 rounded-2xl overflow-hidden border border-brand-border hover:border-brand-green transition-colors"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-syne font-bold text-xl">{cat.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Links */}
<section className="relative py-16 md:py-24 bg-brand-black px-4 md:px-8 overflow-hidden">
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

  <div className="relative max-w-5xl mx-auto">
    <div className="text-center mb-10 md:mb-14">
      <span className="inline-block bg-brand-green/10 text-brand-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-brand-green/20">
        TRUST & SUPPORT
      </span>
      <h2 className="font-syne text-3xl md:text-4xl font-bold text-white">
        Everything You <span className="text-brand-green">Need to Know</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
      {[
        {
          href: '/about',
          image: '/images/trust/about.jpg',
          title: 'About Us',
          desc: 'Learn our story and why customers trust us.',
          cta: 'Learn more',
          accent: 'text-blue-400',
        },
        {
          href: '/warranty',
          image: '/images/trust/warranty.jpg',
          title: 'Warranty Policy',
          desc: 'Shop with full confidence, fully covered.',
          cta: 'View policy',
          accent: 'text-brand-green',
        },
        {
          href: '/faq',
          image: '/images/trust/faq.jpg',
          title: 'FAQs',
          desc: 'Quick answers to common questions.',
          cta: 'Get answers',
          accent: 'text-purple-400',
        },
      ].map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="group relative bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-brand-green/50 transition-all duration-300 shadow-lg"
        >
          {/* Image */}
          <div className="relative h-36 md:h-40 w-full overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/40 to-transparent" />
          </div>

          {/* Copy */}
          <div className="p-6 md:p-8 pt-4 md:pt-5">
            <h3 className="text-white font-syne font-bold text-lg mb-1.5">{card.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{card.desc}</p>
            <span className={`inline-flex items-center gap-1 text-sm font-semibold ${card.accent}`}>
              {card.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      ))}
    </div>
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

      </main>

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
    </>
  );
}