"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "EcoShop",
    industry: "E-commerce",
    technologies: ["Next.js", "Shopify API", "Tailwind CSS"],
    experience: "We transformed a traditional retail brand into a digital-first e-commerce powerhouse with a high-performance headless architecture.",
    result: "40% increase in sales conversion within 2 months.",
    color: "bg-green-500/10 border-green-500/20",
  },
  {
    title: "BizGrowth",
    industry: "Business Services",
    technologies: ["React", "Node.js", "Framer Motion"],
    experience: "Developed a comprehensive lead generation engine focused on local market dominance and conversion-optimized UI.",
    result: "Ranked #1 for local business search terms.",
    color: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "The Italian Table",
    industry: "Restaurant",
    technologies: ["WordPress", "SEO Optimization", "Mobile-First"],
    experience: "Designed a mobile-first reservation system that prioritized visual storytelling and seamless booking for diners.",
    result: "Reservations increased by 150% in 3 months.",
    color: "bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "IronFit Gym",
    industry: "Fitness & Health",
    technologies: ["Next.js", "Stripe Integration", "Booking System"],
    experience: "Engineered a robust membership management platform that automated scheduling and simplified digital payments.",
    result: "Streamlined member signups and increased efficiency by 60%.",
    color: "bg-rose-500/10 border-rose-500/20",
  },
  {
    title: "Creative Canvas",
    industry: "Portfolio Website",
    technologies: ["React", "GSAP Animations", "Tailwind"],
    experience: "Pushed the boundaries of web animation to create an immersive digital portfolio for a high-end creative agency.",
    result: "Enhanced professional brand visibility and client leads.",
    color: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "NexGen Tech",
    industry: "SaaS Startup",
    technologies: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    experience: "Launched a disruptive SaaS platform with a high-converting landing page and scalable user dashboard architecture.",
    result: "Successfully onboarded 500+ premium users in the first month.",
    color: "bg-cyan-500/10 border-cyan-500/20",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent font-semibold tracking-widest uppercase text-sm"
            >
              Our Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mt-4 tracking-tight"
            >
              Delivering Results for Our <span className="gradient-text">Partners</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="#audit"
              className="group flex items-center gap-2 text-lg font-bold hover:text-accent transition-colors"
            >
              Start Your Success Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-1 rounded-2xl border ${project.color} group hover:scale-[1.02] transition-transform duration-300 shadow-2xl overflow-hidden`}
            >
              <div className="bg-slate-900 p-8 rounded-2xl h-full flex flex-col relative">
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-2xl" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {project.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">{project.title}</h3>
                  
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    {project.experience}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-medium text-accent">
                        #{tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <p className="text-xs font-black uppercase tracking-widest mb-3 text-white/40">Success Outcome:</p>
                    <p className="text-white text-sm italic font-medium leading-relaxed">
                      &ldquo;{project.result}&rdquo;
                    </p>
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
