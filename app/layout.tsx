import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Chine Apples Communication — No.1 Gadget Store in Enugu',
  description: 'Your No.1 Gadget Store in Enugu. Genuine products, unbeatable prices. Shop iPhones, Samsung, AirPods, Smartwatches and more.',
  openGraph: {
    title: 'Chine Apples Communication',
    description: 'No.1 Gadget Store in Enugu — Genuine products, unbeatable prices.',
    images: [{ url: 'https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-brand-black text-white" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
