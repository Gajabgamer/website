"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Lock } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-xs md:text-sm font-medium border border-border/50 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent fill-accent/20" />
            <span className="text-muted-foreground uppercase tracking-widest">
              Digital Agency Excellence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
          >
            We Build Websites That Bring <span className="gradient-text">Clients</span> — Not Just Visitors
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
          >
            Modern websites, SEO optimization, and marketing systems designed to grow businesses. Transform your online presence today.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link href="/#audit" className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/25">
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/#portfolio" className="px-8 py-4 rounded-full text-lg font-bold border border-border hover:bg-muted transition-all">
              View Portfolio
            </Link>
          </motion.div>

          {/* Mockup / Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden glass border border-border/50 shadow-2xl group bg-slate-900"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />
            
            {/* Lock Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 p-8 rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent shadow-lg shadow-accent/20">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Website Preview Locked</h3>
                  <p className="text-sm text-white/60 max-w-[200px] mx-auto">Generate your personalized preview to unlock the full design.</p>
                </div>
                <Link href="/#instant-preview" className="bg-accent text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-accent/20">
                  Unlock This Website
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Mockup content representation */}
            <div className="w-full h-full p-4 md:p-8 flex flex-col gap-6">
              {/* Header mockup */}
              <div className="flex justify-between items-center opacity-40">
                <div className="w-24 h-4 bg-slate-700 rounded" />
                <div className="flex gap-4">
                  <div className="w-12 h-4 bg-slate-700 rounded" />
                  <div className="w-12 h-4 bg-slate-700 rounded" />
                </div>
              </div>
              
              {/* Main content mockup */}
              <div className="grid grid-cols-12 gap-6 h-full">
                <div className="col-span-8 flex flex-col gap-4">
                  <div className="w-3/4 h-12 bg-slate-800 rounded-lg animate-pulse" />
                  <div className="w-full h-4 bg-slate-800 rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-slate-800 rounded animate-pulse" />
                  <div className="w-32 h-10 bg-accent/40 rounded-full mt-4" />
                </div>
                <div className="col-span-4 bg-slate-800/50 rounded-xl border border-white/5 animate-pulse" />
              </div>
            </div>
            
            {/* Floating elements for "tech" feel */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 blur-2xl rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-500/20 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
