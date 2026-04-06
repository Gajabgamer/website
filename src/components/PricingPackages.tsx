"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Rocket, Crown, Calculator, Clock, Send, X, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "./UserContext";
import { submitLead } from "@/lib/supabase";

const pricingPlans = [
  {
    name: "Starter",
    tagline: "Perfect for individuals and small businesses starting online.",
    price: "₹5,000",
    icon: <Rocket className="w-6 h-6" />,
    features: [
      "Custom website design",
      "Up to 5 pages",
      "Mobile responsive design",
      "Contact form integration",
      "Speed optimization",
      "Website deployment",
      "1 month technical support",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Premium",
    tagline: "Best for businesses that want visibility and growth.",
    price: "₹15,000",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Everything in Starter",
      "Up to 10 pages website",
      "Advanced SEO setup",
      "Keyword optimization",
      "Google Analytics integration",
      "Google Search Console setup",
      "Basic AI Chatbot integration",
      "Blog setup",
      "Social media integration",
      "Performance optimization",
      "3 months support",
    ],
    highlight: true,
    cta: "Start Premium Project",
  },
  {
    name: "Legacy",
    tagline: "Best for companies that want complete digital growth.",
    price: "Custom",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Everything in Premium",
      "Unlimited pages",
      "Full SEO strategy",
      "Conversion optimized UI/UX",
      "Marketing funnel setup",
      "Email marketing integration",
      "Advanced Custom AI Assistant",
      "Advanced analytics",
      "Priority support",
      "6–12 months support",
    ],
    highlight: false,
    cta: "Book Strategy Call",
  },
];

const builderOptions = {
  pageOptions: [
    { id: "5", label: "Up to 5 Pages", price: 0, pages: 5 },
    { id: "10", label: "Up to 10 Pages", price: 4000, pages: 10 },
    { id: "20", label: "Up to 20 Pages", price: 12000, pages: 20 },
    { id: "50", label: "Up to 50 Pages", price: 36000, pages: 50 },
  ],
  seoOptions: [
    { id: "none", label: "No SEO", price: 0 },
    { id: "basic", label: "Basic SEO", price: 3000 },
    { id: "advanced", label: "Advanced SEO", price: 7000 },
  ],
  marketingAddons: [
    { id: "social", label: "Social Media Setup", price: 2000 },
    { id: "analytics", label: "Google Analytics Setup", price: 1000 },
    { id: "email", label: "Email Marketing Setup", price: 2500 },
    { id: "funnel", label: "Landing Page Funnel", price: 4000 },
    { id: "ai_assistant", label: "AI Customer Assistant", price: 5000 },
  ],
  maintenanceOptions: [
    { id: "none", label: "No Maintenance", price: 0 },
    { id: "basic", label: "Basic Maintenance", price: 1000 },
    { id: "premium", label: "Premium Maintenance", price: 3000 },
  ],
  deliverySpeed: [
    { id: "normal", label: "Normal (7-10 days)", price: 0, time: "7-10 Days" },
    { id: "fast", label: "Fast (3-5 days)", price: 2000, time: "3-5 Days" },
    { id: "express", label: "Express (48 hours)", price: 5000, time: "48 Hours" },
  ],
  supportDuration: [
    { id: "1", label: "1 Month Support", price: 0 },
    { id: "3", label: "3 Months Support", price: 1500 },
    { id: "6", label: "6 Months Support", price: 3000 },
  ],
};

