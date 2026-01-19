import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quip Network Links',
  description: "The World's Shared Quantum Computer - All important links in one place",
  icons: {
    icon: '/images/icon.png',
  },
  openGraph: {
    title: 'Quip Network Links',
    description: "The World's Shared Quantum Computer",
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050510',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-background text-text-primary selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
