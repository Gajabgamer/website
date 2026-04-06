"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO, TechStart",
    content: "Our website traffic increased significantly after their SEO work. They delivered a high-end product that truly represents our brand.",
    rating: 5,
  },
  {
    name: "Sarah Miller",
    role: "Founder, GreenMarket",
    content: "Professional design and fast delivery. The team was incredibly responsive and understood our vision perfectly.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Marketing Director, BluePeak",
    content: "Great communication and high-quality results. Our conversion rates have improved by 35% since we launched the new site.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm"
          >
            Client Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
          >
            What Our <span className="gradient-text">Clients</span> Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Do not just take our word for it. Hear from the businesses we have helped grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-900 border border-white/10 hover:border-accent/50 transition-all duration-300 relative group overflow-hidden shadow-2xl"
            >
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              
              <div className="absolute top-8 right-8 text-accent/10 group-hover:text-accent/20 transition-colors z-0">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-xl leading-relaxed mb-8 italic text-white/90 relative z-10 font-medium">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
