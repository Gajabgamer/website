"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, Mail, Globe } from "lucide-react";
import { submitLead } from "@/lib/supabase";

export default function AuditForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: name || (formData.get("name") as string) || "Unknown",
      email: email || (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "Not provided",
      business: (formData.get("business") as string) || "Not provided",
      industry: "Inquiry", // Default
      city: "Unknown", // Default
      website: formData.get("website") as string,
      social: formData.get("social") as string,
      project_details: formData.get("project_details") as string,
      source: "audit" as const,
    };

    try {
      await submitLead(data);

      setStatus("success");
    } catch (error: unknown) {
      console.error("Error submitting audit request:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(errorMessage);
      setStatus("error");
    }
  };

  return (
    <section id="audit" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-accent font-semibold tracking-widest uppercase text-sm bg-accent/10 px-4 py-2 rounded-full">
                India — Remote-first digital agency
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Let’s Build Your Next <span className="gradient-text">Website</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
                Tell us about your project and our team will respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6 bg-card p-8 rounded-3xl border border-border">
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+91 93157 97023</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:webatexyz@outlook.com" className="hover:text-accent transition-colors">webatexyz@outlook.com</a>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Globe className="w-5 h-5" />
                </div>
                <span>webate.xyz</span>
              </div>

              <a
                href="https://wa.me/919315797023"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#25D366]/20 mt-4"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Free website audit",
                "SEO-ready websites",
                "Fast project delivery",
                "Dedicated client support",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl relative"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Audit Requested!</h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for your interest. Our team will review your website and send the audit report to your email shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-accent text-white px-8 py-3 rounded-xl font-bold"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-80 ml-1">Full Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold opacity-80 ml-1">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-80 ml-1">Business / Company</label>
                  <input
                    required
                    name="business"
                    type="text"
                    placeholder="Your Company Name"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold opacity-80">Website URL</label>
                    <span className="text-[10px] font-bold uppercase opacity-40">Optional</span>
                  </div>
                  <input
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold opacity-80">Social Media URL</label>
                    <span className="text-[10px] font-bold uppercase opacity-40">Optional</span>
                  </div>
                  <input
                    type="url"
                    name="social"
                    placeholder="https://instagram.com/yourbrand"
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-80 ml-1">Project Details</label>
                  <textarea
                    required
                    name="project_details"
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  disabled={status === "loading"}
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? (
                    "Processing..."
                  ) : (
                    <>
                      Get Free Website Audit
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground font-medium">
                  Average response time: within 2–4 hours.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
