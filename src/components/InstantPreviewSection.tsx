"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, Building2, MapPin, Palette, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import { submitLead } from "@/lib/supabase";

const industries = [
  "Gym",
  "Restaurant",
  "Coaching Institute",
  "Real Estate",
  "Clinic/Hospital",
  "Startup",
  "Local Business",
  "Portfolio",
  "Other"
];

const colors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Slate", value: "#475569" },
];

export function InstantPreviewSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    industry: "Gym",
    city: "",
    color: "#3b82f6",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");

  const loadingMessages = [
    "Analyzing your business...",
    "Designing your website layout...",
    "Generating your preview...",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Track demo generation
    track("Demo Generated", {
      industry: formData.industry,
      city: formData.city,
      hasEmail: !!formData.email
    });

    try {
      await submitLead({
        name: formData.name || "Unknown",
        email: formData.email || "",
        industry: formData.industry,
        city: formData.city,
        project_details: `Color Theme: ${formData.color}`,
        business: formData.name,
        phone: "Not provided",
        source: "quote" as const,
      });

      // Fake generation experience
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < loadingMessages.length) {
          setLoadingStep(step);
        } else {
          clearInterval(interval);
          const params = new URLSearchParams({
            name: formData.name,
            industry: formData.industry,
            city: formData.city,
            color: formData.color,
          });
          router.push(`/demo?${params.toString()}`);
        }
      }, 1000);
    } catch (err: unknown) {
      console.error("Error generating demo:", err);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <section id="instant-preview" className="py-24 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-semibold tracking-widest uppercase text-xs"
            >
              Instant Website Preview
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
            >
              See how your business website could look in seconds.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-accent animate-spin" />
                    <Sparkles className="w-6 h-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="space-y-2">
                    <motion.p
                      key={loadingStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-bold"
                    >
                      {loadingMessages[loadingStep]}
                    </motion.p>
                    <p className="text-muted-foreground animate-pulse">Almost there...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <Building2 className="w-3 h-3" />
                        Business Name
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sharma Fitness"
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Industry
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-all appearance-none"
                      >
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        City / Location
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Delhi"
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                        <Palette className="w-3 h-3" />
                        Primary Color
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {colors.map((c) => (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, color: c.value })}
                            className={cn(
                              "w-full aspect-square rounded-lg border-2 transition-all",
                              formData.color === c.value ? "border-accent scale-110 shadow-lg" : "border-transparent"
                            )}
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          Email Address
                        </label>
                        <span className="text-[9px] font-bold uppercase opacity-40">Optional</span>
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-accent transition-all"
                      />
                    </div>

                    <div className="pt-4">
                      {error && (
                        <p className="text-red-500 text-xs mb-4 text-center font-bold">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="w-full bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-accent/20 group"
                      >
                        Generate My Website Preview
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
