"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageSquare,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ChevronRight,
  Sparkles
} from "lucide-react";

const footerLinks = {
  agency: [
    { name: "About Us", href: "#" },
    { name: "Our Work", href: "/#portfolio" },
    { name: "Our Process", href: "/#process" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#audit" },
  ],
  services: [
    { name: "Web Development", href: "/#services" },
    { name: "SEO Optimization", href: "/#services" },
    { name: "Marketing Strategy", href: "/#services" },
    { name: "Branding Design", href: "/#services" },
    { name: "Maintenance", href: "/#services" },
  ],
  legal: [
    { name: "Privacy Policy", href: "https://drive.google.com/file/d/1J55UTEHH7-iMxERmpu8lY_WUUdVbK-rW/view?usp=sharing" },
    { name: "Terms & Conditions", href: "https://drive.google.com/file/d/14tgi3HW0bQFRzs0AwtLrPPZ6pgyW0T1j/view?usp=sharing" },
    { name: "Cookie Policy", href: "https://drive.google.com/file/d/1SZ6YpypvU4MCGAChSCDUxCTFFz-jOrWn/view?usp=sharing" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#" },
  { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#" },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
  { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#" },
];

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // No useEffect needed, initialize year in useState directly
  // useEffect(() => {
  //   setYear(new Date().getFullYear());
  // }, []);

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="text-3xl font-bold tracking-tighter flex items-center gap-2 group">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white text-xl font-black">W</span>
              </div>
              <span>Web<span className="text-accent">ate</span></span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              We build high-performance websites and marketing systems designed to help your business thrive in the modern economy.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 border border-border"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-lg font-bold">Agency</h4>
            <ul className="space-y-4">
              {footerLinks.agency.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent/50 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-lg font-bold">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent/50 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-lg font-bold">Get In Touch</h4>
            <div className="space-y-6">
              <a
                href="mailto:webatexyz@outlook.com"
                className="flex items-center gap-4 group p-4 rounded-2xl bg-muted/50 border border-border hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-60">Email Us</p>
                  <p className="font-bold">webatexyz@outlook.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/919315797023"
                className="flex items-center gap-4 group p-4 rounded-2xl bg-muted/50 border border-border hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-60">WhatsApp</p>
                  <p className="font-bold">+91 93157 97023</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <p>&copy; {year} Webate. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
