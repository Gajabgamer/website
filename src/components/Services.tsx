"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Search, 
  BarChart, 
  Layers, 
  Settings, 
  Zap,
  ArrowUpRight,
  X,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Website Development",
    description: "Custom-built, fast, and responsive websites that convert visitors into loyal customers.",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-blue-500/10 text-blue-500",
    modal: {
      whatItMeans: "We build high-performance digital homes for your business that work 24/7 to turn visitors into leads. It's not just a website; it's a conversion engine.",
      howItHelps: [
        "Increases brand credibility and trust",
        "Provides a seamless experience on all devices",
        "Reduces bounce rates with lightning-fast speeds",
        "Automates lead capture and client inquiries"
      ],
      whatWeDo: [
        "Custom UI/UX Design & Prototyping",
        "Responsive Full-Stack Development",
        "Performance & Speed Optimization",
        "Secure Hosting & Domain Setup",
        "Integrations with CRM & Analytics"
      ],
      resultsImpact: {
        intro: "Businesses that invest in this service often experience:",
        points: [
          "Improved online visibility and brand credibility",
          "Increased customer inquiries and engagement",
          "Better conversion of website visitors into clients"
        ]
      }
    }
  },
  {
    title: "SEO Optimization",
    description: "Rank higher on Google and drive organic traffic with our advanced SEO strategies.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-emerald-500/10 text-emerald-500",
    modal: {
      whatItMeans: "SEO is the art of making sure people find you when they search for what you offer. We optimize your visibility so you show up where it matters most.",
      howItHelps: [
        "Drives consistent, high-quality organic traffic",
        "Reduces reliance on expensive paid advertising",
        "Builds long-term authority in your industry",
        "Outranks your local and global competitors"
      ],
      whatWeDo: [
        "Comprehensive Keyword Research",
        "Technical On-Page SEO Audit",
        "High-Quality Backlink Building",
        "Content Strategy & Optimization",
        "Local SEO & Google Business Profile"
      ],
      resultsImpact: {
        intro: "Effective SEO strategies typically result in:",
        points: [
          "Sustainable growth in organic search traffic",
          "Higher rankings for high-intent keywords",
          "Increased brand authority and trust"
        ]
      }
    }
  },
  {
    title: "Social Media Marketing",
    description: "Grow your brand presence and engage with your audience across all platforms.",
    icon: <BarChart className="w-8 h-8" />,
    color: "bg-purple-500/10 text-purple-500",
    modal: {
      whatItMeans: "We turn your social media profiles into active communities and lead generators. It's about being where your customers are and speaking their language.",
      howItHelps: [
        "Boosts brand awareness and recognition",
        "Increases direct engagement with customers",
        "Generates highly targeted traffic and leads",
        "Establishes a modern, relatable brand voice"
      ],
      whatWeDo: [
        "Platform-Specific Content Strategy",
        "Professional Graphic Design & Reels",
        "Community Management & Growth",
        "Paid Ad Campaign Management",
        "Analytics & Performance Tracking"
      ],
      resultsImpact: {
        intro: "Strategic social media management leads to:",
        points: [
          "Enhanced brand awareness and reach",
          "Higher levels of audience engagement and loyalty",
          "Steady flow of leads from social channels"
        ]
      }
    }
  },
  {
    title: "Branding & Design",
    description: "Unique and professional brand identities that resonate with your target market.",
    icon: <Layers className="w-8 h-8" />,
    color: "bg-rose-500/10 text-rose-500",
    modal: {
      whatItMeans: "Branding is how your business feels to your customers. We create visual identities that tell your story and make you impossible to ignore.",
      howItHelps: [
        "Differentiates you from every competitor",
        "Creates a memorable and professional look",
        "Builds emotional connection with clients",
        "Increases the perceived value of your services"
      ],
      whatWeDo: [
        "Logo Design & Visual Identity",
        "Brand Guidelines & Style Guides",
        "Marketing Material & Brochures",
        "UI/UX Visual Design Systems",
        "Social Media Brand Kit Creation"
      ],
      resultsImpact: {
        intro: "A professional brand identity helps businesses achieve:",
        points: [
          "Consistent and recognizable brand presence",
          "Increased perceived value and market position",
          "Stronger emotional connection with customers"
        ]
      }
    }
  },
  {
    title: "Website Maintenance",
    description: "Keep your website secure, updated, and performing at its best with our support.",
    icon: <Settings className="w-8 h-8" />,
    color: "bg-amber-500/10 text-amber-500",
    modal: {
      whatItMeans: "A website is like a car—it needs regular care to run smoothly. We handle the tech so you can focus 100% on running your business.",
      howItHelps: [
        "Prevents security breaches and hacking",
        "Ensures your site is always fast and stable",
        "Fixes bugs before they affect your users",
        "Provides peace of mind with regular backups"
      ],
      whatWeDo: [
        "Security Monitoring & Malware Scans",
        "Plugin & Framework Updates",
        "Regular Cloud Backups",
        "Content Updates & Minor Changes",
        "Technical Support & Troubleshooting"
      ],
      resultsImpact: {
        intro: "Regular maintenance ensures your business benefits from:",
        points: [
          "Maximum website uptime and performance",
          "Enhanced security and protection from threats",
          "Seamless user experience with zero technical glitches"
        ]
      }
    }
  },
  {
    title: "Conversion Optimization",
    description: "Maximize your ROI by optimizing every step of your user journey.",
    icon: <Zap className="w-8 h-8" />,
    color: "bg-indigo-500/10 text-indigo-500",
    modal: {
      whatItMeans: "We look at why visitors aren't buying and fix the leaks in your funnel. It's about getting more results from the traffic you already have.",
      howItHelps: [
        "Increases sales without increasing ad spend",
        "Improves the overall user experience",
        "Boosts your average customer value",
        "Turns more visitors into paying customers"
      ],
      whatWeDo: [
        "A/B Testing & Heatmap Analysis",
        "User Journey & Funnel Audits",
        "Landing Page Optimization",
        "Call-to-Action (CTA) Strategy",
        "Copywriting & Persuasion Design"
      ],
      resultsImpact: {
        intro: "Optimizing your user journey directly impacts:",
        points: [
          "Significant increase in lead and sales volume",
          "Higher return on investment (ROI) from existing traffic",
          "Reduced cost per acquisition (CPA)"
        ]
      }
    }
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);

  return (
    <section id="services" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
          >
            Services Designed for <span className="gradient-text">Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We provide full-stack digital solutions to help your business thrive in the modern economy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <button
                onClick={() => setSelectedService(service)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline group/link"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-[2.5rem]" />
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/10 text-white/60 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl ${selectedService.color} flex items-center justify-center`}>
                    {selectedService.icon}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">{selectedService.title}</h2>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-widest text-accent">What It Means</h4>
                  <p className="text-white leading-relaxed text-lg">
                    {selectedService.modal.whatItMeans}
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-accent">How It Helps You</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.modal.howItHelps.map((item) => (
                      <div key={item} className="flex items-start gap-3 group/item">
                        <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-bold leading-relaxed text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-accent">What We Do</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.modal.whatWeDo.map((item) => (
                      <div key={item} className="flex items-start gap-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        <span className="text-sm font-bold leading-relaxed text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-accent">Results / Impact</h4>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-white/90 italic">
                      {selectedService.modal.resultsImpact.intro}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedService.modal.resultsImpact.points.map((point) => (
                        <div key={point} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                          <span className="text-sm font-bold leading-relaxed text-white">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/#audit"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-accent/20"
                  >
                    Start My Project
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="flex-1 bg-muted border border-border py-4 rounded-xl font-bold hover:bg-muted/80 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
