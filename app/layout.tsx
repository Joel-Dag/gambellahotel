import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gambela Hotel | Luxury Sanctuary & Accommodations in Addis Ababa",
  description:
    "Experience artisanal Ethiopian luxury, cultural wood craftsmanship, and world-class hospitality at Gambela Hotel in Addis Ababa. Featuring executive suites, veranda dining, and diplomatic security.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var rawFetch = window.fetch;
                  var currentFetch = typeof rawFetch === 'function' ? rawFetch.bind(window) : rawFetch;
                  try {
                    Object.defineProperty(window, 'fetch', {
                      get: function() {
                        return currentFetch;
                      },
                      set: function(val) {
                        currentFetch = val;
                      },
                      configurable: true,
                      enumerable: true
                    });
                  } catch (e1) {
                    var proto = Object.getPrototypeOf(window);
                    if (proto) {
                      Object.defineProperty(proto, 'fetch', {
                        get: function() {
                          return currentFetch;
                        },
                        set: function(val) {
                          currentFetch = val;
                        },
                        configurable: true,
                        enumerable: true
                      });
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#12100E] text-[#F4EFEA] font-sans selection:bg-[#D4AF37] selection:text-[#12100E]">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

