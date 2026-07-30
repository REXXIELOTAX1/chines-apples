import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Starlink & WiFi Devices in Enugu',
  description: 'Shop Starlink kits, WiFi routers and MiFi devices in Enugu at Chine Apples Communication.',
};

export default function NetworkingLayout({ children }: { children: React.ReactNode }) {
  return children;
}