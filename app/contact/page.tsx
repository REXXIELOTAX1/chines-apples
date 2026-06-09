'use client';

import { useState } from 'react';
import { Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import { useCart } from '@/components/CartProvider';

export default function ContactPage() {
  const { items, updateQuantity, removeItem, cartCount, openCart, closeCart, isCartOpen } = useCart();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const whatsappUrl = getWhatsAppUrl("Hi, I'm reaching out from the website.");

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={openCart} />

      <main className="flex-1">
        <div className="bg-brand-dark py-12 md:py-16 border-b border-brand-border">
          <div className="max-w-5xl mx-auto px-4">
            <span className="inline-block bg-brand-green/10 text-brand-green text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              GET IN TOUCH
            </span>
            <h1 className="font-syne text-4xl md:text-5xl font-bold">
              <span className="text-white">Contact </span>
              <span className="text-brand-green">Us</span>
            </h1>
            <p className="text-gray-400 text-lg mt-3">We'd love to hear from you</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-brand-card rounded-2xl p-8 border border-brand-border">
              <h2 className="font-syne text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your Name"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-none transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="your@email.com"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-none transition" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Your Phone Number"
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-none transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} placeholder="Your message here..."
                    className="w-full bg-brand-dark border border-brand-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-brand-green focus:ring-1 focus:ring-brand-green focus:outline-none transition resize-none" />
                </div>
                <button type="submit" className="w-full bg-brand-green text-black font-bold py-3 rounded-lg hover:bg-brand-green/90 transition flex items-center justify-center gap-2">
                  <Send size={20} /> Send Message
                </button>
                {showSuccess && (
                  <div className="p-4 bg-brand-green/10 border border-brand-green rounded-lg text-brand-green text-sm">
                    Thank you! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-brand-card border border-brand-border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] transition">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 rounded-lg p-3 flex-shrink-0">
                    <Phone size={24} className="text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                    <a href="tel:08109377558" className="text-gray-300 hover:text-brand-green transition">08109377558</a>
                  </div>
                </div>
              </div>

              <div className="bg-brand-card border border-brand-border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] transition">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 rounded-lg p-3 flex-shrink-0">
                    <MessageCircle size={24} className="text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                    <p className="text-gray-400 text-sm mb-3">Chat with us</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-block bg-brand-green text-black font-semibold px-4 py-2 rounded-lg hover:bg-brand-green/90 transition text-sm">
                      Start Chat
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-brand-card border border-brand-border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] transition">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 rounded-lg p-3 flex-shrink-0">
                    <MapPin size={24} className="text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
                    <p className="text-gray-300">Enugu, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-card border border-brand-border rounded-xl p-6 hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] transition">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 rounded-lg p-3 flex-shrink-0">
                    <Clock size={24} className="text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Business Hours</h3>
                    <p className="text-gray-300">Mon - Sat: 8AM - 7PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Maps Placeholder */}
          <div className="mt-12 bg-brand-card rounded-xl h-64 border border-brand-border flex flex-col items-center justify-center text-gray-500">
            <MapPin size={48} className="mb-3 opacity-50" />
            <p className="text-lg">Map - Enugu, Nigeria</p>
          </div>
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
