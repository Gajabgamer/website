"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "./UserContext";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/supabase";

export function WelcomeModal() {
  const { isFirstVisit, setUserData } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR">("INR");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      setShow(true);
    }
  }, [isFirstVisit]);

  const handleContinue = async () => {
    if (name.trim()) {
      setLoading(true);
      try {
        // Store in leads table via direct Supabase call if email provided
        if (email.trim()) {
          await submitLead({
            name: name.trim(),
            email: email.trim(),
            industry: "Welcome Modal",
            city: "Initial Visit",
            phone: "Not provided",
            business: "Not provided",
            source: "website" as const,
          });
        }
      } catch (err) {
        console.error("Error storing welcome lead:", err);
        // Still continue with the flow despite the error
      } finally {
        setUserData(name.trim(), currency, email.trim() || undefined);
        setLoading(false);
        setShow(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-[380px] bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl"
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-[2rem]" />

            <div className="relative z-10 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Welcome
                </h2>
                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Personalize Your Experience</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">What should we call you?</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-white placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Email Address</label>
                    <span className="text-[9px] font-bold uppercase tracking-tighter text-white/30">Optional</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm text-white placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 ml-1">Currency Preference</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "INR", symbol: "₹" },
                      { id: "USD", symbol: "$" },
                      { id: "EUR", symbol: "€" },
                    ].map((cur) => (
                      <button
                        key={cur.id}
                        type="button"
                        onClick={() => setCurrency(cur.id as "INR" | "USD" | "EUR")}
                        className={cn(
                          "flex flex-col items-center justify-center py-2 rounded-xl border transition-all",
                          currency === cur.id
                            ? "bg-accent text-white border-accent shadow-md shadow-accent/20"
                            : "bg-white/5 border-white/10 hover:border-accent/50 text-white/60 hover:text-white"
                        )}
                      >
                        <span className="text-base font-bold">{cur.symbol}</span>
                        <span className="text-[9px] font-bold uppercase opacity-70">{cur.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={!name.trim() || loading}
                className="w-full bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-30 shadow-lg shadow-accent/20 group text-sm"
              >
                {loading ? "Saving..." : (
                  <>
                    Continue to Site
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
