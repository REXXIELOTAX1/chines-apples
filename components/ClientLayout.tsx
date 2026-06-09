'use client';

import { CartProvider } from '@/components/CartProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
