"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitWebsiteRequest } from "@/actions/websiteRequest";
import { Sparkles, CheckCircle2, Rocket, Code, Layout, Smartphone, Globe, ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_TYPES = [
  { id: "Website Development", label: "Custom Website", icon: Globe },
  { id: "Landing Pages", label: "Landing Page", icon: Layout },
  { id: "Portfolio Websites", label: "Personal Portfolio", icon: Smartphone },
  { id: "Full-Stack Web Apps", label: "Full-Stack Web App", icon: Code },
  { id: "E-Commerce", label: "E-Commerce Store", icon: Rocket },
  { id: "AI Integration", label: "AI/ML Application", icon: Sparkles },
];

const BUDGET_OPTIONS = ["$200 - $500", "$500 - $1,000", "$1,000 - $2,500", "$2,500+"];
const TIMELINE_OPTIONS = ["Urgent (1-3 Days)", "1-2 Weeks", "3-4 Weeks", "Flexible"];

export function WebsiteRequestDialog({ trigger }: { trigger?: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Website Development",
    budget: "$500 - $1,000",
    timeline: "1-2 Weeks",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await submitWebsiteRequest(formData);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setError(res.error || "Failed to submit website request.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "Website Development",
      budget: "$500 - $1,000",
      timeline: "1-2 Weeks",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) handleReset(); }}>
      <DialogTrigger render={trigger || (
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold shadow-lg shadow-emerald-500/20 rounded-full gap-2">
          <Sparkles className="w-4 h-4" />
          Request a Website
        </Button>
      )} />

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-2xl border-emerald-500/30 p-6 md:p-8">
        <DialogHeader className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5" /> Start Your Project
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Request a Custom Website
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Tell me about your idea, requirements, and budget to get a custom proposal within 24 hours.
          </p>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Request Submitted Successfully!</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. I will review your requirements for <strong>{formData.serviceType}</strong> and reach out to you via email shortly.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi Bhargava, I just submitted a website request for ${formData.serviceType} (${formData.budget}).`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 gap-2">
                    <MessageCircle className="w-4 h-4" /> Quick WhatsApp Chat
                  </Button>
                </a>
                <Button onClick={() => setOpen(false)} className="w-full sm:w-auto bg-primary text-primary-foreground">
                  Done
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {error && (
                <div className="p-3 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}

              {/* SERVICE SELECTION */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Select Project Type</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICE_TYPES.map((service) => {
                    const Icon = service.icon;
                    const isSelected = formData.serviceType === service.id;
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => setFormData({ ...formData, serviceType: service.id })}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] font-semibold"
                            : "border-border/60 bg-muted/20 text-muted-foreground hover:border-border hover:bg-muted/40"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? "text-emerald-400" : "text-muted-foreground"}`} />
                        <span className="text-xs">{service.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BUDGET SELECTOR */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Estimated Budget Range</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2 px-3 rounded-lg border text-xs text-center transition-all ${
                        formData.budget === b
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold"
                          : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* TIMELINE SELECTOR */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Expected Timeline</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIMELINE_OPTIONS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormData({ ...formData, timeline: t })}
                      className={`py-2 px-3 rounded-lg border text-xs text-center transition-all ${
                        formData.timeline === t
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold"
                          : "border-border/60 bg-muted/20 text-muted-foreground hover:bg-muted/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="req-name">Your Name *</Label>
                  <Input
                    id="req-name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="req-email">Email Address *</Label>
                  <Input
                    id="req-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="req-phone">Phone / WhatsApp (Optional)</Label>
                <Input
                  id="req-phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="req-desc">Project Description & Features *</Label>
                <Textarea
                  id="req-desc"
                  required
                  rows={4}
                  placeholder="Describe your website goals, key features, reference design links, or special requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-6 gap-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Proposal Request"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
