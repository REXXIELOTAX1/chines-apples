import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samsung Phones for Sale in Enugu',
  description: 'Shop genuine Samsung Galaxy phones at unbeatable prices in Enugu. Latest models including S26 Ultra, all in stock at Chine Apples Communication.',
};

export default function SamsungLayout({ children }: { children: React.ReactNode }) {
  return children;
}