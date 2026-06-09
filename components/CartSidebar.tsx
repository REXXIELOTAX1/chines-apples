'use client';

import { useMemo } from 'react';
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { CartItem, formatPrice, toNumber } from '@/lib/supabase';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) {
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + toNumber(item.price) * item.quantity, 0);
  }, [items]);

  const formatCartMessage = () => {
    const itemsList = items
      .map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(item.price)}`)
      .join('\n');
    return `Hi, I want to order from Chine Apples Communication:\n\n${itemsList}\n\nTotal: ${formatPrice(totalPrice)}\n\nPlease confirm my order.`;
  };

  const whatsappUrl = `https://wa.me/2348109377558?text=${encodeURIComponent(formatCartMessage())}`;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-brand-dark shadow-lg z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-syne font-bold text-white">Shopping Cart</h2>
            <p className="text-sm text-gray-400 mt-1">{items.length} item(s)</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg transition-colors" aria-label="Close cart">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <ShoppingCart className="w-12 h-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
            <Link href="/products" onClick={onClose} className="text-brand-green hover:underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-700 last:border-b-0">
                  <div className="flex-shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                    <p className="text-brand-green font-semibold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <span className="w-6 text-center text-white text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="flex-shrink-0 p-2 hover:bg-red-500/10 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-gray-700 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Total:</span>
              <span className="text-2xl font-bold text-brand-green">{formatPrice(totalPrice)}</span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-green text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-brand-green/90 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Checkout via WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
