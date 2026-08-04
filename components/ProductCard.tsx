'use client';

import { useState } from 'react';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Product, formatPrice, toNumber } from '@/lib/supabase';
import ImagePreviewModal from './ImagePreviewModal';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const DELIVERY_OPTIONS = [
  { label: 'Pickup', note: 'Customer will pick up from the shop.' },
  { label: 'Delivery (Within Enugu)', note: 'Delivery within Enugu, ~1hr.' },
  { label: 'Delivery (Outside Enugu)', note: 'Delivery outside Enugu, ~24hrs.' },
];

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [note, setNote] = useState('');
  const [deliveryIndex, setDeliveryIndex] = useState(0);

  const noteText = note.trim() ? (' (Preference: ' + note.trim() + ')') : '';
  const descText = product.description ? (' Details: ' + product.description) : '';
  const deliveryText = '\n\n' + DELIVERY_OPTIONS[deliveryIndex].note;
  const [showPreview, setShowPreview] = useState(false);
  const images = product.image_urls && product.image_urls.length > 0 ? product.image_urls : [product.image_url];

  const message =
    'Hi, I want to order ' +
    product.name +
    noteText +
    ' priced at ' +
    formatPrice(product.price) +
    ' from Chine Apples Communication.' +
    descText +
    deliveryText;

  const whatsappLink = 'https://wa.me/2348109377558?text=' + encodeURIComponent(message);

  const featured = product.is_featured ?? false;
  const inStock = product.is_in_stock ?? true;

  return (
    <div className="min-w-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,230,118,0.3)]">
      <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden h-full flex flex-col">
       <div
  className="relative w-full aspect-[4/3] overflow-hidden bg-brand-dark cursor-pointer"
  onClick={() => setShowPreview(true)}
>
  <img
    src={product.image_url}
    alt={product.name}
    className="w-full h-full object-cover"
  />
  {images.length > 1 && (
    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">
      {images.length} photos
    </div>
  )}
          {featured && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              HOT
            </div>
          )}
          {product.is_discounted && product.old_price && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg shadow-red-600/50">
              -{Math.round(((toNumber(product.old_price) - toNumber(product.price)) / toNumber(product.old_price)) * 100)}%
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

          {product.description && (
            <p className="text-gray-400 text-xs mt-1 whitespace-pre-line">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <p className="text-brand-green font-bold text-lg">{formatPrice(product.price)}</p>
            {product.is_discounted && product.old_price && (
              <p className="text-gray-500 text-sm line-through">{formatPrice(product.old_price)}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className={'w-2 h-2 rounded-full ' + (inStock ? 'bg-brand-green' : 'bg-red-500')} />
            <span className={'text-xs ' + (inStock ? 'text-brand-green' : 'text-red-400')}>
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

          <select
            value={deliveryIndex}
            onChange={(e) => setDeliveryIndex(Number(e.target.value))}
            className="mt-2 w-full bg-brand-dark border border-brand-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-green"
          >
            {DELIVERY_OPTIONS.map((opt, i) => (
              <option key={opt.label} value={i}>
                {opt.label}
              </option>
            ))}
          </select>

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
      {showPreview && (
        <ImagePreviewModal
          images={images}
          productName={product.name}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}