export default function PricingPackages() {
  const { userName, formatPrice, currency } = useUser();
  const [pages, setPages] = useState(builderOptions.pageOptions[0].id);
  const [seo, setSeo] = useState(builderOptions.seoOptions[0].id);
  const [selectedMarketing, setSelectedMarketing] = useState<string[]>([]);
  const [maintenance, setMaintenance] = useState(builderOptions.maintenanceOptions[0].id);
  const [delivery, setDelivery] = useState(builderOptions.deliverySpeed[0].id);
  const [support, setSupport] = useState(builderOptions.supportDuration[0].id);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    social_url: "",
    projectType: "Website Calculation Request"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMarketing = (id: string) => {
    setSelectedMarketing((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    const BASE_PRICE = 5000;

    // Page Cost Logic
    const pOpt = builderOptions.pageOptions.find((p) => p.id === pages);
    const numPages = pOpt?.pages || 5;
    const pageCost = numPages > 5 ? (numPages - 5) * 800 : 0;

    const seoCost = builderOptions.seoOptions.find((s) => s.id === seo)?.price || 0;

    const marketingCost = selectedMarketing.reduce((acc, id) => {
      return acc + (builderOptions.marketingAddons.find((m) => m.id === id)?.price || 0);
    }, 0);

    const deliveryCost = builderOptions.deliverySpeed.find((d) => d.id === delivery)?.price || 0;
    const supportCost = builderOptions.supportDuration.find((s) => s.id === support)?.price || 0;

    const totalPrice = BASE_PRICE + pageCost + seoCost + marketingCost + deliveryCost + supportCost;

    const deliveryTime = builderOptions.deliverySpeed.find((d) => d.id === delivery)?.time || "7-10 Days";
    const monthlyMaintenance = builderOptions.maintenanceOptions.find((m) => m.id === maintenance)?.price || 0;

    return { totalPrice, deliveryTime, monthlyMaintenance };
  }, [pages, seo, selectedMarketing, maintenance, delivery, support]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    const mNames = selectedMarketing.map(id => builderOptions.marketingAddons.find(m => m.id === id)?.label).join(", ");
    const seoLabel = builderOptions.seoOptions.find(s => s.id === seo)?.label || "None";
    const maintenanceLabel = builderOptions.maintenanceOptions.find(m => m.id === maintenance)?.label || "None";

    const features = `Pages: ${pages || 5}, SEO: ${seoLabel}, Marketing: ${mNames || "None"}, Maintenance: ${maintenanceLabel}, Delivery: ${totals.deliveryTime}`;
    const budgetRange = formatPrice(totals.totalPrice) + (totals.monthlyMaintenance > 0 ? ` + ${formatPrice(totals.monthlyMaintenance)}/mo` : "");

    const data = {
      name: formData.name || "Unknown",
      email: formData.email || "",
      phone: formData.phone || "Not provided",
      website: formData.website || "Not provided",
      social: formData.social_url || "Not provided",
      project_details: `${formData.projectType}\nBudget Range: ${budgetRange}\nFeatures: ${features}`,
      business: "Not provided",
      industry: "Calculator Request",
      city: "Unknown",
      source: "calculator" as const,
    };

    try {
      await submitLead(data);

      setFormStatus("success");
      setTimeout(() => {
        setIsFormOpen(false);
        setFormStatus("idle");
      }, 2000);
    } catch (error: unknown) {
      console.error("Error submitting quote request:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(errorMessage);
      setFormStatus("error");
    }
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-semibold tracking-widest uppercase text-sm"
          >
            Pricing & Packages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
          >
            {userName ? `Hey ${userName}, ` : ""}Pricing Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Choose the plan that fits your business needs.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col p-8 rounded-3xl border transition-all duration-300",
                plan.highlight
                  ? "bg-primary text-primary-foreground border-accent scale-105 shadow-2xl z-10"
                  : "bg-card border-border hover:border-accent/50 shadow-lg"
              )}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                  plan.highlight ? "bg-accent text-white" : "bg-muted text-accent"
                )}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={cn(
                  "text-sm mb-6 min-h-[40px]",
                  plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price === "Custom" ? "Custom" : formatPrice(parseInt(plan.price.replace(/[₹,]/g, "")))}
                  </span>
                  {plan.price !== "Custom" && <span className="text-sm opacity-60">/ project</span>}
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className={cn("w-5 h-5 flex-shrink-0", plan.highlight ? "text-accent" : "text-accent")} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsFormOpen(true)}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-center transition-all",
                  plan.highlight
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-muted text-foreground hover:bg-accent hover:text-white"
                )}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Custom Builder Section */}
        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-16 border border-border">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Create Your Own Package</h3>
            <p className="text-muted-foreground">Customize your website package based on your needs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-12">
              {/* Pages */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">1</div>
                  Number of Pages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {builderOptions.pageOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setPages(opt.id)}
                      className={cn(
                        "p-4 rounded-xl border text-sm font-semibold transition-all text-left",
                        pages === opt.id
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEO Options */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">2</div>
                  SEO Options
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {builderOptions.seoOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSeo(opt.id)}
                      className={cn(
                        "p-4 rounded-xl border text-sm font-semibold transition-all text-left",
                        seo === opt.id
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Marketing Add-ons */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">3</div>
                  Marketing & AI Add-ons
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {builderOptions.marketingAddons.map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => toggleMarketing(addon.id)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                        selectedMarketing.includes(addon.id)
                          ? "bg-accent/10 border-accent ring-1 ring-accent"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                          selectedMarketing.includes(addon.id) ? "bg-accent border-accent text-white" : "border-border text-transparent"
                        )}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-semibold text-sm">{addon.label}</span>
                      </div>
                      <span className="text-xs font-bold opacity-60">+{formatPrice(addon.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Maintenance */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">4</div>
                  Maintenance Plan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {builderOptions.maintenanceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setMaintenance(opt.id)}
                      className={cn(
                        "p-4 rounded-xl border text-sm font-semibold transition-all text-left",
                        maintenance === opt.id
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Speed */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">5</div>
                  Delivery Speed
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {builderOptions.deliverySpeed.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      className={cn(
                        "p-4 rounded-xl border text-sm font-semibold transition-all text-left",
                        delivery === opt.id
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Duration */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">6</div>
                  Support Duration
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {builderOptions.supportDuration.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSupport(opt.id)}
                      className={cn(
                        "p-4 rounded-xl border text-sm font-semibold transition-all text-left",
                        support === opt.id
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Summary Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-primary text-primary-foreground p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
                  <Calculator className="w-32 h-32" />
                </div>

                <h4 className="text-2xl font-bold mb-8">Estimated Package</h4>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Calculator className="w-4 h-4" />
                      Estimated Project Cost
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={totals.totalPrice}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-3xl font-bold text-accent"
                      >
                        {formatPrice(totals.totalPrice)}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Clock className="w-4 h-4" />
                      Delivery Time
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={totals.deliveryTime}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-xl font-bold"
                      >
                        {totals.deliveryTime}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  {totals.monthlyMaintenance > 0 && (
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-sm opacity-80">
                        Monthly Maintenance
                      </div>
                      <span className="text-lg font-bold">{formatPrice(totals.monthlyMaintenance)}/mo</span>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 p-3 bg-white/5 rounded-xl mb-8">
                  <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] opacity-60 leading-tight">
                    Most businesses invest {formatPrice(15000)} – {formatPrice(30000)} for a high-performing website.
                  </p>
                </div>

                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                >
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border p-8 rounded-3xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {formStatus === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Your calculation request has been saved successfully.</h3>
                  <p className="text-muted-foreground">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-6">Get Custom Quote</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold opacity-60">Full Name</label>
                        <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold opacity-60">Email</label>
                        <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold opacity-60">Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition-all" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold opacity-60">Website</label>
                        <input name="website" value={formData.website} onChange={handleInputChange} type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold opacity-60">Social URL</label>
                      <input name="social_url" value={formData.social_url} onChange={handleInputChange} type="text" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold opacity-60">Project Details / Message</label>
                      <textarea name="projectType" value={formData.projectType} onChange={handleInputChange} rows={3} placeholder="Tell us about your requirements..." className="w-full bg-muted/50 border border-border rounded-xl px-4 py-2 outline-none focus:border-accent transition-all resize-none"></textarea>
                    </div>

                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errorMessage}
                      </motion.div>
                    )}
                    <button
                      disabled={formStatus === "loading"}
                      className="w-full bg-accent text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 mt-4"
                    >
                      {formStatus === "loading" ? "Sending..." : (
                        <>
                          Send Quote Request
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
