'use client';

import { useState } from 'react';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Product, formatPrice, toNumber } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [note, setNote] = useState('');

  const noteText = note.trim() ? ` (Preference: ${note.trim()})` : '';
  const whatsappLink = `https://wa.me/2348109377558?text=Hi%2C%20I%20want%20to%20order%20${encodeURIComponent(product.name + noteText)}%20priced%20at%20${formatPrice(product.price)}%20from%20Chine%20Apples%20Communication.`;

  const featured = product.is_featured ?? false;
  const inStock = product.is_in_stock ?? true;

  return (
    <div className="min-w-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,230,118,0.3)]">
      <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden h-full flex flex-col">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-brand-dark">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              HOT
            </div>
          )}
          <div className="absolute top-2 right-2 bg-brand-green/20 text-brand-green text-xs px-2 py-0.5 rounded-full">
            {product.category}
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-syne font-semibold text-white truncate">{product.name}</h3>

          {(product.storage || product.color) && (
            <p className="text-gray-400 text-xs mt-1">
              {product.storage}
              {product.storage && product.color ? ' · ' : ''}
              {product.color}
            </p>
          )}

          <p className="text-brand-green font-bold text-lg mt-2">{formatPrice(product.price)}</p>

          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-brand-green' : 'bg-red-500'}`} />
            <span className={`text-xs ${inStock ? 'text-brand-green' : 'text-red-400'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Color / storage preference (optional)"
            className="mt-3 w-full bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-green"
          />

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={onAddToCart}
              className="flex-1 bg-brand-dark border border-brand-green/30 text-brand-green py-2 px-3 rounded-lg hover:bg-brand-green/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-green text-black py-2 px-3 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}