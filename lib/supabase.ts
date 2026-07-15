import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  description: string | null;
  is_featured: boolean | null;
  is_in_stock: boolean | null;
  old_price?: number | null;
  is_discounted?: boolean | null;
  created_at: string;
  storage?: string;
  color?: string;
};

export type CartItem = Product & { quantity: number };

export const CATEGORIES = ['All', 'iPhones', 'Samsung', 'Airpods', 'Powerbanks', 'Smartwatches'] as const;

export const WHATSAPP_NUMBER = '2348109377558';

export function formatPrice(price: number | string): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return `₦${num.toLocaleString()}`;
}

export function toNumber(price: number | string): number {
  return typeof price === 'string' ? parseFloat(price) : price;
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
