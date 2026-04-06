import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/components/UserContext";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webate | High-End Web Design & SEO Services",
  description: "Webate builds modern websites, performs SEO audits, and helps businesses grow their online presence with high-performance digital solutions.",
  keywords: ["web design agency", "SEO optimization", "digital marketing", "high-end websites", "conversion-focused design"],
  metadataBase: new URL("https://webate.com"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Webate – Smart Websites for Modern Businesses",
    description: "Webate builds modern websites, performs SEO audits, and helps businesses grow their online presence with high-performance digital solutions.",
    url: "https://webate.com",
    siteName: "Webate",
    images: [
      {
        url: "/og-image.jpg", // Replace with a real OG image path in the public folder eventually
        width: 1200,
        height: 630,
        alt: "Webate Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webate | Web Design & SEO",
    description: "Webate builds modern websites, performs SEO audits, and helps businesses grow their online presence with high-performance digital solutions.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            {children}
            <Analytics />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
