"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Code2, 
  Rocket,
  ChevronRight
} from "lucide-react";

const steps = [
  {
    title: "Consultation",
    description: "Understanding your business goals and current online presence.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    title: "Strategy",
    description: "Creating a detailed website structure and comprehensive SEO plan.",
    icon: <Target className="w-8 h-8" />,
    color: "bg-emerald-500",
  },
  {
    title: "Development",
    description: "Designing and building your website with the latest tech stack.",
    icon: <Code2 className="w-8 h-8" />,
    color: "bg-purple-500",
  },
  {
    title: "Launch",
    description: "Deploying and optimizing performance for immediate results.",
    icon: <Rocket className="w-8 h-8" />,
    color: "bg-rose-500",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm"
          >
            Our Workflow
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
          >
            How We Get You <span className="gradient-text">Results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            A systematic approach to building high-performance websites and marketing funnels.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-8">
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 z-10 relative`}>
                    {step.icon}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/50 dark:bg-slate-800 rounded-full blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed px-4">
                  {step.description}
                </p>
                
                {/* Mobile/Tablet Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-border">
                    <ChevronRight className="w-8 h-8 rotate-90 md:rotate-0" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
