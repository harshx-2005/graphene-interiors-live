import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingWidget from "@/components/floating-widget";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Graphene Interiors Ltd | Luxury Kitchens & Bespoke Fitted Wardrobes Leicester",
  description: "UK-based luxury interiors and renovation company specializing in custom kitchens, wardrobes, sliding wardrobes, media walls, and worktops in Leicester. 15+ years experience. City & Guilds qualified.",
  keywords: [
    "kitchen fitters Leicester",
    "luxury kitchens Leicester",
    "fitted wardrobes Leicester",
    "sliding wardrobes Leicester",
    "media walls Leicester",
    "bespoke furniture Leicester",
    "interior renovations Leicester",
    "Graphene Interiors",
  ],
  openGraph: {
    title: "Graphene Interiors Ltd | Luxury Kitchens & Bespoke Wardrobes",
    description: "Transforming houses into beautiful living spaces across Leicester. Bespoke furniture, media walls, kitchens, and interior renovations.",
    type: "website",
    locale: "en_GB",
    url: "https://grapheneinteriors.co.uk",
  },
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" 
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body
        className={`${playfair.variable} ${outfit.variable} antialiased bg-white text-primary font-sans`}
      >
        {/* LocalBusiness JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Graphene Interiors Ltd",
              "image": "https://grapheneinteriors.co.uk/images/projects/modern_kitchen_beige.jpg",
              "logo": "https://grapheneinteriors.co.uk/images/logo.png",
              "@id": "https://grapheneinteriors.co.uk/#localbusiness",
              "url": "https://grapheneinteriors.co.uk",
              "telephone": "+447438199369",
              "email": "grapheneinteriors@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "48 Chesterfield Road",
                "addressLocality": "Leicester",
                "postalCode": "LE5 5LF",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 52.6375,
                "longitude": -1.0970
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://instagram.com/graphene_interiorsltd"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "19"
              }
            })
          }}
        />
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <FloatingWidget />
      </body>
    </html>
  );
}
