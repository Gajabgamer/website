"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, X, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CaseStudy() {
  return (
    <section id="case-study" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm"
          >
            Case Study
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
          >
            A Real <span className="gradient-text">Success Story</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-muted/30 p-8 md:p-16 rounded-3xl border border-border shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm bg-accent/10 px-4 py-2 rounded-full">
                Client: Fitness Coach
              </div>
              <h3 className="text-3xl font-bold leading-tight">
                Building a Global Fitness Brand from Scratch
              </h3>
            </div>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h4 className="font-bold text-rose-500 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  The Problem
                </h4>
                <p className="text-muted-foreground">
                  The client had no online presence and no website. They were relying entirely on word-of-mouth and struggling to reach a wider audience.
                </p>
              </div>

              <div className="bg-card p-6 rounded-2xl border border-border">
                <h4 className="font-bold text-emerald-500 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  The Solution
                </h4>
                <p className="text-muted-foreground">
                  We built a SEO optimized, mobile-first website with an integrated booking system and local marketing strategy targeting their specific niche.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent p-6 rounded-2xl text-white shadow-lg shadow-accent/20">
                <TrendingUp className="w-8 h-8 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-1">2,500+</div>
                <div className="text-xs uppercase tracking-widest font-semibold opacity-80">
                  Monthly Visitors
                </div>
              </div>
              <div className="bg-emerald-500 p-6 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                <Users className="w-8 h-8 mb-4 opacity-80" />
                <div className="text-3xl font-bold mb-1">150+</div>
                <div className="text-xs uppercase tracking-widest font-semibold opacity-80">
                  Monthly Leads
                </div>
              </div>
            </div>

            <Link
              href="/#audit"
              className="inline-flex items-center gap-2 text-lg font-bold hover:text-accent transition-colors group"
            >
              Ready to See These Results?
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop"
                alt="Fitness Coach coaching client"
                fill
                className="object-cover opacity-40 absolute inset-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-white/20 relative overflow-hidden">
                  {/* Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                        JS
                      </div>
                      <div>
                        <h4 className="font-bold text-white">James Smith</h4>
                        <p className="text-sm text-white/60">Professional Fitness Coach</p>
                      </div>
                    </div>
                    <p className="text-white text-lg italic leading-relaxed font-medium">
                      &ldquo;The results were immediate. Within 3 months, my business transformed from a local operation to a global brand with clients across 5 countries.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div className="w-20 h-2 bg-white/20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
