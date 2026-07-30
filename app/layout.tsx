import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chineapplescommunication.com'),
  title: {
    default: 'Chine Apples Communication — No.1 Gadget Store in Enugu',
    template: '%s | Chine Apples Communication',
  },
  description: 'Your No.1 Gadget Store in Enugu. Genuine products, unbeatable prices. Shop iPhones, Samsung, AirPods, Smartwatches and more.',
  keywords: ['gadget store Enugu', 'buy iPhone Enugu', 'Samsung phones Enugu', 'AirPods Enugu', 'phone shop Enugu', 'Chine Apples Communication'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Chine Apples Communication',
    description: 'No.1 Gadget Store in Enugu — Genuine products, unbeatable prices.',
    url: 'https://www.chineapplescommunication.com',
    siteName: 'Chine Apples Communication',
    images: [{ url: 'https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0' }],
    locale: 'en_NG',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'Chine Apples Communication',
  image: 'https://res.cloudinary.com/dwwqf4p69/image/upload/f_auto,q_auto/1000137475_ucfue0',
  url: 'https://www.chineapplescommunication.com',
  telephone: '+2348109377558',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Enugu',
    addressCountry: 'NG',
  },
  priceRange: '₦₦',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-brand-black text-white" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}