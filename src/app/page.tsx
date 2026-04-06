import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import PricingPackages from "@/components/PricingPackages";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CaseStudy from "@/components/CaseStudy";
import AuditForm from "@/components/AuditForm";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { WelcomeModal } from "@/components/WelcomeModal";
import { InstantPreviewSection } from "@/components/InstantPreviewSection";

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Webate',
    image: 'https://webate.com/og-image.jpg',
    description: 'Webate builds modern websites, performs SEO audits, and helps businesses grow their online presence with high-performance digital solutions.',
    url: 'https://webate.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Global',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'webatexyz@outlook.com',
      contactType: 'customer support'
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WelcomeModal />
      <Navbar />
      <Hero />
      <InstantPreviewSection />
      <Services />
      <Portfolio />
      <PricingPackages />
      <Process />
      <Testimonials />
      <CaseStudy />
      <AuditForm />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}