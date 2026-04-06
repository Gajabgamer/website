"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Zap } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[120px] rounded-full opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_70%)] opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-primary-foreground p-12 md:p-24 rounded-3xl border border-white/10 shadow-2xl text-center relative overflow-hidden group"
        >
          {/* Animated glow */}
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/20 text-xs font-bold uppercase tracking-widest text-accent"
            >
              <Zap className="w-4 h-4 fill-accent" />
              Limited Availability
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
            >
              Ready to Grow Your <span className="gradient-text">Business</span> Online?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-xl mx-auto leading-relaxed"
            >
              Start your journey today with a custom-built website and marketing plan designed for results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                href="/#audit"
                className="bg-accent text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-accent/25"
              >
                Start Your Project
                <ArrowRight className="w-6 h-6" />
              </Link>
              <a
                href="tel:+919315797023"
                className="px-10 py-5 rounded-full text-xl font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-3"
              >
                Book Free Strategy Call
                <PhoneCall className="w-6 h-6" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
