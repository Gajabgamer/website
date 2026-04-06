"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ExternalLink, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

const industryImages: Record<string, string> = {
  Gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
  Restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  "Coaching Institute": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
  "Real Estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
  "Clinic/Hospital": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
  Startup: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  "Local Business": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  Portfolio: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
  Other: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
};

// Define proper typing for the style property
function DemoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Your Business";
  const industry = searchParams.get("industry") || "Business";
  const city = searchParams.get("city") || "Your City";
  const color = searchParams.get("color") || "#3b82f6";

  const heroImage = industryImages[industry] || industryImages.Other;

  // Custom text per industry
  const getSubheading = () => {
    if (industry === "Clinic/Hospital") return `The most trusted healthcare facility in ${city}. We are dedicated to providing compassionate care and advanced medical treatments.`;
    return `The best ${industry.toLowerCase()} services in ${city}. We are dedicated to providing high-quality solutions tailored to your specific needs.`;
  };

  const getAboutText = () => {
    if (industry === "Clinic/Hospital") return `With years of experience in the healthcare sector, we have built a reputation for medical excellence and reliability in ${city}. Our team of specialized doctors is committed to delivering the best possible care for our patients.`;
    return `With years of experience in the ${industry.toLowerCase()} industry, we have built a reputation for excellence and reliability in ${city}. Our team of professionals is committed to delivering the best possible results for our clients.`;
  };

  const getServices = () => {
    if (industry === "Clinic/Hospital") {
      return [
        { title: "Specialized Care", desc: "Expert treatments from top-tier medical specialists." },
        { title: "24/7 Emergency", desc: "Immediate responses and critical care facilities round the clock." },
        { title: "Health Checkups", desc: "Comprehensive diagnostic testing and preventive care packages." },
      ];
    }
    return [
      { title: "Expert Consulting", desc: "Professional advice from industry experts to guide your decisions." },
      { title: "Custom Solutions", desc: "Tailored services built specifically for your unique requirements." },
      { title: "Managed Services", desc: "End-to-end management so you can focus on what you do best." },
    ];
  };

  const services = getServices();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-accent selection:text-white" style={{ "--primary-color": color } as unknown as React.CSSProperties}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter" style={{ color }}>{name}</div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="#" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">About</Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">Services</Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">Contact</Link>
          </div>
          <button className="px-5 py-2 rounded-full text-white text-sm font-bold shadow-lg" style={{ backgroundColor: color }}>
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3" style={{ color }} />
              Premium {industry} Services
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Welcome to <span style={{ color }}>{name}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 leading-relaxed"
            >
              {getSubheading()}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 rounded-xl text-white font-bold shadow-xl shadow-slate-200" style={{ backgroundColor: color }}>
                Get Started
              </button>
              <button className="px-8 py-4 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <Image src={heroImage} alt={`${name} Hero`} fill className="object-cover" sizes="50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
        </div>
      </header>

      {/* About Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full aspect-square">
                <Image src={heroImage} alt={`About ${name} Business`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-white text-[10px] font-bold uppercase tracking-widest shadow-sm" style={{ color }}>
                About Us
              </div>
              <h2 className="text-4xl font-bold tracking-tight">{name} is a trusted {industry.toLowerCase()} business in {city}.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {getAboutText()}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Expert Team", icon: <CheckCircle2 className="w-5 h-5" /> },
                  { label: "Premium Quality", icon: <CheckCircle2 className="w-5 h-5" /> },
                  { label: "Modern Tools", icon: <CheckCircle2 className="w-5 h-5" /> },
                  { label: "24/7 Support", icon: <CheckCircle2 className="w-5 h-5" /> },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="text-emerald-500">{item.icon}</div>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
              Our Services
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Professional {industry} services in {city}</h2>
            <p className="text-slate-600">Discover our range of customer-focused solutions designed to help your business thrive.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all text-left space-y-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110" style={{ backgroundColor: color }}>
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                <Link href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-70" style={{ color }}>
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Note Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 rotate-3">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
                  alt={`CEO of ${name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" />
                  A Note from our CEO
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  Amazed by this instant preview? <br />
                  <span className="text-accent">We build 10x better.</span>
                </h3>
                <p className="text-lg text-slate-600 italic leading-relaxed">
                  {"This automated demo is just 1% of our capabilities. At Webate, we don't just build websites; we engineer high-performance digital assets that bring in consistent clients, automate your workflow, and skyrocket your business productivity."}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  <div>
                    <p className="font-black text-slate-900 text-xl">Alex Rivera</p>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">CEO, Webate</p>
                  </div>
                  <Link
                    href="/#audit"
                    className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-slate-200 flex items-center gap-2"
                  >
                    Get This High-Performance Website
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <Image src={heroImage} alt="Call to Action Background Gradient" fill className="object-cover" sizes="33vw" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Like this website for your business?</h2>
            <p className="text-slate-400 text-lg">Contact {name} today to get started with your professional digital presence in {city}.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#audit" className="px-8 py-4 rounded-xl font-bold shadow-xl shadow-slate-950 transition-all hover:scale-105" style={{ backgroundColor: color }}>
                Get This Website
              </Link>
              <Link href="/#audit" className="px-8 py-4 rounded-xl border border-slate-700 font-bold hover:bg-slate-800 transition-colors">
                Customize Design
              </Link>
              <Link href="/#audit" className="px-8 py-4 rounded-xl border border-slate-700 font-bold hover:bg-slate-800 transition-colors">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Preview */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
          <div className="font-bold text-slate-900">{name}</div>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contact@{name.toLowerCase().replace(/\s/g, "")}.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {city}
            </div>
          </div>
          <p>© 2026 {name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Persistent Return Link */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
        <Link href="/#instant-preview" className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform border border-slate-800">
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Generator
        </Link>
      </div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-2xl animate-pulse">Loading Preview...</div>}>
      <DemoContent />
    </Suspense>
  );
}
