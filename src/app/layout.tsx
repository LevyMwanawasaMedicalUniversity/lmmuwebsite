import React, { Suspense } from 'react';
import { Inter, Roboto_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientSessionProvider from "@/components/providers/ClientSessionProvider";
import LoadingProvider from "@/components/providers/LoadingProvider";
import "./globals.css";
import "@/styles/gradients.css"; // Import our unified gradient system

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Levy Mwanawasa Medical University (LMMU)",
  description: "Levy Mwanawasa Medical University (LMMU) - A Leading Centre of Health Professions, Education, Training and Research in Zambia and Beyond",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/images/all-icon/logo.png' }
    ],
    apple: [
      { url: '/assets/images/all-icon/logo.png' }
    ],
    shortcut: [
      { url: '/assets/images/all-icon/logo.png' }
    ]
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactNode {
  
  return (
    <html lang="en">
      <head>
        {/* Bootstrap CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Slick carousel */}
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        
        {/* Magnific Popup */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" />
        
        {/* Legacy favicon support for browsers that don't support the icons in metadata */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/assets/images/all-icon/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientSessionProvider>
          <Suspense fallback={<div>Loading app...</div>}>
            <LoadingProvider>
              <Header />
              {children}
              <Footer />
            </LoadingProvider>
          </Suspense>
        </ClientSessionProvider>

        {/* jQuery */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" async></script>
        {/* Bootstrap Bundle with Popper */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" async></script>
        {/* Slick Carousel */}
        <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js" async></script>
        {/* Magnific Popup */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js" async></script>
      </body>
    </html>
  );
}