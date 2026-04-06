"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Our standard turnaround time is 1-2 weeks for our Starter and Premium packages. More complex custom projects may take 3-4 weeks depending on the features and integrations required.",
  },
  {
    question: "Do you provide hosting?",
    answer: "Yes, we offer premium high-performance hosting with 99.9% uptime guarantee. We also assist with domain registration and setup if you don't have one yet.",
  },
  {
    question: "Will my website rank on Google?",
    answer: "All our websites are built with SEO best practices from the ground up. Our Premium and Legacy packages include advanced SEO optimization to help you rank for your target keywords.",
  },
  {
    question: "Do you offer maintenance?",
    answer: "Absolutely. We offer ongoing maintenance and support packages to keep your website secure, updated, and performing at its best.",
  },
  {
    question: "Can you redesign an existing website?",
    answer: "Yes, we specialize in modernizing outdated websites. We can help you transition your current site to a modern, fast, and high-converting platform while preserving your brand identity.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm"
          >
            Got Questions?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
          >
            Commonly Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Find answers to some of the most common questions about our services and process.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === index
                  ? "bg-card border-accent shadow-lg shadow-accent/5"
                  : "bg-background border-border hover:border-accent/50"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className={cn(
                    "w-5 h-5 transition-colors",
                    openIndex === index ? "text-accent" : "text-muted-foreground"
                  )} />
                  <span className="font-bold text-lg">{faq.question}</span>
                </div>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  openIndex === index ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                )}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/50 ml-9">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
